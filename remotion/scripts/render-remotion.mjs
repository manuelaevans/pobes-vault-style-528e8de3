import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  publicDir: path.resolve(__dirname, "../public"),
  webpackOverride: (config) => config,
});

fs.cpSync(path.resolve(__dirname, "../public"), path.join(bundled, "public"), { recursive: true });

const browser = await openBrowser("chrome", {
  browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium",
  chromiumOptions: { args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] },
  chromeMode: "chrome-for-testing",
});

const publicDir = path.resolve(__dirname, "../public");
const composition = await selectComposition({ serveUrl: bundled, id: "main", puppeteerInstance: browser, publicDir });

await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: process.argv[2] ?? "/mnt/documents/pobes-vault-ad.mp4",
  puppeteerInstance: browser,
  muted: true,
  publicDir,
  concurrency: 1,
});

await browser.close({ silent: false });
console.log("done");
