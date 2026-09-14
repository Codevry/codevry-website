import { PROCESS } from "@/data/site";
import { Container, Reveal, SectionHeading } from "@/components/primitives";

export default function Process() {
    return (
        <section
            aria-labelledby="process-heading"
            className="bg-grid relative border-y border-white/[0.07] py-24 sm:py-32"
        >
            <Container>
                <Reveal>
                    <SectionHeading
                        eyebrow="How it works"
                        title={
                            <span id="process-heading">
                                No surprises, no open-ended invoices
                            </span>
                        }
                        lede="Four stages, agreed up front. You always know what is being built, what it costs and what you own at the end."
                    />
                </Reveal>

                <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-4">
                    {PROCESS.map((stage, i) => (
                        <li key={stage.step} className="bg-ink-950">
                            <Reveal delay={i * 0.08}>
                                <div className="flex h-full flex-col p-7">
                                    <span
                                        aria-hidden="true"
                                        className="font-mono text-xs tracking-[0.22em] text-signal-400"
                                    >
                                        {stage.step}
                                    </span>
                                    <h3 className="mt-4 text-lg font-medium tracking-tight text-white">
                                        {stage.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-white/50">
                                        {stage.body}
                                    </p>
                                </div>
                            </Reveal>
                        </li>
                    ))}
                </ol>
            </Container>
        </section>
    );
}
