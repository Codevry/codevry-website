import { CLIENTS } from "@/data/site";
import { Container } from "@/components/primitives";
import { cn } from "@/lib/cn";

/**
 * Trust strip: who the work has been for.
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
                    Clients
                </h2>

                <p className="text-center font-mono text-xs tracking-[0.22em] text-white/35 uppercase">
                    Trusted by teams at
                </p>

                {/* Marquee on small screens, static row once there is room. */}
                <div className="mt-8 overflow-hidden lg:hidden">
                    <div className="marquee-track flex w-max gap-10">
                        {[...CLIENTS, ...CLIENTS].map((client, i) => (
                            <span
                                key={`${client.name}-${i}`}
                                // The duplicate pass exists only to make the
                                // loop seamless; it is not extra content.
                                aria-hidden={i >= CLIENTS.length}
                                className={cn(
                                    "whitespace-nowrap",
                                    client.primary
                                        ? "text-lg font-semibold tracking-tight text-white/80"
                                        : "text-lg font-medium tracking-tight text-white/45",
                                )}
                            >
                                {client.name}
                            </span>
                        ))}
                    </div>
                </div>

                <ul className="mt-8 hidden flex-wrap items-center justify-between gap-x-8 gap-y-4 lg:flex">
                    {CLIENTS.map((client) => (
                        <li
                            key={client.name}
                            className={cn(
                                "tracking-tight transition-colors duration-500",
                                client.primary
                                    ? "text-2xl font-semibold text-white/80 hover:text-white"
                                    : "text-xl font-medium text-white/40 hover:text-white/75",
                            )}
                        >
                            {client.name}
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
