"use client";

import * as React from "react";
import { FACE_MESH_CONNECTIONS, FACE_ZONES } from "@/lib/face-mesh/faceZones.config";
import {
  activeZoneConfigs,
  pointRadius,
  statusColor,
  transformLandmark,
} from "@/lib/face-mesh/faceMesh.utils";
import type {
  FaceLandmarkPoint,
  FaceZoneId,
  FaceZoneResult,
  MeshFit,
} from "@/lib/face-mesh/faceMesh.types";
import { cn } from "@/lib/utils";

type FaceMeshOverlayProps = {
  landmarks: FaceLandmarkPoint[] | null;
  sourceWidth: number;
  sourceHeight: number;
  fit?: MeshFit;
  mirrored?: boolean;
  activeZones?: FaceZoneId[];
  zoneResults?: FaceZoneResult[];
  pulse?: boolean;
  showGuideMesh?: boolean;
  showZoneLines?: boolean;
  className?: string;
};

export function FaceMeshOverlay({
  landmarks,
  sourceWidth,
  sourceHeight,
  fit = "cover",
  mirrored = false,
  activeZones = [],
  zoneResults = [],
  pulse = false,
  showGuideMesh = true,
  showZoneLines = true,
  className,
}: FaceMeshOverlayProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const frameRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!landmarks || sourceWidth <= 0 || sourceHeight <= 0) return;

      const transform = {
        cssWidth: rect.width,
        cssHeight: rect.height,
        sourceWidth,
        sourceHeight,
        fit,
        mirrored,
        devicePixelRatio: ratio,
      };
      const points = landmarks.map((point) => transformLandmark(point, transform));
      const zoneById = new Map(zoneResults.map((zone) => [zone.zoneId, zone]));
      const activeSet = new Set(activeZones);

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(255,255,255,0.55)";
      ctx.shadowBlur = 3 * ratio;

      if (showGuideMesh) {
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.lineWidth = 0.45 * ratio;
        for (const [from, to] of FACE_MESH_CONNECTIONS) {
          const a = points[from];
          const b = points[to];
          if (!a || !b) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        ctx.fillStyle = pulse ? "rgba(255,255,255,0.48)" : "rgba(255,255,255,0.34)";
        for (let i = 0; i < points.length; i += 7) {
          const point = points[i];
          ctx.beginPath();
          ctx.arc(point.x, point.y, 0.55 * ratio, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const zone of activeZoneConfigs(activeZones)) {
        const result = zoneById.get(zone.id);
        const color = statusColor(result?.severity ?? "low");
        const radius = pointRadius(result?.severity ?? "low", result?.score ?? 1, showGuideMesh ? 0.82 : 0.68) * ratio;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = (result?.severity === "attention" ? 7 : 4) * ratio;
        ctx.lineWidth = (result?.severity === "attention" ? 0.7 : 0.5) * ratio;

        const localConnections =
          FACE_ZONES[zone.id]?.connections.length > 0 ? FACE_ZONES[zone.id].connections : [];
        if (showZoneLines) {
          for (const [from, to] of localConnections) {
            const a = points[from];
            const b = points[to];
            if (!a || !b) continue;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const displayIndices = showGuideMesh ? zone.landmarkIndices : zone.landmarkIndices.filter((_, index) => index % 2 === 0);
        for (const index of displayIndices) {
          const point = points[index];
          if (!point) continue;
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (showGuideMesh && activeSet.size === 0) {
        const oval = FACE_ZONES.leftJaw.landmarkIndices.concat(FACE_ZONES.rightJaw.landmarkIndices.slice().reverse());
        ctx.strokeStyle = "rgba(255,255,255,0.32)";
        ctx.lineWidth = 0.62 * ratio;
        ctx.shadowBlur = 4 * ratio;
        ctx.beginPath();
        oval.forEach((index, position) => {
          const point = points[index];
          if (!point) return;
          if (position === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
      }

      ctx.restore();
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    if (pulse) {
      const tick = () => {
        draw();
        frameRef.current = requestAnimationFrame(tick);
      };
      frameRef.current = requestAnimationFrame(tick);
    }
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [activeZones, fit, landmarks, mirrored, pulse, showGuideMesh, showZoneLines, sourceHeight, sourceWidth, zoneResults]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    />
  );
}
