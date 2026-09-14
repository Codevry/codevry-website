import { Suspense, lazy } from "react";
import { motion } from "motion/react";
import { ClientOnly } from "vite-react-ssg";
import { FOUNDER, SITE } from "@/data/site";
import { ArrowIcon, Container } from "@/components/primitives";
import { Link } from "react-router-dom";

const HeroCanvas = lazy(() => import("@/three/HeroCanvas"));

export default function Hero() {
    return (
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20">
            {/* WebGL scene. Client-only: the prerender has no WebGL context, and
                the text below is the real content for crawlers regardless. */}
            <ClientOnly>
                {() => (
                    <Suspense fallback={null}>
                        <HeroCanvas />
                    </Suspense>
                )}
            </ClientOnly>

            {/* Vignette so the headline keeps its contrast over the scene. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-ink-950)_88%)]"
            />
            {/* On phones the scene sits directly behind the copy, so the lower
                half gets an extra scrim. Removed once there is a free column. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/75 to-ink-950 lg:hidden"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"
            />

            <Container className="relative z-10">
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

                    <h1 className="mt-7 text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.03] font-medium tracking-tight text-balance">
                        <span className="text-gradient">
                            Systems, sites and apps
                        </span>
                        <br />
                        architected and shipped.
                    </h1>

                    <p className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-white/60 sm:text-lg">
                        I'm {FOUNDER.name} — founder of {SITE.name}.{" "}
                        {FOUNDER.yearsExperience} years architecting and
                        building websites, applications, APIs and AI systems for
                        teams that need them to work in production, not just in
                        a demo.
                    </p>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link
                            to="/contact"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink-950 transition duration-300 ease-out-expo hover:bg-signal-300 hover:shadow-[0_0_40px_-8px] hover:shadow-signal-400/60"
                        >
                            Start a project
                            <ArrowIcon />
                        </Link>
                        <Link
                            to="/work"
                            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white/85 transition duration-300 ease-out-expo hover:border-white/35 hover:bg-white/5 hover:text-white"
                        >
                            See the work
                            <ArrowIcon />
                        </Link>
                    </div>
                </motion.div>
            </Container>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex justify-center"
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
