import type { FaceZoneConfig, FaceZoneId } from "@/lib/face-mesh/faceMesh.types";
import type { ModuleId } from "@/lib/face-scan-engine";

const faceOval = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109];

export const FACE_OVAL_LANDMARKS = faceOval;

function loop(indices: number[]): Array<[number, number]> {
  return indices.map((point, index) => [point, indices[(index + 1) % indices.length]]);
}

function chain(indices: number[]): Array<[number, number]> {
  return indices.slice(0, -1).map((point, index) => [point, indices[index + 1]]);
}

export const FACE_MESH_CONNECTIONS: Array<[number, number]> = [
  ...loop(faceOval),
  ...loop([33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]),
  ...loop([263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466]),
  ...loop([61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185]),
  ...chain([10, 151, 9, 8, 168, 6, 197, 195, 5, 4, 1, 2, 164, 0, 17, 18, 200, 199, 175, 152]),
  ...chain([234, 93, 132, 58, 172, 136, 150, 149, 176, 148, 152, 377, 400, 378, 379, 365, 397, 288, 361, 323, 454]),
  ...chain([127, 34, 139, 71, 68, 104, 69, 108, 151, 337, 299, 333, 298, 301, 368, 264, 356]),
  ...chain([50, 101, 118, 117, 123, 147, 187, 207, 216]),
  ...chain([280, 330, 347, 346, 352, 376, 411, 427, 436]),
];

export const FACE_ZONES: Record<FaceZoneId, FaceZoneConfig> = {
  forehead: {
    id: "forehead",
    labelKey: "zones.forehead",
    landmarkIndices: [10, 151, 9, 107, 66, 105, 63, 70, 336, 296, 334, 293, 300, 109, 67, 103, 297, 332, 338],
    connections: [...chain([70, 63, 105, 66, 107, 9, 336, 296, 334, 293, 300]), ...chain([10, 151, 9])],
  },
  glabella: {
    id: "glabella",
    labelKey: "zones.glabella",
    landmarkIndices: [9, 8, 168, 6, 197, 195, 55, 285, 193, 417],
    connections: [...loop([9, 55, 193, 168, 417, 285]), ...chain([9, 8, 168, 6])],
  },
  leftTemple: {
    id: "leftTemple",
    labelKey: "zones.leftTemple",
    landmarkIndices: [127, 162, 21, 54, 103, 68, 71],
    connections: [...chain([127, 162, 21, 54, 103, 68, 71])],
  },
  rightTemple: {
    id: "rightTemple",
    labelKey: "zones.rightTemple",
    landmarkIndices: [356, 389, 251, 284, 332, 298, 301],
    connections: [...chain([356, 389, 251, 284, 332, 298, 301])],
  },
  leftUnderEye: {
    id: "leftUnderEye",
    labelKey: "zones.leftUnderEye",
    landmarkIndices: [130, 243, 112, 26, 22, 23, 24, 110, 25, 226, 31, 228, 229],
    connections: [...chain([130, 243, 112, 26, 22, 23, 24, 110, 25, 226])],
  },
  rightUnderEye: {
    id: "rightUnderEye",
    labelKey: "zones.rightUnderEye",
    landmarkIndices: [359, 463, 341, 256, 252, 253, 254, 339, 255, 446, 261, 448, 449],
    connections: [...chain([359, 463, 341, 256, 252, 253, 254, 339, 255, 446])],
  },
  leftCheek: {
    id: "leftCheek",
    labelKey: "zones.leftCheek",
    landmarkIndices: [50, 101, 118, 117, 123, 147, 187, 207, 216, 192, 213, 205, 203, 206],
    connections: [...chain([50, 101, 118, 117, 123, 147, 187, 207, 216]), ...chain([123, 187, 192, 213])],
  },
  rightCheek: {
    id: "rightCheek",
    labelKey: "zones.rightCheek",
    landmarkIndices: [280, 330, 347, 346, 352, 376, 411, 427, 436, 416, 433, 425, 423, 426],
    connections: [...chain([280, 330, 347, 346, 352, 376, 411, 427, 436]), ...chain([352, 411, 416, 433])],
  },
  nose: {
    id: "nose",
    labelKey: "zones.nose",
    landmarkIndices: [6, 197, 195, 5, 4, 1, 2, 98, 327, 168, 122, 351, 188, 412],
    connections: [...chain([6, 197, 195, 5, 4, 1, 2]), ...chain([168, 122, 188, 98, 2, 327, 412, 351, 168])],
  },
  noseSides: {
    id: "noseSides",
    labelKey: "zones.noseSides",
    landmarkIndices: [98, 97, 2, 327, 326, 129, 358, 209, 429],
    connections: [...chain([129, 98, 97, 2, 327, 326, 358]), ...chain([209, 98, 2, 327, 429])],
  },
  upperLip: {
    id: "upperLip",
    labelKey: "zones.upperLip",
    landmarkIndices: [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308],
    connections: [...chain([61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291]), ...chain([78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308])],
  },
  lowerLip: {
    id: "lowerLip",
    labelKey: "zones.lowerLip",
    landmarkIndices: [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308],
    connections: [...chain([61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291]), ...chain([78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308])],
  },
  chin: {
    id: "chin",
    labelKey: "zones.chin",
    landmarkIndices: [18, 200, 199, 175, 152, 201, 421, 148, 176, 377, 400],
    connections: [...chain([18, 200, 199, 175, 152]), ...chain([201, 200, 421])],
  },
  leftJaw: {
    id: "leftJaw",
    labelKey: "zones.leftJaw",
    landmarkIndices: [234, 93, 132, 58, 172, 136, 150, 149, 176, 148, 152],
    connections: [...chain([234, 93, 132, 58, 172, 136, 150, 149, 176, 148, 152])],
  },
  rightJaw: {
    id: "rightJaw",
    labelKey: "zones.rightJaw",
    landmarkIndices: [454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152],
    connections: [...chain([454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152])],
  },
  tZone: {
    id: "tZone",
    labelKey: "zones.tZone",
    landmarkIndices: [10, 151, 9, 8, 168, 6, 197, 195, 5, 4, 1, 2, 98, 327, 55, 285],
    connections: [...chain([10, 151, 9, 8, 168, 6, 197, 195, 5, 4, 1, 2]), ...loop([55, 9, 285, 327, 2, 98])],
  },
};

export const MODULE_FACE_ZONES: Record<ModuleId, FaceZoneId[]> = {
  pores: ["nose", "noseSides"],
  blackheads: ["nose", "noseSides"],
  wrinkles: ["forehead", "glabella", "leftUnderEye", "rightUnderEye"],
  redness: ["leftCheek", "rightCheek", "noseSides"],
  spots: ["forehead", "leftCheek", "rightCheek"],
  acne: ["forehead", "leftCheek", "rightCheek", "chin"],
  acneScars: ["leftCheek", "rightCheek"],
  darkCircles: ["leftUnderEye", "rightUnderEye"],
  texture: ["leftCheek", "rightCheek", "chin"],
  oiliness: ["tZone", "nose"],
  dryness: ["leftCheek", "rightCheek", "chin"],
  sensitivity: ["leftCheek", "rightCheek", "noseSides"],
  radiance: ["forehead", "leftCheek", "rightCheek"],
};
