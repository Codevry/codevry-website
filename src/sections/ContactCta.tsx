import { FOUNDER } from "@/data/site";
import { ArrowIcon, Container, Reveal } from "@/components/primitives";

export default function ContactCta() {
    return (
        <section
            aria-labelledby="cta-heading"
            className="relative overflow-hidden py-24 sm:py-32"
        >
            {/* Accent glow behind the panel. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[420px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(109,92,255,0.16),transparent_65%)]"
            />

            <Container>
                <Reveal>
                    <div className="hairline bg-grid relative overflow-hidden rounded-3xl border border-white/[0.09] bg-ink-900/60 px-7 py-16 text-center sm:px-14 sm:py-20">
                        <p className="font-mono text-xs tracking-[0.22em] text-signal-400 uppercase">
                            Start a project
                        </p>

                        <h2
                            id="cta-heading"
                            className="mx-auto mt-6 max-w-2xl text-3xl leading-[1.12] font-medium tracking-tight text-balance text-white sm:text-4xl md:text-5xl"
                        >
                            Tell me what you're building — and what has to be
                            true for it to work.
                        </h2>

                        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/55">
                            One email, one call, then a written scope. If it
                            isn't a fit I'll say so, and point you at someone
                            who is.
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <a
                                href={`mailto:${FOUNDER.email}?subject=Project%20enquiry`}
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-ink-950 transition duration-300 ease-out-expo hover:bg-signal-300 hover:shadow-[0_0_40px_-8px] hover:shadow-signal-400/60"
                            >
                                {FOUNDER.email}
                                <ArrowIcon />
                            </a>

                            {FOUNDER.bookingUrl && (
                                <a
                                    href={FOUNDER.bookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-medium text-white/85 transition duration-300 ease-out-expo hover:border-white/35 hover:bg-white/5 hover:text-white"
                                >
                                    Book a call
                                    <ArrowIcon />
                                </a>
                            )}
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}
