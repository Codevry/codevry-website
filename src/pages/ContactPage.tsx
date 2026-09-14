import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { FOUNDER, SITE, SOCIALS } from "@/data/site";
import {
    ArrowIcon,
    Card,
    Container,
    Reveal,
} from "@/components/primitives";
import { canonical } from "@/lib/seo";

const BRIEF_PROMPTS = [
    "What you're building, in a couple of sentences",
    "What currently exists — codebase, team, constraints",
    "What success looks like, and by when",
    "Rough budget range, so I can tell you quickly if it fits",
];

const ENGAGEMENTS = [
    {
        title: "Architecture review",
        duration: "1–2 weeks",
        body: "An independent read on your codebase, architecture or roadmap, delivered as a written assessment with a prioritised remediation list.",
    },
    {
        title: "Design & build",
        duration: "1–6 months",
        body: "Architecture, implementation and handover for a defined system — the most common shape of engagement.",
    },
    {
        title: "Fractional CTO",
        duration: "Ongoing",
        body: "Recurring senior technical ownership: roadmap, reviews, vendor calls and hiring input, on a monthly retainer.",
    },
];

const FAQ = [
    {
        q: "How do payments work?",
        a: "Invoicing and payment are handled directly, off this website — bank transfer or the rails that suit your finance team. Terms are agreed in the written scope before any work begins.",
    },
    {
        q: "Do you work with teams outside India?",
        a: `Yes. I work from ${SITE.location.city} with clients across time zones, and keep a few hours of overlap with your working day as part of the engagement terms.`,
    },
    {
        q: "Can you join an existing team?",
        a: "Often the best fit. I embed with your engineers, do the architecture and the hard parts, and leave documentation and patterns your team can carry on with.",
    },
    {
        q: "How quickly do you reply?",
        a: "Within one working day, always with a real answer — including a straight no when it isn't a fit.",
    },
];

/** FAQPage markup is eligible for rich results on the contact query. */
const faqSchema = [
    {
        "@type": "FAQPage",
        "@id": `${canonical("/contact")}#faq`,
        mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    },
    {
        "@type": "ContactPage",
        "@id": `${canonical("/contact")}#contactpage`,
        url: canonical("/contact"),
        mainEntity: { "@id": `${SITE.url}/#organization` },
    },
];

export default function ContactPage() {
    return (
        <>
            <Seo path="/contact" schema={faqSchema} />

            <PageHero
                eyebrow="Contact"
                title="Let's scope it properly."
                lede="No forms, no funnel. Send an email with the detail below and you'll get a considered reply within one working day."
            />

            <section aria-labelledby="reach-heading" className="py-20 sm:py-28">
                <Container>
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                        <Reveal>
                            <Card className="flex h-full flex-col justify-between p-8 sm:p-10">
                                <div>
                                    <h2
                                        id="reach-heading"
                                        className="text-2xl font-medium tracking-tight text-white sm:text-3xl"
                                    >
                                        Email me directly
                                    </h2>
                                    <p className="mt-4 text-sm leading-relaxed text-white/55">
                                        It reaches me, not an inbox someone else
                                        triages. Include what you can from the
                                        list opposite — the more specific the
                                        brief, the more useful the first reply.
                                    </p>
                                </div>

                                <a
                                    href={`mailto:${FOUNDER.email}?subject=Project%20enquiry`}
                                    className="group mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink-950 transition duration-300 ease-out-expo hover:bg-signal-300 hover:shadow-[0_0_40px_-8px] hover:shadow-signal-400/60"
                                >
                                    {FOUNDER.email}
                                    <ArrowIcon />
                                </a>

                                {FOUNDER.bookingUrl && (
                                    <a
                                        href={FOUNDER.bookingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group mt-3 inline-flex w-fit items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                                    >
                                        or book a call directly
                                        <ArrowIcon />
                                    </a>
                                )}
                            </Card>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <Card className="h-full p-8 sm:p-10">
                                <h2 className="font-mono text-xs tracking-[0.22em] text-white/35 uppercase">
                                    Worth including
                                </h2>
                                <ul className="mt-6 space-y-4">
                                    {BRIEF_PROMPTS.map((prompt) => (
                                        <li
                                            key={prompt}
                                            className="flex gap-3 text-sm leading-relaxed text-white/55"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="mt-[7px] size-1 shrink-0 rounded-full bg-signal-400/70"
                                            />
                                            {prompt}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-9 border-t border-white/[0.07] pt-7">
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
                            </Card>
                        </Reveal>
                    </div>
                </Container>
            </section>

            <section
                aria-labelledby="engagements-heading"
                className="border-y border-white/[0.07] bg-ink-900/30 py-20 sm:py-28"
            >
                <Container>
                    <h2
                        id="engagements-heading"
                        className="text-2xl font-medium tracking-tight text-white sm:text-3xl"
                    >
                        Shapes of engagement
                    </h2>

                    <ul className="mt-10 grid gap-5 md:grid-cols-3">
                        {ENGAGEMENTS.map((item, i) => (
                            <li key={item.title} className="h-full">
                                <Reveal delay={i * 0.08} className="h-full">
                                    <Card className="h-full">
                                        <p className="font-mono text-xs tracking-[0.18em] text-signal-400 uppercase">
                                            {item.duration}
                                        </p>
                                        <h3 className="mt-4 text-lg font-medium tracking-tight text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-white/50">
                                            {item.body}
                                        </p>
                                    </Card>
                                </Reveal>
                            </li>
                        ))}
                    </ul>
                </Container>
            </section>

            <section aria-labelledby="faq-heading" className="py-20 sm:py-28">
                <Container>
                    <h2
                        id="faq-heading"
                        className="text-2xl font-medium tracking-tight text-white sm:text-3xl"
                    >
                        Common questions
                    </h2>

                    <dl className="mt-10 grid gap-x-12 gap-y-9 md:grid-cols-2">
                        {FAQ.map((item, i) => (
                            <Reveal key={item.q} delay={(i % 2) * 0.08}>
                                <div>
                                    <dt className="text-base font-medium text-white">
                                        {item.q}
                                    </dt>
                                    <dd className="mt-3 text-sm leading-relaxed text-white/50">
                                        {item.a}
                                    </dd>
                                </div>
                            </Reveal>
                        ))}
                    </dl>
                </Container>
            </section>
        </>
    );
}
