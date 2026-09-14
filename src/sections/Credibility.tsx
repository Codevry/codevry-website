import { CLIENTS, STATS } from "@/data/site";
import { Container, Reveal } from "@/components/primitives";

/**
 * Trust strip: who the work has been for, and the numbers behind it.
 *
 * Client names are set as type rather than logo files — using a company's mark
 * implies an endorsement they have not given, and wordmarks stay crisp at any
 * size with nothing to load.
 */
export default function Credibility() {
    return (
        <section
            aria-labelledby="credibility-heading"
            className="relative border-y border-white/[0.07] bg-ink-900/30 py-14 sm:py-16"
        >
            <Container>
                <h2 id="credibility-heading" className="sr-only">
                    Clients and track record
                </h2>

                <p className="text-center font-mono text-xs tracking-[0.22em] text-white/35 uppercase">
                    Trusted by teams at
                </p>

                {/* Marquee on small screens, static row once there is room. */}
                <div className="mt-8 overflow-hidden lg:hidden">
                    <div className="marquee-track flex w-max gap-12">
                        {[...CLIENTS, ...CLIENTS].map((client, i) => (
                            <span
                                key={`${client}-${i}`}
                                aria-hidden={i >= CLIENTS.length}
                                className="text-lg font-medium tracking-tight whitespace-nowrap text-white/45"
                            >
                                {client}
                            </span>
                        ))}
                    </div>
                </div>

                <ul className="mt-8 hidden items-center justify-between gap-8 lg:flex">
                    {CLIENTS.map((client) => (
                        <li
                            key={client}
                            className="text-xl font-medium tracking-tight text-white/40 transition-colors duration-500 hover:text-white/75"
                        >
                            {client}
                        </li>
                    ))}
                </ul>

                <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/[0.07] pt-12 lg:grid-cols-4">
                    {STATS.map((stat, i) => (
                        <Reveal key={stat.label} delay={i * 0.07}>
                            <div>
                                <dt className="sr-only">{stat.label}</dt>
                                <dd>
                                    <span className="block text-4xl font-medium tracking-tight text-white sm:text-5xl">
                                        {stat.value}
                                    </span>
                                    <span className="mt-2 block text-sm text-white/45">
                                        {stat.label}
                                    </span>
                                </dd>
                            </div>
                        </Reveal>
                    ))}
                </dl>
            </Container>
        </section>
    );
}
