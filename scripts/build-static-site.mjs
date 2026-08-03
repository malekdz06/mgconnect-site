import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const client = path.join(dist, "client");
const server = path.join(dist, "server");

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });

const entries = [
  "a-propos.html",
  "actualites.html",
  "contact.html",
  "detaillants.html",
  "distribution.html",
  "fournisseurs.html",
  "index.html",
  "izem-catalogue.html",
  "izem-cerise.html",
  "izem-classic.html",
  "izem-coco-myrtille.html",
  "izem-energy.html",
  "izem-fraise-abricot.html",
  "izem-fruits-rouges.html",
  "izem-grenade.html",
  "izem-mangue.html",
  "izem-mojito.html",
  "izem-pasteque-fraise.html",
  "izem-poire.html",
  "izem-pomme-figue.html",
  "izem-tropical.html",
  "izem-vanille-mure.html",
  "izem-zero-cerise.html",
  "izem-zero-classic.html",
  "izem-zero-pomme-figue.html",
  "marche-canadien.html",
  "produits-non-alimentaires.html",
  "produits.html",
  "script.js",
  "styles.css",
  "sitemap.xml",
  "robots.txt",
  "favicon.ico",
  "apple-touch-icon.png",
  "site.webmanifest",
  "assets-web",
  "assets"
];

for (const entry of entries) {
  const source = path.join(root, entry);
  if (!existsSync(source)) continue;
  await cp(source, path.join(client, entry), { recursive: true });
}

const worker = `const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function contentType(pathname) {
  const dot = pathname.lastIndexOf(".");
  const ext = dot >= 0 ? pathname.slice(dot).toLowerCase() : ".html";
  return MIME_TYPES[ext] || "application/octet-stream";
}

async function fetchAsset(env, request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  const response = await env.ASSETS.fetch(new Request(url, request));
  if (response.status === 404) return null;
  const headers = new Headers(response.headers);
  headers.set("content-type", contentType(pathname));
  headers.set("cache-control", pathname.includes("assets") ? "public, max-age=31536000, immutable" : "public, max-age=60");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/") pathname = "/index.html";

    let response = await fetchAsset(env, request, pathname);
    if (response) return response;

    if (!pathname.includes(".")) {
      response = await fetchAsset(env, request, pathname + ".html");
      if (response) return response;
    }

    response = await fetchAsset(env, request, "/index.html");
    if (response) return response;

    return new Response("Not found", { status: 404 });
  }
};
`;

await writeFile(path.join(server, "index.js"), worker, "utf8");

