"use client";

import * as React from "react";
import type { FaceScanMarker } from "@/lib/face-mesh/faceScanMarkers";
import type { MeshFit } from "@/lib/face-mesh/faceMesh.types";
import { cn } from "@/lib/utils";

type FaceScanMarkerOverlayProps = {
  markers: FaceScanMarker[];
  sourceWidth: number;
  sourceHeight: number;
  fit?: MeshFit;
  moduleId?: string;
  pulse?: boolean;
  className?: string;
};

export function FaceScanMarkerOverlay({
  markers,
  sourceWidth,
  sourceHeight,
  fit = "cover",
  moduleId,
  pulse = false,
  className,
}: FaceScanMarkerOverlayProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const frameRef = React.useRef<number | null>(null);
  const visibleMarkers = React.useMemo(
    () => (moduleId ? markers.filter((marker) => marker.moduleId === moduleId) : markers),
    [markers, moduleId]
  );

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
      if (sourceWidth <= 0 || sourceHeight <= 0 || visibleMarkers.length === 0) return;

      const scale =
        fit === "cover"
          ? Math.max(rect.width / sourceWidth, rect.height / sourceHeight)
          : Math.min(rect.width / sourceWidth, rect.height / sourceHeight);
      const renderedWidth = sourceWidth * scale;
      const renderedHeight = sourceHeight * scale;
      const offsetX = (rect.width - renderedWidth) / 2;
      const offsetY = (rect.height - renderedHeight) / 2;
      const pulseValue = pulse ? 0.86 + Math.sin(performance.now() / 420) * 0.14 : 1;

      ctx.save();
      for (const marker of visibleMarkers) {
        const x = (offsetX + marker.x * renderedWidth) * ratio;
        const y = (offsetY + marker.y * renderedHeight) * ratio;
        const severitySize = marker.severity === "attention" ? 3 : marker.severity === "medium" ? 2.45 : 2.1;
        const radius = Math.min(4.8, severitySize + Math.max(0, marker.score - 12) * 0.05) * ratio;
        const color =
          marker.severity === "attention"
            ? "rgba(255,106,92,0.94)"
            : marker.severity === "medium"
              ? "rgba(191,207,219,0.96)"
              : "rgba(247,234,223,0.96)";

        ctx.shadowColor = color;
        ctx.shadowBlur = 8 * ratio * pulseValue;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius * pulseValue, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 0.55 * ratio;
        ctx.beginPath();
        ctx.arc(x, y, radius * 2.05 * pulseValue, 0, Math.PI * 2);
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
  }, [fit, pulse, sourceHeight, sourceWidth, visibleMarkers]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    />
  );
}
