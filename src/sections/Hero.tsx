import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { settle } from "@lucasmarkes/hairline";
import { FOUNDER, SITE } from "@/data/site";
import { ArrowIcon, Container } from "@/components/primitives";
import HairlineFigure from "@/components/HairlineFigure";
import { cn } from "@/lib/cn";

const COLUMN_REFS = ["A", "B", "C", "D", "E", "F"];
const ROW_REFS = ["1", "2", "3"];

/** The four studio facts in the title block. */
const FACTS = [
    { label: "Studio", value: SITE.legalName },
    { label: "Based", value: `${SITE.location.city}, ${SITE.location.country}` },
    { label: "Practice", value: `${FOUNDER.yearsExperience} years` },
    { label: "Status", value: "Available for Work", status: true },
];

/**
 * Borders for the four fact cells, which sit two by two on phones and in one
 * row from lg up. The block draws every internal rule on the cell to its
 * left or above, so no edge is drawn twice.
 */
const FACT_BORDERS = [
    "border-r border-b lg:border-b-0",
    "border-b lg:border-b-0 lg:border-r",
    "border-r",
    "",
];

/** Leader from a note to the figure, ending in a small purple ring. */
const leader =
    "relative hidden h-px w-14 shrink-0 bg-line-strong lg:block xl:w-20 after:absolute after:-top-[3px] after:size-[7px] after:rounded-full after:border after:border-accent after:bg-surface";

/**
 * The hero is laid out as an engineering drawing. Hairline's Settle figure is
 * the drawing: scattered tiles that snap into a tree as the pointer nears,
 * framed by notes as the before and after of the work. The headline, the
 * actions and the studio's facts sit in the title block, where a drawing is
 * signed off.
 */
export default function Hero() {
    return (
        <section className="relative pt-24 pb-16 sm:pt-28 lg:pb-20">
            <Container>
                {/* data-reveal: the noscript rule in index.html pins this open,
                    since motion prerenders it at opacity 0. */}
                <motion.div
                    data-reveal=""
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mt-6 border border-line-strong bg-surface"
                >
                    {/* Grid references, as on a drawing sheet. */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 -top-6 flex justify-around font-mono text-[11px] text-fg-3"
                    >
                        {COLUMN_REFS.map((ref, i) => (
                            <span key={ref} className={cn(i >= 4 && "hidden md:inline")}>
                                {ref}
                            </span>
                        ))}
                    </div>
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 -left-6 hidden flex-col justify-around font-mono text-[11px] text-fg-3 xl:flex"
                    >
                        {ROW_REFS.map((ref) => (
                            <span key={ref}>{ref}</span>
                        ))}
                    </div>

                    {/* Drawing field. On phones the figure takes the width and
                        its notes sit beneath it; from lg up the figure is sized
                        by the field's height and the notes lead in from the
                        sides. */}
                    <div className="bg-grid-fine relative px-4 pt-5 pb-28 [--hairline-plate:var(--color-surface)] lg:h-[clamp(320px,40svh,480px)] lg:p-0">
                        <div className="relative mx-auto w-full max-w-[420px] lg:absolute lg:top-5 lg:bottom-14 lg:left-1/2 lg:aspect-[5/4] lg:w-auto lg:max-w-[calc(100%-30rem)] lg:-translate-x-1/2">
                            <HairlineFigure
                                mount={settle}
                                play
                                label="Twelve scattered tiles settle into a tree around a hub as the pointer comes near."
                            />

                            <p className="absolute top-full left-0 mt-4 text-[13px] leading-snug font-medium text-fg-2 lg:top-[40%] lg:right-full lg:left-auto lg:mt-0 lg:mr-3 lg:flex lg:items-center lg:gap-3 lg:text-right lg:text-sm">
                                <span className="lg:whitespace-nowrap">
                                    Scattered parts,
                                    <br />
                                    unclear ownership
                                </span>
                                <i aria-hidden="true" className={cn(leader, "after:-right-[3px]")} />
                            </p>
                            <p className="absolute top-full right-0 mt-4 text-right text-[13px] leading-snug font-medium text-accent lg:top-[40%] lg:right-auto lg:left-full lg:mt-0 lg:ml-3 lg:flex lg:items-center lg:gap-3 lg:text-left lg:text-sm">
                                <i aria-hidden="true" className={cn(leader, "after:-left-[3px]")} />
                                <span className="lg:whitespace-nowrap">
                                    One architecture,
                                    <br />
                                    every link drawn
                                </span>
                            </p>
                        </div>

                        {/* A dimension line: the span of the practice. */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-x-6 bottom-5 border-t border-line-strong pt-2 text-center font-mono text-[11px] text-fg-3 before:absolute before:-top-[5px] before:left-0 before:h-[10px] before:w-px before:bg-line-strong after:absolute after:-top-[5px] after:right-0 after:h-[10px] after:w-px after:bg-line-strong lg:inset-x-auto lg:bottom-4 lg:left-1/2 lg:w-[min(560px,56%)] lg:-translate-x-1/2"
                        >
                            {FOUNDER.yearsExperience} years in production
                        </div>
                    </div>

                    {/* Title block. */}
                    <div className="grid grid-cols-2 border-t border-line-strong bg-page lg:grid-cols-4">
                        <div className="col-span-2 border-b border-line-strong px-5 py-6 sm:px-7 sm:py-8 lg:col-span-3 lg:border-r">
                            <h1 className="text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.05] font-medium tracking-tight text-balance text-fg">
                                <span className="text-accent">
                                    Systems, sites and apps
                                </span>{" "}
                                architected and shipped.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-fg-2 sm:text-[17px]">
                                {SITE.name} is an independent software
                                architecture studio — {FOUNDER.yearsExperience}{" "}
                                years designing and building websites,
                                applications, APIs and AI systems for teams
                                that need them to work in production, not just
                                in a demo.
                            </p>
                        </div>

                        <div className="col-span-2 flex flex-col justify-center gap-3 border-b border-line-strong px-5 pb-6 sm:flex-row sm:px-7 lg:col-span-1 lg:flex-col lg:py-8">
                            <Link
                                to="/contact"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-on-accent transition duration-300 ease-out-expo hover:bg-accent-hover hover:shadow-[0_10px_24px_-12px] hover:shadow-accent/70"
                            >
                                Start a project
                                <ArrowIcon />
                            </Link>
                            <Link
                                to="/work"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-line-strong px-6 py-3.5 text-sm font-medium text-fg transition duration-300 ease-out-expo hover:border-fg/40 hover:bg-fg/5"
                            >
                                See the work
                                <ArrowIcon />
                            </Link>
                        </div>

                        {FACTS.map((fact, i) => (
                            <div
                                key={fact.label}
                                className={cn(
                                    "border-line-strong px-5 py-4 sm:px-7",
                                    FACT_BORDERS[i],
                                )}
                            >
                                <p className="text-[11px] tracking-[0.14em] text-fg-3 uppercase">
                                    {fact.label}
                                </p>
                                <p className="mt-1.5 inline-flex items-center gap-2 text-sm text-fg sm:text-base">
                                    {fact.status && (
                                        <span
                                            aria-hidden="true"
                                            className="size-1.5 rounded-full bg-accent"
                                        />
                                    )}
                                    {fact.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
