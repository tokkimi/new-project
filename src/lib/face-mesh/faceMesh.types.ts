import type { ModuleId, ZoneSeverity } from "@/lib/face-scan-engine";

export type FaceLandmarkPoint = {
  x: number;
  y: number;
  z?: number;
};

export type FaceZoneId =
  | "forehead"
  | "glabella"
  | "leftTemple"
  | "rightTemple"
  | "leftUnderEye"
  | "rightUnderEye"
  | "leftCheek"
  | "rightCheek"
  | "nose"
  | "noseSides"
  | "upperLip"
  | "lowerLip"
  | "chin"
  | "leftJaw"
  | "rightJaw"
  | "tZone";

export type FaceZoneConfig = {
  id: FaceZoneId;
  labelKey: string;
  landmarkIndices: number[];
  connections: Array<[number, number]>;
};

export type FaceZoneResult = {
  zoneId: FaceZoneId;
  score: number;
  severity: ZoneSeverity;
  concerns: ModuleId[];
  confidence?: number;
};

export type MeshFit = "cover" | "contain";

export type MeshTransform = {
  cssWidth: number;
  cssHeight: number;
  sourceWidth: number;
  sourceHeight: number;
  fit: MeshFit;
  mirrored?: boolean;
  devicePixelRatio?: number;
};

export type FacePositionInstruction =
  | "centerFace"
  | "moveCloser"
  | "moveFarther"
  | "lookStraight"
  | "holdStill"
  | "improveLighting"
  | "faceDetected"
  | "noFace"
  | "multipleFaces";

export type FacePositionState = {
  valid: boolean;
  instruction: FacePositionInstruction;
  progress: number;
};
