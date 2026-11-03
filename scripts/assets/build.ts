import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const imagesDir = path.join(publicDir, "images");
const photoSource =
  process.env.PHOTO_SOURCE ?? path.resolve(root, "..", "4x4.jpg");

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Francisco Florit">
  <rect width="64" height="64" rx="16" fill="#0f766e"/>
  <path d="M17 19h14v5h-8v7h7v5h-7v13h-6V19Z" fill="#ffffff"/>
  <path d="M35 19h14v5h-8v7h7v5h-7v13h-6V19Z" fill="#ffffff" opacity=".88"/>
</svg>`;

async function exists(file: string) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function buildProfile() {
  if (!(await exists(photoSource))) {
    console.warn(
      `[assets] Photo source not found at ${photoSource}. Skipping profile.jpg.`,
    );
    return;
  }

  await sharp(photoSource)
    .rotate()
    .resize(900, 900, { fit: "cover", position: "centre" })
    .jpeg({ quality: 86, mozjpeg: true, progressive: true })
    .toFile(path.join(imagesDir, "profile.jpg"));

  console.log("[assets] public/images/profile.jpg");
}

async function buildIcons() {
  await writeFile(path.join(publicDir, "icon.svg"), ICON_SVG, "utf8");

  await sharp(Buffer.from(ICON_SVG))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-icon.png"));

  console.log("[assets] public/icon.svg");
  console.log("[assets] public/apple-icon.png");
}

const OG_HTML = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; width: 1200px; height: 630px; }
      body {
        position: relative;
        overflow: hidden;
        background: #070b10;
        color: #e6edf3;
        font-family: "Segoe UI", Arial, sans-serif;
      }
      .grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(to right, rgba(45, 212, 191, .09) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(45, 212, 191, .09) 1px, transparent 1px);
        background-size: 60px 60px;
        mask-image: radial-gradient(ellipse 70% 80% at 25% 20%, #000 20%, transparent 75%);
      }
      .glow {
        position: absolute;
        width: 520px;
        height: 520px;
        right: -80px;
        top: -160px;
        border-radius: 999px;
        background: rgba(45, 212, 191, .18);
        filter: blur(90px);
      }
      .wrap {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 54px 64px 48px;
      }
      .top, .bottom { display: flex; align-items: center; justify-content: space-between; }
      .brand { display: flex; align-items: center; gap: 16px; }
      .monogram {
        display: grid;
        place-items: center;
        width: 52px;
        height: 52px;
        border: 1px solid rgba(45, 212, 191, .4);
        border-radius: 14px;
        background: rgba(45, 212, 191, .1);
        color: #2dd4bf;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: .02em;
      }
      .brand-name { font-size: 18px; font-weight: 600; letter-spacing: -.01em; }
      .brand-role {
        margin-top: 4px;
        color: #93a1b1;
        font-family: Consolas, monospace;
        font-size: 10px;
        letter-spacing: .2em;
        text-transform: uppercase;
      }
      .url {
        color: #93a1b1;
        font-family: Consolas, monospace;
        font-size: 12px;
        letter-spacing: .08em;
      }
      .eyebrow {
        margin: 0 0 18px;
        color: #2dd4bf;
        font-family: Consolas, monospace;
        font-size: 13px;
        letter-spacing: .24em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        font-size: 104px;
        font-weight: 650;
        line-height: .92;
        letter-spacing: -.055em;
      }
      h1 span { color: #5eead4; }
      .summary {
        margin: 26px 0 0;
        max-width: 720px;
        color: #93a1b1;
        font-size: 22px;
        line-height: 1.45;
      }
      .bottom {
        color: #93a1b1;
        font-family: Consolas, monospace;
        font-size: 12px;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .rule { width: 44px; height: 1px; background: #2dd4bf; }
    </style>
  </head>
  <body>
    <div class="grid"></div>
    <div class="glow"></div>
    <div class="wrap">
      <div class="top">
        <div class="brand">
          <div class="monogram">FF</div>
          <div>
            <div class="brand-name">Francisco Florit</div>
            <div class="brand-role">Full Stack Developer</div>
          </div>
        </div>
        <div class="url">floritfran.github.io/portfolio</div>
      </div>

      <div>
        <p class="eyebrow">Backend · Frontend · Mobile</p>
        <h1>Productos completos,<br />de la API a la <span>interfaz</span>.</h1>
        <p class="summary">
          Java · Spring Boot · React · TypeScript · React Native
        </p>
      </div>

      <div class="bottom">
        <span>Buenos Aires, Argentina</span>
        <span class="rule"></span>
        <span>5+ años de experiencia</span>
      </div>
    </div>
  </body>
</html>`;

async function buildOgImage() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    });

    await page.setContent(OG_HTML, { waitUntil: "load" });
    await page.screenshot({
      path: path.join(publicDir, "og-image.png"),
      type: "png",
    });
  } finally {
    await browser.close();
  }

  console.log("[assets] public/og-image.png");
}

async function main() {
  await mkdir(imagesDir, { recursive: true });
  await buildProfile();
  await buildIcons();
  await buildOgImage();
}

main().catch((error) => {
  console.error("[assets] Failed:", error);
  process.exitCode = 1;
});
