import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/** Client-side navigation does not reset scroll on its own. */
function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // An in-page anchor should be left to the browser's own handling.
        if (hash) return;
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, [pathname, hash]);

    return null;
}

export default function Layout() {
    return (
        <>
            <ScrollToTop />

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink-950"
            >
                Skip to content
            </a>

            <Header />

            <main id="main">
                <Outlet />
            </main>

            <Footer />
        </>
    );
}
