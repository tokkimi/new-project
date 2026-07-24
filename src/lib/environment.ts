export type EnvironmentReading = {
  uvIndex: number | null;
  humidity: number | null; // %
  temperature: number | null; // °C
  aqi: number | null; // European AQI
};

export type EnvironmentAdvice = "uvHigh" | "humidHigh" | "dryLow" | "airPoor" | "cold";

/**
 * Turns a live environment reading into a few honest, advisory nudges. Purely
 * about weighting an existing routine (more SPF, lighter AM, more barrier
 * support) — never a change to what products someone should buy.
 */
export function buildEnvironmentAdvice(r: EnvironmentReading): EnvironmentAdvice[] {
  const advice: EnvironmentAdvice[] = [];
  if (typeof r.uvIndex === "number" && r.uvIndex >= 6) advice.push("uvHigh");
  if (typeof r.humidity === "number" && r.humidity >= 70) advice.push("humidHigh");
  if (typeof r.humidity === "number" && r.humidity <= 30) advice.push("dryLow");
  if (typeof r.aqi === "number" && r.aqi >= 60) advice.push("airPoor");
  if (typeof r.temperature === "number" && r.temperature <= 0) advice.push("cold");
  return advice;
}

/** Round to ~city level (about 11 km) so a precise address is never used or stored. */
export function coarseCoordinate(value: number): number {
  return Math.round(value * 10) / 10;
}
