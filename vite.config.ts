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
    },
    ssgOptions: {
        // Flat output (`/about` -> `about.html`) so the emitted `404.html` lands
        // where static hosts actually look for it.
        dirStyle: "flat",
        // No `script: "async"`: an async module can run before the parser
        // reaches the inline build-hash script at the end of <body>, and the
        // client then fetches `static-loader-data-manifest-undefined.json` and
        // fails hydration. Module scripts are deferred by default, which
        // already keeps them off the critical path.
        // beasties/critters is an optional peer and isn't installed; the CSS
        // bundle is small enough that inlining it buys little.
        beastiesOptions: false,
        includedRoutes(paths: string[]) {
            // The catch-all route isn't a real path, so it never gets
            // prerendered on its own — ask for it explicitly.
            return [...paths, "/404"];
        },
    },
});
