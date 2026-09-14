/// <reference types="vite-react-ssg" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        // Source maps stay off in production; this is public-facing marketing code.
        sourcemap: false,
        // three.js alone is over the default warning threshold and is meant to
        // be — it loads lazily, after the page is already interactive.
        chunkSizeWarningLimit: 1800,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Keep the WebGL stack in its own chunks so nothing else
                    // waits on it.
                    if (id.includes("node_modules/three")) return "three";
                    if (id.includes("@react-three")) return "r3f";
                },
            },
        },
    },
    ssgOptions: {
        // Flat output (`/about` -> `about.html`) so the emitted `404.html` lands
        // where static hosts actually look for it.
        dirStyle: "flat",
        script: "async",
        // beasties/critters is an optional peer and isn't installed; the CSS
        // bundle is small enough that inlining it buys little.
        beastiesOptions: false,
        includedRoutes(paths: string[]) {
            // The catch-all route isn't a real path, so it never gets
            // prerendered on its own — ask for it explicitly.
            return [...paths, "/404"];
        },
        onPageRendered(_route: string, html: string) {
            // The prerenderer emits <link rel="modulepreload"> for every chunk
            // it can reach, WebGL included. Preloading ~2 MB of three.js at
            // high priority would undo the lazy hero entirely and cost the
            // page its LCP, so those links are dropped — the chunks still load
            // on demand once the canvas mounts.
            return html.replace(
                /<link\b[^>]*rel="modulepreload"[^>]*>/g,
                (tag) =>
                    /\/assets\/(three|r3f|HeroCanvas|ArchitectureScene)-/.test(
                        tag,
                    )
                        ? ""
                        : tag,
            );
        },
    },
    ssr: {
        // three and the R3F stack are ESM-only and must not be externalised
        // during the SSG pass, or the prerender crashes on `require`.
        noExternal: ["three", "@react-three/fiber", "@react-three/drei"],
    },
});
