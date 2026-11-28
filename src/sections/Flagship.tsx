import { FLAGSHIP } from "@/data/site";
import { ArrowIcon, Container, Reveal } from "@/components/primitives";

/**
 * Showcase for the studio's flagship product, Aira.
 *
 * The rest of the site is cream paper; this panel is the one dark surface on
 * it, set in Aira's own ink and blue so it reads as the product itself
 * rather than another card. Its colours are the `ink-*` and `aira` tokens in
 * index.css.
 */
export default function Flagship() {
    const f = FLAGSHIP;

    return (
        <section
            id="aira"
            aria-labelledby="aira-heading"
            className="relative pt-24 sm:pt-32"
        >
            <Container>
                <Reveal>
                    <div className="relative isolate overflow-hidden rounded-[28px] bg-ink text-ink-fg shadow-[0_40px_80px_-40px] shadow-fg/50 ring-1 ring-ink-line">
                        {/* Soft colour behind the copy, after Aira's own hero. */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 -z-10"
                        >
                            <span className="flagship-glow top-[-14rem] left-[-10rem] [--glow:210]" />
                            <span className="flagship-glow top-[-6rem] right-[-14rem] [--glow:330] [animation-delay:-7s]" />
                            <span className="flagship-glow top-[45%] left-[20%] [--glow:22] [animation-delay:-12s]" />
                        </div>

                        <div className="p-6 sm:p-10 lg:p-14">
                            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                                {/* Copy */}
                                <div className="lg:col-span-7">
                                    <p className="flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-aira uppercase">
                                        <span
                                            aria-hidden="true"
                                            className="h-px w-6 bg-aira/60"
                                        />
                                        Flagship product
                                    </p>

                                    <div className="mt-7 flex items-center gap-4">
                                        <img
                                            src={f.appIcon}
                                            width={64}
                                            height={64}
                                            alt=""
                                            className="-m-2 size-16 sm:size-[72px]"
                                        />
                                        <div>
                                            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                                {f.name}
                                            </p>
                                            <p className="font-mono text-xs text-ink-fg-3">
                                                /{f.pronunciation}/ · by Codevry
                                            </p>
                                        </div>
                                    </div>

                                    <h2
                                        id="aira-heading"
                                        className="mt-7 text-[clamp(2.1rem,5vw,4rem)] leading-[1.02] font-medium tracking-tight text-balance"
                                    >
                                        {f.headline}
                                    </h2>

                                    <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-ink-fg-2 sm:text-[17px]">
                                        {f.summary}
                                    </p>
                                </div>

                                {/* Actions and facts */}
                                <div className="flex flex-col gap-8 lg:col-span-5 lg:justify-end">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:[&>a]:flex-1 lg:flex-col">
                                        <a
                                            href={f.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-ink-fg px-6 py-3.5 text-sm font-medium whitespace-nowrap text-ink transition duration-300 ease-out-expo hover:bg-white hover:shadow-[0_10px_30px_-10px] hover:shadow-aira/60"
                                        >
                                            Visit aira.codevry.com
                                            <ArrowIcon />
                                        </a>
                                        <a
                                            href={f.download}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-ink-line-strong px-6 py-3.5 text-sm font-medium whitespace-nowrap text-ink-fg transition duration-300 ease-out-expo hover:border-ink-fg/50 hover:bg-white/5"
                                        >
                                            <AppleMark />
                                            Download for Mac
                                        </a>
                                    </div>

                                    <dl className="grid grid-cols-2 border-t border-l border-ink-line text-sm">
                                        {f.specs.map((spec) => (
                                            <div
                                                key={spec.label}
                                                className="border-r border-b border-ink-line px-4 py-3"
                                            >
                                                <dt className="text-[11px] tracking-[0.14em] text-ink-fg-3 uppercase">
                                                    {spec.label}
                                                </dt>
                                                <dd className="mt-1 text-ink-fg">
                                                    {spec.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>

                            {/* Screens: the app window, with device view laid
                                over its lower right corner from sm up. */}
                            <div className="relative mt-12 sm:mb-16 sm:w-[86%] lg:mt-16 lg:mb-20">
                                <figure className="relative overflow-hidden rounded-xl bg-ink-2 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] ring-1 ring-ink-line-strong">
                                    <img
                                        src={f.screenshot.src}
                                        width={f.screenshot.width}
                                        height={f.screenshot.height}
                                        alt={f.screenshot.alt}
                                        loading="lazy"
                                        decoding="async"
                                        className="block h-auto w-full"
                                    />
                                </figure>

                                <figure className="relative mt-4 overflow-hidden rounded-xl bg-ink-2 shadow-[0_30px_70px_-15px_rgb(0_0_0/0.85)] ring-1 ring-ink-line-strong sm:absolute sm:right-[-16%] sm:-bottom-16 sm:mt-0 sm:w-[52%] lg:-bottom-20">
                                    <img
                                        src={f.detail.src}
                                        width={f.detail.width}
                                        height={f.detail.height}
                                        alt={f.detail.alt}
                                        loading="lazy"
                                        decoding="async"
                                        className="block h-auto w-full"
                                    />
                                </figure>
                            </div>
                        </div>

                        {/* What it does. The 1px gaps over the line colour
                            draw the rules between cells at every width. */}
                        <ul className="grid gap-px border-t border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
                            {f.highlights.map((h, i) => (
                                <li
                                    key={h.title}
                                    className="bg-ink px-6 py-6 sm:px-10 lg:px-8 lg:py-8"
                                >
                                    <p className="font-mono text-[11px] tracking-[0.18em] text-aira uppercase">
                                        {String(i + 1).padStart(2, "0")} · {h.title}
                                    </p>
                                    <p className="mt-2 text-sm leading-relaxed text-ink-fg-2">
                                        {h.body}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col gap-3 border-t border-ink-line px-6 py-5 font-mono text-xs text-ink-fg-3 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
                            <p>Built with {f.stack.join(" · ")}</p>
                            <a
                                href={f.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 text-ink-fg-2 transition-colors hover:text-ink-fg"
                            >
                                Read the source on GitHub
                                <ArrowIcon className="size-3.5" />
                            </a>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}

function AppleMark() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
            <path
                fill="currentColor"
                d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.33-3.54ZM14.18 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.58-2.57 1.32-.56.65-1.06 1.7-.92 2.7.98.08 1.98-.5 2.58-1.24Z"
            />
        </svg>
    );
}
