import { CAPABILITIES, FOUNDER, SITE } from "@/data/site";
import {
    ArrowIcon,
    Container,
    Reveal,
    SectionHeading,
} from "@/components/primitives";

export default function About() {
    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="relative py-24 sm:py-32"
        >
            <Container>
                <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                    <Reveal>
                        <SectionHeading
                            eyebrow="The architect"
                            title={
                                <span id="about-heading">
                                    One architect, accountable end to end
                                </span>
                            }
                        />

                        <div className="mt-7 space-y-5 text-base leading-relaxed text-pretty text-fg-2">
                            <p>{FOUNDER.longBio}</p>
                            <p>
                                {SITE.name} started as my open-source suite of
                                tools, services and applications — and became
                                the studio I take client work on through. Front
                                end to infrastructure, one person owns the
                                architecture, so you deal with whoever is
                                actually making the decisions rather than an
                                account manager relaying them.
                            </p>
                            <p>
                                Based in {SITE.location.city},{" "}
                                {SITE.location.country}; working with teams
                                across time zones. Outside the terminal I run,
                                ride, swim and lift — currently training for an
                                Ironman.
                            </p>
                        </div>

                        <div className="mt-9 flex flex-wrap gap-3">
                            <a
                                href={FOUNDER.personalSite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 rounded-xl border border-line-strong px-6 py-3 text-sm font-medium text-fg transition duration-300 ease-out-expo hover:border-fg/40 hover:bg-fg/5 hover:text-fg"
                            >
                                More about me
                                <ArrowIcon />
                            </a>
                            <a
                                href="https://github.com/dawnimpulse"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 rounded-xl border border-line-strong px-6 py-3 text-sm font-medium text-fg transition duration-300 ease-out-expo hover:border-fg/40 hover:bg-fg/5 hover:text-fg"
                            >
                                GitHub
                                <ArrowIcon />
                            </a>
                        </div>
                    </Reveal>

                    <Reveal delay={0.12}>
                        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-7 sm:p-9">
                            <p className="font-mono text-xs tracking-[0.22em] text-fg-3 uppercase">
                                Working with
                            </p>

                            <ul className="mt-6 flex flex-wrap gap-2">
                                {CAPABILITIES.map((capability) => (
                                    <li
                                        key={capability}
                                        className="rounded-full border border-line bg-fg/[0.03] px-3.5 py-1.5 text-sm text-fg-2"
                                    >
                                        {capability}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-9 border-t border-line pt-7">
                                <p className="font-mono text-xs tracking-[0.22em] text-fg-3 uppercase">
                                    Currently
                                </p>
                                <p className="mt-4 flex items-center gap-2.5 text-sm text-fg">
                                    <span
                                        aria-hidden="true"
                                        className="size-1.5 rounded-full bg-accent "
                                    />
                                    Taking on new client engagements
                                </p>
                                <p className="mt-3 text-sm text-fg-3">
                                    Typical engagements run from a two-week
                                    architecture review to a multi-month build.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}
