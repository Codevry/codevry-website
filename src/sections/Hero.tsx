import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FOUNDER, SITE } from "@/data/site";
import { ArrowIcon, Container, MaskIcon } from "@/components/primitives";

export default function Hero() {
    return (
        <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-20">
            {/* The same quiet ground as the inner pages' heroes: a faint grid
                that fades in below the fixed header, and a soft accent wash. */}
            <div
                aria-hidden="true"
                className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0,transparent_88px,black_240px,black_72%,transparent)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-40 h-[560px] bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--color-accent)_12%,transparent),transparent_62%)]"
            />

            <Container className="relative">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl"
                >
                    <p className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-fg-3 uppercase sm:text-sm">
                        <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full bg-accent"
                        />
                        Available for Work
                    </p>

                    <h1 className="mt-5 text-[clamp(2.125rem,6.4vw,4.75rem)] leading-[1.05] font-medium tracking-tight text-balance text-fg sm:mt-7">
                        <span className="text-accent">
                            Systems, sites and apps
                        </span>{" "}
                        <span className="block sm:inline">
                            architected and shipped.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-fg-2 sm:mt-7 sm:text-lg">
                        {SITE.name} is an independent software architecture
                        studio — {FOUNDER.yearsExperience} years designing and
                        building websites, applications, APIs and AI systems for
                        teams that need them to work in production, not just in
                        a demo.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
                        <Link
                            to="/contact"
                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-medium text-on-accent transition duration-300 ease-out-expo hover:bg-accent-hover hover:shadow-[0_10px_24px_-12px] hover:shadow-accent/70"
                        >
                            Start a project
                            <ArrowIcon />
                        </Link>
                        <Link
                            to="/work"
                            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-line-strong px-7 py-3.5 text-sm font-medium text-fg transition duration-300 ease-out-expo hover:border-fg/40 hover:bg-fg/5"
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
                className="pointer-events-none absolute inset-x-0 bottom-7 hidden justify-center lg:flex"
            >
                <MaskIcon
                    src="/icons/pan-down.svg"
                    className="size-6 animate-float-hint text-fg-3"
                />
            </div>
        </section>
    );
}
