"use client";

import * as React from "react";
import { Camera, Loader2, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaceGuideOverlay } from "@/components/face-guide-overlay";
import { smoothLandmarks, validateFacePosition } from "@/lib/face-mesh/faceMesh.utils";
import type { FaceLandmarkPoint, FacePositionInstruction } from "@/lib/face-mesh/faceMesh.types";
import { cn } from "@/lib/utils";

type FaceLandmarkerInstance = {
  detectForVideo: (video: HTMLVideoElement, timestamp: number) => {
    faceLandmarks?: FaceLandmarkPoint[][];
  };
  close?: () => void;
};

type FaceScanCaptureProps = {
  labels: Record<FacePositionInstruction | "start" | "retake" | "fallback", string>;
  onCapture: (file: File, landmarks: FaceLandmarkPoint[], imageSize: { width: number; height: number }) => void;
  onFallbackUpload: () => void;
};

export function FaceScanCapture({ labels, onCapture, onFallbackUpload }: FaceScanCaptureProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const landmarkerRef = React.useRef<FaceLandmarkerInstance | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const stableSinceRef = React.useRef<number | null>(null);
  const smoothedRef = React.useRef<FaceLandmarkPoint[] | null>(null);

  const [status, setStatus] = React.useState<"loading" | "ready" | "fallback">("loading");
  const [landmarks, setLandmarks] = React.useState<FaceLandmarkPoint[] | null>(null);
  const [instruction, setInstruction] = React.useState<FacePositionInstruction>("noFace");
  const [progress, setProgress] = React.useState(0);
  const [meshAvailable, setMeshAvailable] = React.useState(false);

  const stop = React.useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    landmarkerRef.current?.close?.();
    landmarkerRef.current = null;
  }, []);

  const start = React.useCallback(async () => {
    stop();
    setStatus("loading");
    stableSinceRef.current = null;
    smoothedRef.current = null;
    setLandmarks(null);
    setMeshAvailable(false);
    setProgress(0);
    setInstruction("holdStill");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 960 },
          height: { ideal: 1280 },
        },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) throw new Error("missing_video");
      video.srcObject = stream;
      await video.play();
      setStatus("ready");

      let landmarker: FaceLandmarkerInstance | null = null;
      try {
        const [{ FaceLandmarker, FilesetResolver }] = await Promise.all([
          import("@mediapipe/tasks-vision"),
        ]);
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        landmarker = (await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numFaces: 2,
          minFaceDetectionConfidence: 0.55,
          minFacePresenceConfidence: 0.55,
          minTrackingConfidence: 0.55,
        })) as FaceLandmarkerInstance;
        landmarkerRef.current = landmarker;
        setMeshAvailable(true);
      } catch (meshError) {
        console.error("face mesh init error", meshError);
        landmarkerRef.current = null;
        setMeshAvailable(false);
        setInstruction("centerFace");
        setProgress(1);
        return;
      }

      let lastInference = 0;
      const loop = (time: number) => {
        if (document.visibilityState === "hidden") {
          rafRef.current = requestAnimationFrame(loop);
          return;
        }
        const currentVideo = videoRef.current;
        const currentLandmarker = landmarkerRef.current ?? landmarker;
        if (!currentVideo || !currentLandmarker || currentVideo.readyState < 2) {
          rafRef.current = requestAnimationFrame(loop);
          return;
        }
        if (time - lastInference >= 66) {
          lastInference = time;
          const result = currentLandmarker.detectForVideo(currentVideo, performance.now());
          const faceCount = result.faceLandmarks?.length ?? 0;
          const rawLandmarks = result.faceLandmarks?.[0] ?? null;
          const nextLandmarks = rawLandmarks ? smoothLandmarks(smoothedRef.current, rawLandmarks, 0.72) : null;
          smoothedRef.current = nextLandmarks;
          setLandmarks(nextLandmarks);

          const preliminary = validateFacePosition(nextLandmarks, faceCount, stableSinceRef.current, time);
          if (preliminary.instruction !== "faceDetected") {
            stableSinceRef.current = null;
          } else if (!stableSinceRef.current) {
            stableSinceRef.current = time;
          }
          const stable = validateFacePosition(nextLandmarks, faceCount, stableSinceRef.current, time);
          setInstruction(stable.instruction);
          setProgress(stable.progress);
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    } catch (error) {
      console.error("face camera init error", error);
      stop();
      setStatus("fallback");
    }
  }, [stop]);

  React.useEffect(() => {
    const startTimer = window.setTimeout(() => {
      void start();
    }, 0);
    return () => {
      window.clearTimeout(startTimer);
      stop();
    };
  }, [start, stop]);

  const capture = async () => {
    const video = videoRef.current;
    if (!video || status !== "ready" || (meshAvailable && progress < 1)) return;
    const width = video.videoWidth;
    const height = video.videoHeight;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, width, height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.94));
    if (!blob) return;
    const file = new File([blob], "haru-face-scan.jpg", { type: "image/jpeg" });
    const capturedLandmarks = landmarks ?? [];
    stop();
    onCapture(file, capturedLandmarks, { width, height });
  };

  if (status === "fallback") {
    return (
      <div className="w-full rounded-[2rem] border border-white/45 bg-white/10 p-5 text-left text-white backdrop-blur-md">
        <p className="flex items-center gap-2 text-sm">
          <ShieldCheck className="size-4" />
          {labels.fallback}
        </p>
        <Button className="mt-4" variant="outline" onClick={onFallbackUpload}>
          <Camera className="size-4" />
          {labels.start}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-[1.75rem] border border-white/35 bg-black/20 shadow-[0_26px_80px_-50px_rgba(0,0,0,0.7)]">
      <div className="relative h-[calc(100svh-7.25rem)] min-h-[360px] max-h-[760px] w-full bg-black sm:h-[calc(100svh-8rem)] sm:min-h-[560px] sm:max-h-[880px]">
        <video
          ref={videoRef}
          muted
          playsInline
          className="absolute inset-0 size-full scale-x-[-1] object-cover"
        />
        {status === "ready" && (
          <FaceGuideOverlay active={progress >= 0.2 || !meshAvailable} />
        )}
        <div className="absolute inset-x-5 top-4 h-1 rounded-full bg-white/18">
          <span
            className="block h-full rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.9)] transition-all"
            style={{ width: `${Math.max(4, progress * 100)}%` }}
          />
        </div>
        <div className="absolute inset-x-4 bottom-4 flex flex-col items-center gap-2">
          <div className="max-w-[86vw] rounded-full border border-white/45 bg-black/18 px-4 py-2 text-center text-xs font-medium text-white backdrop-blur-md sm:text-sm">
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                {labels.holdStill}
              </span>
            ) : (
              labels[instruction]
            )}
          </div>
          <button
            type="button"
            onClick={capture}
            disabled={status !== "ready" || (meshAvailable && progress < 1)}
            aria-label={labels.start}
            className={cn(
              "flex size-14 items-center justify-center rounded-full border border-white/70 bg-white/10 text-white backdrop-blur-md transition sm:size-16",
              status === "ready" && (!meshAvailable || progress >= 1)
                ? "shadow-[0_0_28px_rgba(255,255,255,0.8)] hover:bg-white/20"
                : "opacity-45"
            )}
          >
            <Camera className="size-6 sm:size-7" />
          </button>
          <button
            type="button"
            onClick={() => void start()}
            className="inline-flex items-center gap-2 text-xs font-medium text-white/80"
          >
            <RotateCcw className="size-3.5" />
            {labels.retake}
          </button>
        </div>
      </div>
    </div>
  );
}
