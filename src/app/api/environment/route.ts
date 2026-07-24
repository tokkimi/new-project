import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { coarseCoordinate, type EnvironmentReading } from "@/lib/environment";

// Fail-safe environment proxy: coarsens the coordinate to city level, asks
// open-meteo (free, no key, no personal data), and returns a reading — or
// { available: false } on any problem, so the UI can simply hide. Nothing is
// stored; the coordinate is never persisted.
export async function GET(request: Request) {
  const { ok } = rateLimit(clientKey(request, "environment"), { limit: 20, windowMs: 60 * 1000 });
  if (!ok) return NextResponse.json({ available: false }, { status: 429 });

  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ available: false }, { status: 401 });

  const url = new URL(request.url);
  const lat = Number(url.searchParams.get("lat"));
  const lon = Number(url.searchParams.get("lon"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return NextResponse.json({ available: false }, { status: 400 });
  }
  const la = coarseCoordinate(lat);
  const lo = coarseCoordinate(lon);

  try {
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${la}&longitude=${lo}&current=relative_humidity_2m,temperature_2m,uv_index&timezone=auto`;
    const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${la}&longitude=${lo}&current=european_aqi`;

    const controller = AbortSignal.timeout(4000);
    const [forecastRes, airRes] = await Promise.allSettled([
      fetch(forecastUrl, { signal: controller }),
      fetch(airUrl, { signal: controller }),
    ]);

    const reading: EnvironmentReading = {
      uvIndex: null,
      humidity: null,
      temperature: null,
      aqi: null,
    };

    if (forecastRes.status === "fulfilled" && forecastRes.value.ok) {
      const data = await forecastRes.value.json().catch(() => null);
      const c = data?.current;
      if (c) {
        reading.uvIndex = typeof c.uv_index === "number" ? c.uv_index : null;
        reading.humidity = typeof c.relative_humidity_2m === "number" ? c.relative_humidity_2m : null;
        reading.temperature = typeof c.temperature_2m === "number" ? c.temperature_2m : null;
      }
    }
    if (airRes.status === "fulfilled" && airRes.value.ok) {
      const data = await airRes.value.json().catch(() => null);
      const aqi = data?.current?.european_aqi;
      if (typeof aqi === "number") reading.aqi = aqi;
    }

    // If the forecast gave us nothing usable, treat as unavailable.
    if (reading.uvIndex === null && reading.humidity === null && reading.temperature === null) {
      return NextResponse.json({ available: false });
    }
    return NextResponse.json({ available: true, reading });
  } catch {
    return NextResponse.json({ available: false });
  }
}
