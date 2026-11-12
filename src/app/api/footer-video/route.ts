import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const VIDEO_EXT = [".mp4", ".webm", ".mov", ".m4v", ".ogv"];
const HERO_VIDEO = "porsche-hero.mp4";

/**
 * Auto-detects the footer background video.
 *
 * The user just drops ANY video file into one of these folders and it is
 * applied automatically — no code change needed:
 *   1. public/videos/footer/          (dedicated folder, highest priority)
 *   2. public/videos/                 (any video except the hero video)
 */
export async function GET() {
  const videosDir = path.join(process.cwd(), "public", "videos");
  const footerDir = path.join(videosDir, "footer");

  const candidates: string[] = [];

  try {
    // 1. Dedicated footer folder — first video file wins
    if (fs.existsSync(footerDir)) {
      const files = fs
        .readdirSync(footerDir)
        .filter((f) => VIDEO_EXT.includes(path.extname(f).toLowerCase()))
        .sort();
      for (const f of files) candidates.push(`/videos/footer/${f}`);
    }

    // 2. Fallback: any other video directly in /public/videos (skip hero)
    if (fs.existsSync(videosDir)) {
      const files = fs
        .readdirSync(videosDir, { withFileTypes: true })
        .filter((d) => d.isFile())
        .map((d) => d.name)
        .filter((f) => VIDEO_EXT.includes(path.extname(f).toLowerCase()))
        .filter((f) => f.toLowerCase() !== HERO_VIDEO)
        .sort();
      for (const f of files) candidates.push(`/videos/${f}`);
    }

    if (candidates.length > 0) {
      return NextResponse.json({ src: candidates[0] });
    }
    return NextResponse.json({ src: null });
  } catch {
    return NextResponse.json({ src: null });
  }
}
