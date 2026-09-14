import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Container, Eyebrow } from "@/components/primitives";

/** Compact hero used at the top of every page except home. */
export default function PageHero({
    eyebrow,
    title,
    lede,
}: {
    eyebrow: string;
    title: ReactNode;
    lede?: ReactNode;
}) {
    return (
        <section className="relative overflow-hidden border-b border-white/[0.07] pt-36 pb-20 sm:pt-44 sm:pb-24">
            {/* The grid lives on its own layer rather than on the section, and
                fades in from the top. Painted on the section it starts at the
                page origin, so a 64px line landed right at the edge of the
                fixed header and read as a stray second bar. */}
            <div
                aria-hidden="true"
                className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0,transparent_88px,black_240px)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-40 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(109,92,255,0.18),transparent_60%)]"
            />

            <Container className="relative">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl"
                >
                    <Eyebrow>{eyebrow}</Eyebrow>
                    <h1 className="mt-5 text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.06] font-medium tracking-tight text-balance text-white">
                        {title}
                    </h1>
                    {lede && (
                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-white/55 sm:text-lg">
                            {lede}
                        </p>
                    )}
                </motion.div>
            </Container>
        </section>
    );
}
