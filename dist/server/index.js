const MIME_TYPES = {
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
