import type { RouteRecord } from "vite-react-ssg";
import Layout from "@/components/Layout";

/**
 * Route table for both the client router and the SSG prerender.
 *
 * Pages are lazily imported so each one becomes its own chunk; vite-react-ssg
 * resolves them at build time to emit a static HTML file per path.
 */
export const routes: RouteRecord[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                lazy: () =>
                    import("@/pages/Home").then((m) => ({
                        Component: m.default,
                    })),
            },
            {
                path: "services",
                lazy: () =>
                    import("@/pages/ServicesPage").then((m) => ({
                        Component: m.default,
                    })),
            },
            {
                path: "work",
                lazy: () =>
                    import("@/pages/WorkPage").then((m) => ({
                        Component: m.default,
                    })),
            },
            {
                path: "about",
                lazy: () =>
                    import("@/pages/AboutPage").then((m) => ({
                        Component: m.default,
                    })),
            },
            {
                path: "contact",
                lazy: () =>
                    import("@/pages/ContactPage").then((m) => ({
                        Component: m.default,
                    })),
            },
            {
                path: "*",
                lazy: () =>
                    import("@/pages/NotFound").then((m) => ({
                        Component: m.default,
                    })),
            },
        ],
    },
];
