import type { ModuleFinding, ModuleId, ZoneSeverity } from "@/lib/face-scan-engine";
import { FACE_OVAL_LANDMARKS, FACE_ZONES, MODULE_FACE_ZONES } from "@/lib/face-mesh/faceZones.config";
import type { FaceLandmarkPoint, FaceZoneId } from "@/lib/face-mesh/faceMesh.types";

export type FaceScanMarker = {
  x: number;
  y: number;
  moduleId: ModuleId;
  zoneId: FaceZoneId;
  severity: ZoneSeverity;
  score: number;
};

type PixelSample = {
  luma: number;
  redExcess: number;
  saturation: number;
  contrast: number;
  highlight: number;
};

type PixelPoint = {
  x: number;
  y: number;
};

type Candidate = PixelPoint & {
  moduleId: ModuleId;
  zoneId: FaceZoneId;
  severity: ZoneSeverity;
  score: number;
};

export async function detectFaceScanMarkers({
  imageSrc,
  landmarks,
  imageSize,
  modules,
  mirrored = false,
}: {
  imageSrc: string;
  landmarks: FaceLandmarkPoint[];
  imageSize: { width: number; height: number };
  modules: ModuleFinding[];
  /** Camera captures are mirrored; imported photos are not. */
  mirrored?: boolean;
}): Promise<FaceScanMarker[]> {
  if (!imageSrc || landmarks.length === 0) return [];

  const image = await loadImage(imageSrc);
  const width = image.naturalWidth || image.width || imageSize.width;
  const height = image.naturalHeight || image.height || imageSize.height;
  if (!width || !height) return [];

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.drawImage(image, 0, 0, width, height);
  const pixels = ctx.getImageData(0, 0, width, height);

  const positionedLandmarks = landmarks.map((point) => ({
    x: mirrored ? 1 - point.x : point.x,
    y: point.y,
    z: point.z,
  }));
  const facePolygon = FACE_OVAL_LANDMARKS.map((index) => normalizedToPixel(positionedLandmarks[index], width, height)).filter(Boolean) as PixelPoint[];
  if (facePolygon.length < 3) return [];
  const faceBounds = boundsFor(facePolygon);
  const baseline = skinBaseline(pixels, positionedLandmarks, width, height);
  const allCandidates: Candidate[] = [];

  for (const module of modules) {
    if (!module.flagged || !module.observable) continue;
    const zones = MODULE_FACE_ZONES[module.id] ?? [];
    const moduleCandidates: Candidate[] = [];

    for (const zoneId of zones) {
      const zone = FACE_ZONES[zoneId];
      if (!zone) continue;
      const zonePoints = zone.landmarkIndices
        .map((index) => normalizedToPixel(positionedLandmarks[index], width, height))
        .filter(Boolean) as PixelPoint[];
      if (zonePoints.length === 0) continue;

      const zoneBounds = clampBounds(expandBounds(boundsFor(zonePoints), width, height, 0.07), faceBounds);
      const samplePoints = gridPoints(zoneBounds, module.id, width, height);

      for (const point of samplePoints) {
        if (!pointInPolygon(point, facePolygon)) continue;
        const sample = samplePixelArea(pixels, width, height, point.x, point.y, module.id);
        const score = scoreCandidate(module.id, sample, baseline);
        moduleCandidates.push({
          ...point,
          moduleId: module.id,
          zoneId,
          severity: module.severity,
          score,
        });
      }
    }

    const threshold = thresholdFor(module);
    const selected = nonMaxSuppress(moduleCandidates, width, height, maxMarkersFor(module), threshold);
    allCandidates.push(...selected);
  }

  return allCandidates.map((marker) => ({
    x: clamp01(marker.x / width),
    y: clamp01(marker.y / height),
    moduleId: marker.moduleId,
    zoneId: marker.zoneId,
    severity: marker.severity,
    score: marker.score,
  }));
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.decoding = "async";
    image.src = src;
  });
}

function normalizedToPixel(point: FaceLandmarkPoint | undefined, width: number, height: number): PixelPoint | null {
  if (!point) return null;
  return {
    x: clamp(point.x * width, 0, width - 1),
    y: clamp(point.y * height, 0, height - 1),
  };
}

function skinBaseline(
  pixels: ImageData,
  landmarks: FaceLandmarkPoint[],
  width: number,
  height: number
): PixelSample {
  const zoneIds: FaceZoneId[] = ["forehead", "leftCheek", "rightCheek", "chin", "nose"];
  const samples: PixelSample[] = [];
  for (const zoneId of zoneIds) {
    for (const index of FACE_ZONES[zoneId].landmarkIndices) {
      const point = normalizedToPixel(landmarks[index], width, height);
      if (!point) continue;
      samples.push(samplePixelArea(pixels, width, height, point.x, point.y, "texture"));
    }
  }
  return averageSample(samples);
}

function samplePixelArea(
  pixels: ImageData,
  width: number,
  height: number,
  centerX: number,
  centerY: number,
  moduleId: ModuleId
): PixelSample {
  const radius = moduleId === "pores" || moduleId === "blackheads" || moduleId === "wrinkles" ? 2 : 3;
  const values: number[] = [];
  let redExcess = 0;
  let saturation = 0;
  let highlight = 0;
  let count = 0;

  for (let y = Math.max(0, Math.round(centerY - radius)); y <= Math.min(height - 1, Math.round(centerY + radius)); y++) {
    for (let x = Math.max(0, Math.round(centerX - radius)); x <= Math.min(width - 1, Math.round(centerX + radius)); x++) {
      const index = (y * width + x) * 4;
      const r = pixels.data[index] ?? 0;
      const g = pixels.data[index + 1] ?? 0;
      const b = pixels.data[index + 2] ?? 0;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const luma = r * 0.2126 + g * 0.7152 + b * 0.0722;
      values.push(luma);
      redExcess += r - (g + b) / 2;
      saturation += max === 0 ? 0 : ((max - min) / max) * 100;
      highlight += Math.max(0, luma - 208);
      count += 1;
    }
  }

  const mean = values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
  const contrast = values.reduce((sum, value) => sum + Math.abs(value - mean), 0) / Math.max(1, values.length);

  return {
    luma: mean,
    redExcess: redExcess / Math.max(1, count),
    saturation: saturation / Math.max(1, count),
    contrast,
    highlight: highlight / Math.max(1, count),
  };
}

function scoreCandidate(moduleId: ModuleId, sample: PixelSample, baseline: PixelSample) {
  const red = sample.redExcess - baseline.redExcess;
  const darker = baseline.luma - sample.luma;
  const brighter = sample.luma - baseline.luma;
  const chroma = sample.saturation - baseline.saturation;

  switch (moduleId) {
    case "acne":
      return red * 1.65 + Math.max(0, darker) * 0.28 + sample.contrast * 0.9 + Math.max(0, chroma) * 0.22;
    case "redness":
    case "sensitivity":
      return red * 1.9 + Math.max(0, chroma) * 0.28 + sample.contrast * 0.42;
    case "spots":
    case "acneScars":
      return Math.max(0, darker) * 1.28 + sample.contrast * 0.82 + Math.max(0, red) * 0.35;
    case "wrinkles":
      return sample.contrast * 2.1 + Math.max(0, darker) * 0.26;
    case "texture":
      return sample.contrast * 1.65 + Math.abs(sample.luma - baseline.luma) * 0.32;
    case "pores":
    case "blackheads":
      return Math.max(0, darker) * 1.45 + sample.contrast * 1.15;
    case "darkCircles":
      return Math.max(0, darker) * 1.65 + sample.contrast * 0.48;
    case "oiliness":
      return Math.max(0, brighter) * 1.05 + sample.highlight * 1.2;
    case "dryness":
      return sample.contrast * 1.25 + Math.max(0, brighter) * 0.28 + Math.max(0, -red) * 0.18;
    case "radiance":
      return sample.contrast * 0.82 + Math.max(0, darker) * 0.42;
    default:
      return sample.contrast;
  }
}

function nonMaxSuppress(
  candidates: Candidate[],
  width: number,
  height: number,
  limit: number,
  threshold: number
) {
  const sorted = candidates
    .filter((candidate) => Number.isFinite(candidate.score))
    .sort((a, b) => b.score - a.score);
  const selected: Candidate[] = [];
  const minDistance = Math.max(10, Math.min(width, height) * 0.026);

  for (const candidate of sorted) {
    if (candidate.score < threshold) continue;
    if (selected.some((point) => distance(point, candidate) < minDistance)) continue;
    selected.push(candidate);
    if (selected.length >= limit) break;
  }

  return selected;
}

function gridPoints(bounds: ReturnType<typeof boundsFor>, moduleId: ModuleId, width: number, height: number) {
  const points: PixelPoint[] = [];
  const isFineDetail = moduleId === "pores" || moduleId === "blackheads" || moduleId === "acne" || moduleId === "spots";
  const step = Math.max(isFineDetail ? 7 : 10, Math.min(width, height) * (isFineDetail ? 0.012 : 0.016));
  const columns = Math.max(3, Math.min(18, Math.floor(bounds.width / step)));
  const rows = Math.max(3, Math.min(18, Math.floor(bounds.height / step)));
  for (let row = 1; row <= rows; row++) {
    for (let column = 1; column <= columns; column++) {
      points.push({
        x: bounds.minX + (bounds.width * column) / (columns + 1),
        y: bounds.minY + (bounds.height * row) / (rows + 1),
      });
    }
  }
  return points;
}

function thresholdFor(module: ModuleFinding) {
  const severityBoost = module.severity === "attention" ? -2 : module.severity === "medium" ? -1 : 0;
  if (module.id === "pores" || module.id === "blackheads") return 15 + severityBoost;
  if (module.id === "wrinkles" || module.id === "texture") return 12 + severityBoost;
  if (module.id === "redness" || module.id === "acne" || module.id === "sensitivity") return 13 + severityBoost;
  return 14 + severityBoost;
}

function maxMarkersFor(module: ModuleFinding) {
  if (module.severity === "attention") return 32;
  if (module.severity === "medium") return 22;
  return 14;
}

function averageSample(samples: PixelSample[]): PixelSample {
  if (samples.length === 0) {
    return { luma: 150, redExcess: 0, saturation: 20, contrast: 4, highlight: 0 };
  }
  return samples.reduce(
    (sum, sample) => ({
      luma: sum.luma + sample.luma / samples.length,
      redExcess: sum.redExcess + sample.redExcess / samples.length,
      saturation: sum.saturation + sample.saturation / samples.length,
      contrast: sum.contrast + sample.contrast / samples.length,
      highlight: sum.highlight + sample.highlight / samples.length,
    }),
    { luma: 0, redExcess: 0, saturation: 0, contrast: 0, highlight: 0 }
  );
}

function boundsFor(points: PixelPoint[]) {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
}

function expandBounds(bounds: ReturnType<typeof boundsFor>, width: number, height: number, ratio: number) {
  const padX = bounds.width * ratio;
  const padY = bounds.height * ratio;
  return {
    minX: clamp(bounds.minX - padX, 0, width - 1),
    maxX: clamp(bounds.maxX + padX, 0, width - 1),
    minY: clamp(bounds.minY - padY, 0, height - 1),
    maxY: clamp(bounds.maxY + padY, 0, height - 1),
    width: bounds.width + padX * 2,
    height: bounds.height + padY * 2,
  };
}

function clampBounds(bounds: ReturnType<typeof boundsFor>, faceBounds: ReturnType<typeof boundsFor>) {
  const minX = Math.max(bounds.minX, faceBounds.minX);
  const maxX = Math.min(bounds.maxX, faceBounds.maxX);
  const minY = Math.max(bounds.minY, faceBounds.minY);
  const maxY = Math.min(bounds.maxY, faceBounds.maxY);
  return { minX, maxX, minY, maxY, width: Math.max(1, maxX - minX), height: Math.max(1, maxY - minY) };
}

function pointInPolygon(point: PixelPoint, polygon: PixelPoint[]) {
  if (polygon.length < 3) return true;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const current = polygon[i];
    const previous = polygon[j];
    const intersects =
      current.y > point.y !== previous.y > point.y &&
      point.x < ((previous.x - current.x) * (point.y - current.y)) / (previous.y - current.y || 1) + current.x;
    if (intersects) inside = !inside;
  }
  return inside;
}

function distance(a: PixelPoint, b: PixelPoint) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function clamp01(value: number) {
  return clamp(value, 0, 1);
}
