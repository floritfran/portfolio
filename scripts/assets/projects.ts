import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const root = process.cwd();
const sourceDir =
  process.env.PROJECT_IMAGES_SOURCE ?? path.resolve(root, "..");
const outputDir = path.join(root, "public", "images", "projects");

const projects = [
  {
    slug: "flixy",
    width: 1516,
    files: ["Flixy 1.png", "Flixy 2.png", "Flixy 3.png", "Flixy 4.png"],
  },
  {
    slug: "juntadapp",
    width: 720,
    files: ["Juntadapp 1.png", "Juntadapp 2.png"],
  },
  {
    slug: "my-football-stats",
    width: 720,
    files: ["MyFootStats 1.png", "MyFootStats 2.png", "MyFootStats 3.png"],
  },
] as const;

async function main() {
  await mkdir(outputDir, { recursive: true });

  for (const project of projects) {
    for (const [index, file] of project.files.entries()) {
      const source = path.join(sourceDir, file);
      const target = path.join(outputDir, `${project.slug}-${index + 1}.webp`);

      await sharp(source)
        .rotate()
        .resize({ width: project.width, withoutEnlargement: true })
        .webp({ quality: 86 })
        .toFile(target);

      console.log(`[assets] ${path.relative(root, target)}`);
    }
  }
}

main().catch((error) => {
  console.error("[assets] Failed:", error);
  process.exitCode = 1;
});
