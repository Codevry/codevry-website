import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE } from "@/data/site";
import { ROUTES } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { ArrowIcon, Container } from "@/components/primitives";

const NAV = ROUTES.filter((r) => r.path !== "/" && r.path !== "/contact");

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Any navigation closes the mobile sheet.
    useEffect(() => setOpen(false), [pathname]);

    // The sheet covers the page, so the body must not scroll behind it.
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo",
                scrolled || open
                    ? "border-b border-white/[0.07] bg-ink-950/80 backdrop-blur-xl"
                    : "border-b border-transparent",
            )}
        >
            <Container>
                <div className="flex h-16 items-center justify-between sm:h-20">
                    <Link
                        to="/"
                        className="flex items-center gap-2.5"
                        aria-label={`${SITE.name} — home`}
                    >
                        <img
                            src="/icons/codevry-white.svg"
                            alt=""
                            width={28}
                            height={28}
                            className="size-7"
                        />
                        <span className="text-sm font-semibold tracking-[0.28em] text-white">
                            CODEVRY
                        </span>
                    </Link>

                    <nav
                        aria-label="Primary"
                        className="hidden items-center gap-1 md:flex"
                    >
                        {NAV.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    cn(
                                        "rounded-full px-4 py-2 text-sm transition-colors duration-300",
                                        isActive
                                            ? "text-white"
                                            : "text-white/55 hover:text-white",
                                    )
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Link
                            to="/contact"
                            className="group hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink-950 transition duration-300 ease-out-expo hover:bg-signal-300 sm:inline-flex"
                        >
                            Start a project
                            <ArrowIcon />
                        </Link>

                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-controls="mobile-nav"
                            aria-label={open ? "Close menu" : "Open menu"}
                            className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
                        >
                            <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                aria-hidden="true"
                                className="size-5"
                            >
                                {open ? (
                                    <path
                                        d="M5 5l10 10M15 5L5 15"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                ) : (
                                    <path
                                        d="M3 6h14M3 12h14"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </Container>

            {open && (
                <nav
                    id="mobile-nav"
                    aria-label="Mobile"
                    className="border-t border-white/[0.07] md:hidden"
                >
                    <Container className="flex flex-col gap-1 py-5">
                        {[...NAV, { path: "/contact", label: "Contact" }].map(
                            (item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        cn(
                                            "rounded-xl px-4 py-3 text-base transition-colors",
                                            isActive
                                                ? "bg-white/5 text-white"
                                                : "text-white/60",
                                        )
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ),
                        )}
                    </Container>
                </nav>
            )}
        </header>
    );
}
