import { SERVICES } from "@/data/site";
import {
    Card,
    Container,
    Reveal,
    SectionHeading,
} from "@/components/primitives";

type ServicesProps = {
    /** Home shows a trimmed set; the Services page shows everything. */
    limit?: number;
    heading?: boolean;
};

export default function Services({ limit, heading = true }: ServicesProps) {
    const items = limit ? SERVICES.slice(0, limit) : SERVICES;

    return (
        <section
            id="services"
            // Without the heading the section has nothing to be labelled by;
            // the page's own h1 already names it.
            aria-labelledby={heading ? "services-heading" : undefined}
            aria-label={heading ? undefined : "Services"}
            className="relative py-24 sm:py-32"
        >
            <Container>
                {heading && (
                    <Reveal>
                        <SectionHeading
                            eyebrow="What I do"
                            title={
                                <span id="services-heading">
                                    Engineering that survives production
                                </span>
                            }
                            lede="Six ways I work with clients — from a single architecture review to owning a website, app or platform end to end. Every engagement starts with a written brief and a fixed scope."
                        />
                    </Reveal>
                )}

                <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((service, i) => (
                        <li key={service.slug} className="h-full">
                            <Reveal delay={(i % 3) * 0.08} className="h-full">
                                <Card className="flex h-full flex-col">
                                    <span
                                        aria-hidden="true"
                                        className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                                    >
                                        <img
                                            src={service.icon}
                                            alt=""
                                            width={22}
                                            height={22}
                                            loading="lazy"
                                            className="icon-white size-[22px] opacity-70"
                                        />
                                    </span>

                                    <h3 className="mt-5 text-lg font-medium tracking-tight text-white">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-white/50">
                                        {service.summary}
                                    </p>

                                    <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5">
                                        {service.deliverables.map((item) => (
                                            <li
                                                key={item}
                                                className="flex gap-2.5 text-sm text-white/45"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="mt-[7px] size-1 shrink-0 rounded-full bg-signal-400/70"
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </Reveal>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
