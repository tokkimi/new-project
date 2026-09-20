import assert from "node:assert/strict";
import test from "node:test";
import type { ModuleFinding } from "../src/lib/face-scan-engine";
import {
  moduleToZoneResults,
  transformLandmark,
  validateFacePosition,
  zonesForModules,
} from "../src/lib/face-mesh/faceMesh.utils";
import type { FaceLandmarkPoint } from "../src/lib/face-mesh/faceMesh.types";

function landmarks(overrides: Partial<Record<number, Partial<FaceLandmarkPoint>>> = {}) {
  const points = Array.from({ length: 478 }, (_, index) => ({
    x: 0.5,
    y: 0.5,
    z: 0,
    ...overrides[index],
  }));

  points[10] = { ...points[10], x: 0.5, y: 0.24 };
  points[152] = { ...points[152], x: 0.5, y: 0.77 };
  points[234] = { ...points[234], x: 0.34, y: 0.5 };
  points[454] = { ...points[454], x: 0.66, y: 0.5 };
  points[33] = { ...points[33], x: 0.42, y: 0.45 };
  points[263] = { ...points[263], x: 0.58, y: 0.45 };
  points[1] = { ...points[1], x: 0.5, y: 0.5 };

  return points;
}

test("validates centered and stable face position", () => {
  const now = 1_000;
  const result = validateFacePosition(landmarks(), 1, 100, now);

  assert.equal(result.valid, true);
  assert.equal(result.instruction, "faceDetected");
  assert.equal(result.progress, 1);
});

test("rejects multiple faces and off-center framing", () => {
  assert.equal(validateFacePosition(landmarks(), 2, null, 100).instruction, "multipleFaces");
  const shiftedFace = landmarks().map((point) => ({ ...point, x: point.x + 0.18 }));
  assert.equal(
    validateFacePosition(shiftedFace, 1, null, 100).instruction,
    "centerFace"
  );
});

test("transforms mirrored landmarks into display coordinates", () => {
  const point = transformLandmark(
    { x: 0.25, y: 0.5 },
    {
      cssWidth: 200,
      cssHeight: 100,
      sourceWidth: 100,
      sourceHeight: 100,
      fit: "contain",
      mirrored: true,
      devicePixelRatio: 1,
    }
  );

  assert.equal(point.x, 125);
  assert.equal(point.y, 50);
});

test("maps scan modules to precise facial zones", () => {
  const modules = [
    {
      id: "acne",
      score: 7,
      severity: "attention",
      flagged: true,
      observable: true,
      confidence: 0.9,
      concern: "acne",
      category: "Treatment",
      ingredientId: "bha",
    },
  ] satisfies ModuleFinding[];

  const zoneIds = zonesForModules(["acne"]);
  const zoneResults = moduleToZoneResults(modules);

  assert.deepEqual(zoneIds, ["forehead", "leftCheek", "rightCheek", "chin", "leftJaw", "rightJaw"]);
  assert.equal(zoneResults.some((zone) => zone.zoneId === "forehead" && zone.severity === "attention"), true);
});
