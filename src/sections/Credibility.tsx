import type { CSSProperties } from "react";
import { CLIENTS, type Client } from "@/data/site";
import { Container } from "@/components/primitives";
import { cn } from "@/lib/cn";

/**
 * Trust strip: who the work has been for.
 *
 * Logos are shown monochrome: the file is used only as a shape mask (the
 * shared `.icon` class) and painted in the current text colour, so a roster of
 * differently coloured brand marks reads as one quiet row in the site palette.
 * Clients without a logo file fall back to a typeset wordmark.
 */
export default function Credibility() {
    return (
        <section
            aria-labelledby="credibility-heading"
            className="border-line bg-sunken relative border-y py-14 sm:py-16"
        >
            <Container>
                <h2 id="credibility-heading" className="sr-only">
                    Clients
                </h2>

                <p className="text-fg-3 text-center font-mono text-xs tracking-[0.22em] uppercase">
                    Trusted by teams at
                </p>

                {/* Marquee on small screens, static row once there is room. */}
                <div className="mt-8 overflow-hidden lg:hidden">
                    <div className="marquee-track flex w-max items-center gap-12">
                        {[...CLIENTS, ...CLIENTS].map((client, i) => (
                            <span
                                key={`${client.name}-${i}`}
                                // The duplicate pass exists only to make the
                                // loop seamless; it is not extra content.
                                aria-hidden={i >= CLIENTS.length}
                                className="text-fg-3 flex items-center whitespace-nowrap"
                            >
                                <ClientMark client={client} size="sm" />
                            </span>
                        ))}
                    </div>
                </div>

                <ul className="mt-8 hidden flex-wrap items-center justify-between gap-x-10 gap-y-6 lg:flex">
                    {CLIENTS.map((client) => (
                        <li
                            key={client.name}
                            className="text-fg-3 hover:text-fg flex items-center transition-colors duration-500"
                        >
                            <ClientMark client={client} size="lg" />
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}

/** One client: a monochrome logo when a file exists, otherwise its name. */
function ClientMark({ client, size }: { client: Client; size: "sm" | "lg" }) {
    if (client.logo) {
        const height =
            size === "lg"
                ? client.primary
                    ? "h-9"
                    : "h-7"
                : client.primary
                  ? "h-7"
                  : "h-6";
        return (
            <span
                role="img"
                aria-label={client.name}
                className="icon"
                style={{ "--icon": `url("${client.logo}")` } as CSSProperties}
            >
                {/* Invisible copy of the logo that gives the mask its natural
                    aspect ratio, so marks of any shape need no hand-set width. */}
                <img
                    src={client.logo}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className={cn("block w-auto max-w-40 opacity-0", height)}
                />
            </span>
        );
    }

    return (
        <span
            className={cn(
                "tracking-tight",
                size === "lg"
                    ? client.primary
                        ? "text-2xl"
                        : "text-xl"
                    : "text-lg",
                client.primary ? "font-semibold" : "font-medium",
            )}
        >
            {client.name}
        </span>
    );
}
