import type { ModuleFinding, ModuleId, ZoneSeverity } from "@/lib/face-scan-engine";
import { FACE_ZONES, MODULE_FACE_ZONES } from "@/lib/face-mesh/faceZones.config";
import type {
  FaceLandmarkPoint,
  FacePositionState,
  FaceZoneId,
  FaceZoneResult,
  MeshTransform,
} from "@/lib/face-mesh/faceMesh.types";

export function transformLandmark(point: FaceLandmarkPoint, transform: MeshTransform) {
  const ratio = transform.devicePixelRatio ?? 1;
  const scale =
    transform.fit === "cover"
      ? Math.max(transform.cssWidth / transform.sourceWidth, transform.cssHeight / transform.sourceHeight)
      : Math.min(transform.cssWidth / transform.sourceWidth, transform.cssHeight / transform.sourceHeight);
  const renderedWidth = transform.sourceWidth * scale;
  const renderedHeight = transform.sourceHeight * scale;
  const offsetX = (transform.cssWidth - renderedWidth) / 2;
  const offsetY = (transform.cssHeight - renderedHeight) / 2;
  const normalizedX = transform.mirrored ? 1 - point.x : point.x;

  return {
    x: (offsetX + normalizedX * renderedWidth) * ratio,
    y: (offsetY + point.y * renderedHeight) * ratio,
  };
}

export function smoothLandmarks(
  previous: FaceLandmarkPoint[] | null,
  next: FaceLandmarkPoint[],
  smoothing = 0.68
): FaceLandmarkPoint[] {
  if (!previous || previous.length !== next.length) return next;
  return next.map((point, index) => {
    const prev = previous[index];
    return {
      x: prev.x * smoothing + point.x * (1 - smoothing),
      y: prev.y * smoothing + point.y * (1 - smoothing),
      z:
        typeof point.z === "number" && typeof prev.z === "number"
          ? prev.z * smoothing + point.z * (1 - smoothing)
          : point.z,
    };
  });
}

export function validateFacePosition(
  landmarks: FaceLandmarkPoint[] | null,
  faceCount: number,
  stableSince: number | null,
  now: number
): FacePositionState {
  if (faceCount > 1) return { valid: false, instruction: "multipleFaces", progress: 0 };
  if (!landmarks || faceCount === 0) return { valid: false, instruction: "noFace", progress: 0 };

  const xs = landmarks.map((p) => p.x);
  const ys = landmarks.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = maxX - minX;
  const height = maxY - minY;
  const centerX = minX + width / 2;
  const faceTilt = Math.abs((landmarks[33]?.y ?? 0) - (landmarks[263]?.y ?? 0));
  const noseCenter = landmarks[1]?.x ?? centerX;
  const eyeCenter = ((landmarks[33]?.x ?? centerX) + (landmarks[263]?.x ?? centerX)) / 2;
  const yaw = Math.abs(noseCenter - eyeCenter);

  let instruction: FacePositionState["instruction"] = "faceDetected";
  if (minY < 0.025 || maxY > 0.985 || minX < 0.025 || maxX > 0.975 || Math.abs(centerX - 0.5) > 0.11) {
    instruction = "centerFace";
  } else if (height < 0.48) {
    instruction = "moveCloser";
  } else if (height > 0.88 || width > 0.82) {
    instruction = "moveFarther";
  } else if (faceTilt > 0.035 || yaw > 0.075) {
    instruction = "lookStraight";
  }

  const stableMs = stableSince && instruction === "faceDetected" ? now - stableSince : 0;
  const progress = Math.max(0, Math.min(1, stableMs / 850));
  return { valid: progress >= 1, instruction: progress >= 1 ? "faceDetected" : instruction, progress };
}

export function moduleToZoneResults(modules: ModuleFinding[]): FaceZoneResult[] {
  const byZone = new Map<FaceZoneId, FaceZoneResult>();

  for (const scanModule of modules) {
    const zones = MODULE_FACE_ZONES[scanModule.id] ?? [];
    for (const zoneId of zones) {
      const existing = byZone.get(zoneId);
      if (!existing) {
        byZone.set(zoneId, {
          zoneId,
          score: scanModule.score,
          severity: scanModule.severity,
          concerns: [scanModule.id],
          confidence: scanModule.confidence,
        });
        continue;
      }
      if (severityRank(scanModule.severity) > severityRank(existing.severity)) {
        existing.severity = scanModule.severity;
      }
      existing.score = Math.max(existing.score, scanModule.score);
      existing.confidence = Math.max(existing.confidence ?? 0, scanModule.confidence);
      if (!existing.concerns.includes(scanModule.id)) existing.concerns.push(scanModule.id);
    }
  }

  return Array.from(byZone.values());
}

export function zonesForModules(modules: ModuleId[]) {
  return Array.from(new Set(modules.flatMap((moduleId) => MODULE_FACE_ZONES[moduleId] ?? [])));
}

export function severityRank(severity: ZoneSeverity) {
  if (severity === "attention") return 3;
  if (severity === "medium") return 2;
  return 1;
}

export function statusColor(severity: ZoneSeverity) {
  if (severity === "attention") return "rgba(255, 82, 82, 0.96)";
  if (severity === "medium") return "rgba(255, 145, 77, 0.92)";
  return "rgba(255, 255, 255, 0.94)";
}

export function pointRadius(severity: ZoneSeverity, score: number, base = 1.45) {
  const multiplier = severity === "attention" ? 2.2 : severity === "medium" ? 1.8 : 1.45;
  return Math.min(5.4, base * multiplier + Math.max(0, score - 4) * 0.16);
}

export function activeZoneConfigs(activeZones: FaceZoneId[]) {
  return activeZones.map((id) => FACE_ZONES[id]).filter(Boolean);
}
