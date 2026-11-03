import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { chromium } from "playwright";

import { resumeSchema } from "../../src/data/resume.schema";
import { renderCvHtml } from "./cv-template";

async function countPdfPages(file: string) {
  const data = new Uint8Array(await readFile(file));
  const task = getDocument({
    data,
    useWorkerFetch: false,
    useSystemFonts: true,
    disableFontFace: true,
  });
  const document = await task.promise;

  try {
    return document.numPages;
  } finally {
    await task.destroy();
  }
}

async function main() {
  const root = process.cwd();
  const raw = JSON.parse(
    await readFile(path.join(root, "src/data/resume.json"), "utf8"),
  );
  const resume = resumeSchema.parse(raw);
  const outputDir = path.join(root, "public", "cv");

  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch();
  let failed = false;

  try {
    for (const locale of ["es", "en"] as const) {
      const page = await browser.newPage();
      await page.setContent(renderCvHtml(resume, locale), {
        waitUntil: "load",
      });

      const file = path.join(
        outputDir,
        `Francisco-Florit-CV-${locale.toUpperCase()}.pdf`,
      );

      await page.pdf({
        path: file,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      });
      await page.close();

      const pages = await countPdfPages(file);
      console.log(
        `[resume] ${path.relative(root, file)} — ${pages} page${
          pages === 1 ? "" : "s"
        }`,
      );

      if (pages !== 1) {
        console.error(
          `[resume] ${locale.toUpperCase()} CV must fit on a single page`,
        );
        failed = true;
      }
    }
  } finally {
    await browser.close();
  }

  if (failed) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("[resume] Build failed:", error);
  process.exitCode = 1;
});
