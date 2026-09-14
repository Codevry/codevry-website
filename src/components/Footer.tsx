import { Link } from "react-router-dom";
import { FOUNDER, SITE, SOCIALS } from "@/data/site";
import { ROUTES } from "@/lib/seo";
import { ArrowIcon, Container } from "@/components/primitives";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-28 border-t border-white/[0.07] bg-ink-900/40">
            <Container className="py-14 sm:py-16">
                <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div>
                        <Link
                            to="/"
                            className="flex w-fit items-center gap-2.5"
                            aria-label={`${SITE.name} — home`}
                        >
                            <img
                                src="/icons/codevry-white.svg"
                                alt=""
                                width={28}
                                height={28}
                                className="size-7"
                            />
                            <span className="text-sm font-semibold tracking-[0.28em] text-white">
                                CODEVRY
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
                            {SITE.tagline} An independent architecture studio
                            led by {FOUNDER.name}, working from{" "}
                            {SITE.location.city} with clients worldwide.
                        </p>

                        <a
                            href={`mailto:${FOUNDER.email}`}
                            className="group mt-6 inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-signal-300"
                        >
                            {FOUNDER.email}
                            <ArrowIcon />
                        </a>
                    </div>

                    <nav aria-label="Footer">
                        <h2 className="font-mono text-xs tracking-[0.22em] text-white/35 uppercase">
                            Site
                        </h2>
                        <ul className="mt-5 space-y-3">
                            {ROUTES.map((route) => (
                                <li key={route.path}>
                                    <Link
                                        to={route.path}
                                        className="text-sm text-white/55 transition-colors hover:text-white"
                                    >
                                        {route.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h2 className="font-mono text-xs tracking-[0.22em] text-white/35 uppercase">
                            Elsewhere
                        </h2>
                        <ul className="mt-5 space-y-3">
                            <li>
                                <a
                                    href={FOUNDER.personalSite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-white/55 transition-colors hover:text-white"
                                >
                                    sakshamkhurana.com
                                </a>
                            </li>
                            {SOCIALS.map((social) => (
                                <li key={social.href}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-white/55 transition-colors hover:text-white"
                                    >
                                        {social.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.07] pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {year} {SITE.legalName}. All rights reserved.
                    </p>
                    <p>
                        {SITE.location.city}, {SITE.location.country} · Working
                        worldwide
                    </p>
                </div>
            </Container>
        </footer>
    );
}
