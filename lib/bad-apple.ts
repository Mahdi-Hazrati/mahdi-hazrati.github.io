import LZString from "lz-string";

export const BAD_APPLE_FPS = 30;
export const BAD_APPLE_ASPECT = 4 / 3;

/** Static assets in public/assets/bad-apple — run `npm run bad-apple:fetch` */
export const BAD_APPLE_PATHS = {
  frames: "/assets/bad-apple/framesData.lz",
  audio: "/assets/bad-apple/bad_apple.mp3",
} as const;

let framesCache: string[] | null = null;

export async function loadBadAppleFrames(): Promise<string[]> {
  if (framesCache) return framesCache;

  const response = await fetch(BAD_APPLE_PATHS.frames);
  if (!response.ok) {
    throw new Error(
      "Bad Apple assets missing in public/assets/bad-apple. Run: npm run bad-apple:fetch"
    );
  }

  const compressed = await response.text();
  const decompressed = LZString.decompressFromBase64(compressed);
  if (!decompressed) {
    throw new Error("Failed to decompress Bad Apple frame data.");
  }

  const frames = JSON.parse(decompressed) as string[];
  framesCache = frames;
  return frames;
}

export function frameFromTime(frames: string[], timeSeconds: number): string {
  const index = Math.min(
    Math.floor(timeSeconds * BAD_APPLE_FPS),
    frames.length - 1
  );
  const raw = frames[Math.max(0, index)] ?? "";
  return raw.replace(/\\n/g, "\n");
}

export function asciiFontSize(width: number, height: number): number {
  let displayWidth = width;
  let displayHeight = width / BAD_APPLE_ASPECT;

  if (displayHeight > height) {
    displayHeight = height;
    displayWidth = displayHeight * BAD_APPLE_ASPECT;
  }

  return displayWidth / 62;
}
