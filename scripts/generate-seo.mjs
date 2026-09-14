/**
 * Post-build SEO artefacts: sitemap.xml and robots.txt.
 *
 * The sitemap is derived from the pages vite-react-ssg actually emitted rather
 * than from a hand-kept list, so it can never claim a URL that doesn't exist or
 * miss one that does. Anything the page itself marked `noindex` is skipped.
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname;
const SITE_URL = (process.env.SITE_URL ?? "https://codevry.com").replace(
    /\/$/,
    "",
);

/** Per-route sitemap hints. Anything unlisted falls back to the defaults. */
const HINTS = {
    "/": { priority: "1.0", changefreq: "monthly" },
    "/services": { priority: "0.9", changefreq: "monthly" },
    "/work": { priority: "0.9", changefreq: "monthly" },
    "/about": { priority: "0.8", changefreq: "yearly" },
    "/contact": { priority: "0.7", changefreq: "yearly" },
};
const DEFAULT_HINT = { priority: "0.5", changefreq: "yearly" };

async function findHtml(dir) {
    const found = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "assets") continue;
            found.push(...(await findHtml(full)));
        } else if (entry.name.endsWith(".html")) {
            found.push(full);
        }
    }
    return found;
}

/**
 * Maps an emitted file back to the URL it serves. Handles both output styles:
 * flat (`services.html` -> `/services`) and nested (`services/index.html`).
 */
function toRoutePath(file) {
    const rel = relative(DIST, file).split(sep).join("/");
    if (rel === "index.html") return "/";
    if (rel.endsWith("/index.html"))
        return `/${rel.slice(0, -"/index.html".length)}`;
    if (rel.endsWith(".html")) return `/${rel.slice(0, -".html".length)}`;
    return null;
}

const escapeXml = (value) =>
    value.replace(
        /[<>&'"]/g,
        (c) =>
            ({
                "<": "&lt;",
                ">": "&gt;",
                "&": "&amp;",
                "'": "&apos;",
                '"': "&quot;",
            })[c],
    );

async function main() {
    try {
        await stat(DIST);
    } catch {
        throw new Error(`No build output at ${DIST} — run the build first.`);
    }

    const files = await findHtml(DIST);
    const entries = [];

    for (const file of files) {
        const path = toRoutePath(file);
        if (path === null) continue;

        const html = await readFile(file, "utf8");
        // Honour the page's own directive rather than maintaining a second list.
        if (/name=["']robots["'][^>]*noindex/i.test(html)) continue;

        const { priority, changefreq } = HINTS[path] ?? DEFAULT_HINT;
        entries.push({ path, priority, changefreq });
    }

    entries.sort(
        (a, b) => Number(b.priority) - Number(a.priority) ||
            a.path.localeCompare(b.path),
    );

    const lastmod = new Date().toISOString().slice(0, 10);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
    .map(
        ({ path, priority, changefreq }) => `    <url>
        <loc>${escapeXml(path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`)}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`,
    )
    .join("\n")}
</urlset>
`;

    const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

    await writeFile(join(DIST, "sitemap.xml"), sitemap, "utf8");
    await writeFile(join(DIST, "robots.txt"), robots, "utf8");

    console.log(
        `SEO: wrote sitemap.xml (${entries.length} URLs) and robots.txt`,
    );
    for (const entry of entries) console.log(`  ${entry.path}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
