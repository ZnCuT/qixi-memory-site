import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the complete Qixi experience and private metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /写给你的七夕情书/);
  assert.match(html, /七夕有封信/);
  assert.match(html, /关于我们/);
  assert.match(html, /关于我们/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Starter Project/);
});

test("keeps content centralized and mobile fallbacks present", async () => {
  const [page, content, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(page, /from ".\/content"/);
  assert.match(content, /export const catchGame/);
  assert.match(page, /catchGame/);
  assert.ok((content.match(/title:/g) ?? []).length >= 6);
  assert.equal((content.match(/image: "\/photos\//g) ?? []).length, 6);
  assert.match(css, /@media\(max-width:800px\)/);
  assert.match(css, /@media\(max-width:360px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /overflow-x:hidden/);
  assert.match(page, /aria-label/);
  assert.match(page, /onPointerDown/);
  assert.match(css, /\.catch-game/);
});
