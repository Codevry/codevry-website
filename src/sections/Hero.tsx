import { Suspense, lazy } from "react";
import { motion } from "motion/react";
import { ClientOnly } from "vite-react-ssg";
import { FOUNDER, SITE } from "@/data/site";
import { ArrowIcon, Container } from "@/components/primitives";
import { Link } from "react-router-dom";

const HeroCanvas = lazy(() => import("@/three/HeroCanvas"));

/**
 * The hero runs two layouts rather than one responsive compromise.
 *
 * From `lg` up the canvas is full-bleed behind the copy and the graph sits in
 * the free right-hand column. Below `lg` there is no free column, so stacking
 * wins: the scene gets its own band above the text and nothing overlaps.
 * Overlaying at phone widths put the graph straight through the eyebrow and
 * headline and clipped the orb against the header.
 */
export default function Hero() {
    return (
        // Stacked, the content runs taller than the viewport, so it starts under
        // the header rather than centring and clipping at both ends.
        <section className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden pt-16 pb-16 lg:justify-center lg:pt-24 lg:pb-20">
            {/* Scene: a sized band on mobile, full-bleed from lg up. */}
            <div className="relative h-[38svh] max-h-[380px] min-h-[260px] w-full shrink-0 lg:absolute lg:inset-0 lg:h-auto lg:max-h-none lg:min-h-0">
                {/* Client-only: the prerender has no WebGL context, and the copy
                    below is the real content for crawlers regardless. */}
                <ClientOnly>
                    {() => (
                        <Suspense fallback={null}>
                            <HeroCanvas />
                        </Suspense>
                    )}
                </ClientOnly>

                {/* Melts the band into the page on mobile. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -bottom-px h-24 bg-gradient-to-t from-ink-950 to-transparent lg:hidden"
                />
            </div>

            {/* Vignettes only matter where text sits over the scene. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-ink-950)_88%)] lg:block"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-ink-950 to-transparent lg:block"
            />

            <Container className="relative z-10 mt-10 lg:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl"
                >
                    <p className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-white/45 uppercase sm:text-sm">
                        <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full bg-signal-400 shadow-[0_0_10px_2px] shadow-signal-400/60"
                        />
                        Available for Work
                    </p>

                    <h1 className="mt-5 text-[clamp(2.125rem,6.4vw,4.75rem)] leading-[1.05] font-medium tracking-tight text-balance sm:mt-7">
                        <span className="text-gradient">
                            Systems, sites and apps
                        </span>{" "}
                        <span className="block sm:inline">
                            architected and shipped.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/60 sm:mt-7 sm:text-lg">
                        {SITE.name} is an independent software architecture
                        studio — {FOUNDER.yearsExperience} years designing and
                        building websites, applications, APIs and AI systems for
                        teams that need them to work in production, not just in
                        a demo.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
                        <Link
                            to="/contact"
                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-ink-950 transition duration-300 ease-out-expo hover:bg-signal-300 hover:shadow-[0_0_40px_-8px] hover:shadow-signal-400/60"
                        >
                            Start a project
                            <ArrowIcon />
                        </Link>
                        <Link
                            to="/work"
                            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-medium text-white/85 transition duration-300 ease-out-expo hover:border-white/35 hover:bg-white/5 hover:text-white"
                        >
                            See the work
                            <ArrowIcon />
                        </Link>
                    </div>
                </motion.div>
            </Container>

            {/* Hidden on phones, where it crowds the buttons. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-7 z-10 hidden justify-center lg:flex"
            >
                <img
                    src="/icons/pan-down.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="icon-white size-6 animate-float-hint opacity-40"
                />
            </div>
        </section>
    );
}
