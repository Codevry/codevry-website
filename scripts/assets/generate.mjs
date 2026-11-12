/**
 * Generates the site's brand icons, per-page share images and project-card
 * covers into public/.
 *
 * Rerun after changing the logo, the palette, or a page's headline:
 *
 *     npx playwright install chromium   # once per machine
 *     npm run assets
 *
 * Colours are read from src/styles/index.css and the logo shape from
 * public/icons/codevry.svg, so the output follows the site rather than a copy
 * of it. The share images draw the same Hairline figure as the hero.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const PUBLIC = join(ROOT, "public");
const MODULES = join(ROOT, "node_modules");

/* ---------------------------------------------------------------- inputs */

/** `--color-*` tokens from the @theme block, e.g. { page: "#f5efe4" }. */
async function readPalette() {
    const css = await readFile(join(ROOT, "src/styles/index.css"), "utf8");
    const theme = css.slice(css.indexOf("@theme"), css.indexOf("@layer base"));
    const palette = {};
    for (const [, name, value] of theme.matchAll(/--color-([\w-]+):\s*([^;]+);/g)) {
        palette[name] = value.trim();
    }
    for (const key of ["page", "surface", "fg", "fg-2", "fg-3", "line", "line-strong", "accent"]) {
        if (!palette[key]) throw new Error(`index.css has no --color-${key}`);
    }
    return palette;
}

/** The `d` of every path in the logo, so it can be recoloured. */
async function readLogoPaths() {
    const svg = await readFile(join(PUBLIC, "icons/codevry.svg"), "utf8");
    const paths = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
    if (!paths.length) throw new Error("No paths found in public/icons/codevry.svg");
    return paths;
}

async function dataUri(file, type) {
    return `data:${type};base64,${(await readFile(file)).toString("base64")}`;
}

/* ----------------------------------------------------------------- icons */

/**
 * The logo on a 512 canvas. `scale` sizes the mark about the centre; `radius`
 * rounds the tile; without `bg` the mark sits on transparency.
 */
function logoSvg(paths, { fill, bg, radius = 0, scale = 0.74 }) {
    const shift = 256 * (1 - scale);
    const tile = bg ? `<rect width="512" height="512" rx="${radius}" fill="${bg}"/>` : "";
    const marks = paths.map((d) => `<path d="${d}" fill="${fill}"/>`).join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${tile}<g transform="translate(${shift} ${shift}) scale(${scale})">${marks}</g></svg>`;
}

async function rasterise(page, svg, size) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
        `<html><body style="margin:0;background:transparent">${svg.replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`,
    );
    return page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
}

/** An .ico that embeds PNGs, which every current browser reads. */
function packIco(images) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(images.length, 4);
    const entries = Buffer.alloc(16 * images.length);
    let offset = header.length + entries.length;
    images.forEach(({ size, png }, i) => {
        const at = i * 16;
        entries.writeUInt8(size >= 256 ? 0 : size, at);
        entries.writeUInt8(size >= 256 ? 0 : size, at + 1);
        entries.writeUInt16LE(1, at + 4);
        entries.writeUInt16LE(32, at + 6);
        entries.writeUInt32LE(png.length, at + 8);
        entries.writeUInt32LE(offset, at + 12);
        offset += png.length;
    });
    return Buffer.concat([header, entries, ...images.map((i) => i.png)]);
}

async function generateIcons(page, palette, paths) {
    const write = (name, data) => writeFile(join(PUBLIC, name), data);
    // A cream tile keeps the brown mark visible on light and dark tab strips.
    const tab = { fill: palette.fg, bg: palette.page, radius: 112, scale: 0.74 };

    await write("favicon.svg", logoSvg(paths, tab) + "\n");

    // Small sizes get a larger mark: the logo's stripes blur below 32px.
    const small = { ...tab, radius: 96, scale: 0.84 };
    const ico = [];
    for (const size of [16, 32, 48]) {
        ico.push({ size, png: await rasterise(page, logoSvg(paths, size < 48 ? small : tab), size) });
    }
    await write("favicon.ico", packIco(ico));

    // iOS rounds the corners itself and wants an opaque square.
    await write("apple-touch-icon.png", await rasterise(page, logoSvg(paths, { ...tab, radius: 0, scale: 0.62 }), 180));

    await write("icon-192.png", await rasterise(page, logoSvg(paths, tab), 192));
    await write("icon-512.png", await rasterise(page, logoSvg(paths, tab), 512));
    // Maskable: full bleed, mark inside the central safe zone.
    await write("icon-maskable-512.png", await rasterise(page, logoSvg(paths, { ...tab, radius: 0, scale: 0.56 }), 512));

    // Raster logo for structured data; search engines prefer it to SVG.
    await write("logo.png", await rasterise(page, logoSvg(paths, { fill: palette.fg, scale: 0.92 }), 512));

    console.log("icons: favicon.svg, favicon.ico, apple-touch-icon.png, icon-192/512, icon-maskable-512, logo.png");
}

/* ----------------------------------------------------------- share images */

/**
 * One card per indexable route. Titles mirror each page's own headline; the
 * <em> part takes the accent colour, as the home headline does on the site.
 */
const PAGES = [
    { file: "home", path: "/", title: "<em>Systems, sites and apps</em> architected and shipped." },
    { file: "services", path: "/services", title: "Architecture first. <em>Then the code.</em>" },
    { file: "work", path: "/work", title: "Shipped, public, and <em>open to inspection.</em>" },
    { file: "about", path: "/about", title: "Saksham Khurana, <em>founder and principal software architect.</em>" },
    { file: "contact", path: "/contact", title: "Let’s <em>scope it properly.</em>" },
];

/** Studio facts for the title block; keep in step with src/data/site.ts. */
const FACTS = [
    ["Studio", "Codevry Labs"],
    ["Based", "New Delhi, India"],
    ["Practice", "9+ years"],
];

function cardHtml({ title, path }, { palette, paths, fonts, hairline }) {
    const p = palette;
    const logo = logoSvg(paths, { fill: p.fg, scale: 1 });
    const sheet = path === "/" ? "codevry.com" : `codevry.com${path}`;
    return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url(${fonts.sans}) format("woff2"); font-weight: 100 900; }
@font-face { font-family: "Geist Mono"; src: url(${fonts.mono}) format("woff2"); font-weight: 100 900; }
* { box-sizing: border-box; }
html, body { margin: 0; width: 1200px; height: 630px; background: ${p.page}; color: ${p.fg}; font-family: Geist, sans-serif; -webkit-font-smoothing: antialiased; }
.refs { position: absolute; left: 48px; right: 48px; top: 18px; display: flex; justify-content: space-around; font: 500 13px "Geist Mono", monospace; color: ${p["fg-3"]}; }
.sheet {
    position: absolute; left: 48px; right: 48px; top: 42px; bottom: 40px;
    border: 1.5px solid ${p["line-strong"]}; background: ${p.surface};
    display: grid; grid-template-rows: 1fr auto;
}
.field {
    display: grid; grid-template-columns: 1fr 360px; gap: 28px; padding: 34px 40px 26px;
    background-image: linear-gradient(to right, rgb(42 29 21 / 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(42 29 21 / 0.05) 1px, transparent 1px);
    background-size: 24px 24px;
}
.copy { display: flex; flex-direction: column; min-width: 0; }
.brand { display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 17px; letter-spacing: 0.28em; }
.brand svg { width: 30px; height: 30px; }
h1 { margin: auto 0 0; font-size: 54px; line-height: 1.04; letter-spacing: -0.035em; font-weight: 560; text-wrap: balance; }
h1 em { font-style: normal; color: ${p.accent}; }
.fig { align-self: center; --hairline-plate: ${p.surface}; --hairline-hi: ${p.accent}; --hairline-edge: ${p["fg-2"]}; --hairline-mid: #8a7260; --hairline-lo: #d3c6b1; --hairline-stroke: 1.2; }
.fig > div { width: 360px; aspect-ratio: 5 / 4; }
.block { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1.5px solid ${p["line-strong"]}; background: ${p.page}; }
.cell { padding: 14px 22px 16px; border-right: 1.5px solid ${p["line-strong"]}; }
.cell:last-child { border-right: 0; }
.k { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: ${p["fg-3"]}; }
.v { margin-top: 5px; font-size: 19px; }
.v.url { color: ${p.accent}; font-weight: 500; }
</style></head><body>
<div class="refs"><span>A</span><span>B</span><span>C</span><span>D</span><span>E</span><span>F</span></div>
<div class="sheet">
    <div class="field">
        <div class="copy">
            <div class="brand">${logo}CODEVRY</div>
            <h1>${title}</h1>
        </div>
        <div class="fig"><div id="figure"></div></div>
    </div>
    <div class="block">
        ${FACTS.map(([k, v]) => `<div class="cell"><div class="k">${k}</div><div class="v">${v}</div></div>`).join("")}
        <div class="cell"><div class="k">Sheet</div><div class="v url">${sheet}</div></div>
    </div>
</div>
<script type="module">
${hairline}
window.__figure = settle(document.getElementById("figure"), { theme: "light", intensity: 0.65 });
</script>
</body></html>`;
}

async function generateShareImages(page, palette, paths) {
    const fonts = {
        sans: await dataUri(join(MODULES, "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2"), "font/woff2"),
        mono: await dataUri(join(MODULES, "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2"), "font/woff2"),
    };
    const hairline = await readFile(join(MODULES, "@lucasmarkes/hairline/dist/index.js"), "utf8");
    await mkdir(join(PUBLIC, "og"), { recursive: true });

    await page.setViewportSize({ width: 1200, height: 630 });
    for (const card of PAGES) {
        await page.setContent(cardHtml(card, { palette, paths, fonts, hairline }), { waitUntil: "load" });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForFunction(() => document.querySelector("#figure svg"));
        // Hold the pointer over the hub so the tiles settle into their tree.
        const box = await page.locator("#figure").boundingBox();
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
        await page.waitForTimeout(1800);
        await page.screenshot({ path: join(PUBLIC, "og", `${card.file}.png`), clip: { x: 0, y: 0, width: 1200, height: 630 } });
        console.log(`og/${card.file}.png`);
    }
}

/* ------------------------------------------------------------- covers */

/**
 * Light covers for the project cards. The originals are full-resolution
 * captures (up to 2.5k wide, 900 KB) shown at about 360px; these are what the
 * site actually loads. Keep the dimensions in src/data/site.ts in step.
 */
const COVERS = [
    { from: "images/apps/wlpapr/desktop.jpeg", to: "images/apps/wlpapr/cover.webp", width: 800 },
    { from: "images/apps/scroll/2.png", to: "images/apps/scroll/cover.webp", width: 800 },
];

async function generateCovers(page) {
    await page.setContent("<html><body></body></html>");
    for (const cover of COVERS) {
        const type = cover.from.endsWith(".png") ? "image/png" : "image/jpeg";
        const src = await dataUri(join(PUBLIC, cover.from), type);
        const out = await page.evaluate(async ({ src, maxWidth }) => {
            const img = new Image();
            img.src = src;
            await img.decode();
            const scale = Math.min(1, maxWidth / img.naturalWidth);
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(img.naturalWidth * scale);
            canvas.height = Math.round(img.naturalHeight * scale);
            const ctx = canvas.getContext("2d");
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            return { data: canvas.toDataURL("image/webp", 0.82), width: canvas.width, height: canvas.height };
        }, { src, maxWidth: cover.width });
        await writeFile(join(PUBLIC, cover.to), Buffer.from(out.data.split(",")[1], "base64"));
        console.log(`${cover.to}: ${out.width}x${out.height}`);
    }
}

/* ------------------------------------------------------------------ main */

let chromium;
try {
    ({ chromium } = await import("playwright"));
} catch {
    console.error("Playwright is not installed. Run `npm install`, then `npx playwright install chromium`.");
    process.exit(1);
}

const browser = await chromium.launch(
    process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
try {
    const page = await browser.newPage();
    const [palette, paths] = await Promise.all([readPalette(), readLogoPaths()]);
    await generateIcons(page, palette, paths);
    await generateShareImages(page, palette, paths);
    await generateCovers(page);
} finally {
    await browser.close();
}
