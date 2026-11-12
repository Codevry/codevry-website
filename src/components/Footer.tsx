import { Link } from "react-router-dom";
import { FOUNDER, SITE, SOCIALS } from "@/data/site";
import { ROUTES } from "@/lib/seo";
import { ArrowIcon, Container, MaskIcon } from "@/components/primitives";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-28 border-t border-line bg-sunken">
            <Container className="py-14 sm:py-16">
                <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div>
                        <Link
                            to="/"
                            className="flex w-fit items-center gap-2.5"
                            aria-label={`${SITE.name} — home`}
                        >
                            <MaskIcon src="/icons/codevry.svg" className="size-7 text-fg" />
                            <span className="text-sm font-semibold tracking-[0.28em] text-fg">
                                CODEVRY
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-2">
                            {SITE.tagline} An independent architecture studio
                            led by {FOUNDER.name}, working from{" "}
                            {SITE.location.city} with clients worldwide.
                        </p>

                        <a
                            href={`mailto:${FOUNDER.email}`}
                            className="group mt-6 inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
                        >
                            {FOUNDER.email}
                            <ArrowIcon />
                        </a>
                    </div>

                    <nav aria-label="Footer">
                        <h2 className="font-mono text-xs tracking-[0.22em] text-fg-3 uppercase">
                            Site
                        </h2>
                        <ul className="mt-5 space-y-3">
                            {ROUTES.map((route) => (
                                <li key={route.path}>
                                    <Link
                                        to={route.path}
                                        className="text-sm text-fg-2 transition-colors hover:text-fg"
                                    >
                                        {route.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h2 className="font-mono text-xs tracking-[0.22em] text-fg-3 uppercase">
                            Elsewhere
                        </h2>
                        <ul className="mt-5 space-y-3">
                            <li>
                                <a
                                    href={FOUNDER.personalSite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-fg-2 transition-colors hover:text-fg"
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
                                        className="text-sm text-fg-2 transition-colors hover:text-fg"
                                    >
                                        {social.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
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
