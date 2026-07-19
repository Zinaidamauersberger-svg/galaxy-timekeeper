import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

const rootFiles = ["index.html", "styles.css", "favicon.svg"];
const scriptFiles = ["app.js", "calculations.js", "data.js"];

mkdirSync("dist/js", { recursive: true });
mkdirSync("dist/server", { recursive: true });
mkdirSync("dist/.openai", { recursive: true });

for (const file of rootFiles) {
  copyFileSync(file, `dist/${file}`);
}

for (const file of scriptFiles) {
  copyFileSync(`js/${file}`, `dist/js/${file}`);
}

copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");

const repositoryFiles = [
  ".openai/hosting.json",
  ".gitignore",
  "DEVPOST_SUBMISSION.md",
  "LICENSE",
  "PROJECT_BRIEF_DE.md",
  "README.md",
  "docs/media/devpost-cover.png",
  "docs/media/devpost-explorer.png",
  "docs/media/devpost-results.png",
  "favicon.svg",
  "index.html",
  "js/app.js",
  "js/calculations.js",
  "js/data.js",
  "package.json",
  "package-lock.json",
  "scripts/build.mjs",
  "styles.css",
  "tests/calculations.test.js",
  "vite.config.js",
];

const archivePath = "dist/galaxy-timekeeper-source.tar.gz";
execFileSync("tar", ["-czf", archivePath, ...repositoryFiles]);
const archive = readFileSync(archivePath);
const archiveBase64 = archive.toString("base64");
const archiveSha256 = createHash("sha256").update(archive).digest("hex");

const assets = new Map([
  ["/", [readFileSync("index.html", "utf8"), "text/html; charset=utf-8"]],
  ["/index.html", [readFileSync("index.html", "utf8"), "text/html; charset=utf-8"]],
  ["/styles.css", [readFileSync("styles.css", "utf8"), "text/css; charset=utf-8"]],
  ["/favicon.svg", [readFileSync("favicon.svg", "utf8"), "image/svg+xml; charset=utf-8"]],
  ["/js/app.js", [readFileSync("js/app.js", "utf8"), "text/javascript; charset=utf-8"]],
  ["/js/calculations.js", [readFileSync("js/calculations.js", "utf8"), "text/javascript; charset=utf-8"]],
  ["/js/data.js", [readFileSync("js/data.js", "utf8"), "text/javascript; charset=utf-8"]],
]);

const workerSource = `const assets = new Map(${JSON.stringify([...assets])});
const archiveBase64 = ${JSON.stringify(archiveBase64)};
const archiveSha256 = ${JSON.stringify(archiveSha256)};

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/galaxy-timekeeper-source.tar.gz") {
      return new Response(decodeBase64(archiveBase64), {
        headers: {
          "content-type": "application/gzip",
          "content-disposition": "attachment; filename=galaxy-timekeeper-source.tar.gz",
          "cache-control": "no-store",
          "x-content-sha256": archiveSha256,
          "x-content-type-options": "nosniff",
        },
      });
    }

    if (url.pathname === "/galaxy-timekeeper-source.sha256") {
      return new Response(archiveSha256 + "  galaxy-timekeeper-source.tar.gz\\n", {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store",
          "x-content-type-options": "nosniff",
        },
      });
    }

    const asset = assets.get(url.pathname);

    if (!asset) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(asset[0], {
      headers: {
        "content-type": asset[1],
        "cache-control": url.pathname === "/" || url.pathname === "/index.html"
          ? "no-cache"
          : "public, max-age=3600",
        "x-content-type-options": "nosniff",
      },
    });
  },
};
`;

writeFileSync("dist/server/index.js", workerSource);

console.log(`Static site prepared in dist/. Source archive SHA-256: ${archiveSha256}`);
