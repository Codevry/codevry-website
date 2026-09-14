import type { Project } from "@/data/site";
import { Card } from "@/components/primitives";

/** GitHub mark, inlined so it can inherit `currentColor` on hover. */
function GithubMark() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
            <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.5l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5.01 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .28.18.6.69.5A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
            />
        </svg>
    );
}

function ExternalMark() {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="size-4"
        >
            <path
                d="M6 3h7v7M13 3L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function ProjectCard({ project }: { project: Project }) {
    const hasShots = Boolean(project.screenshots?.length);

    return (
        <Card className="group flex h-full flex-col p-0">
            {hasShots && (
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.07] bg-ink-800">
                    <img
                        src={project.screenshots![0]}
                        alt={`${project.title} interface`}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover object-top opacity-70 transition duration-700 ease-out-expo group-hover:scale-[1.03] group-hover:opacity-95"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent"
                    />
                </div>
            )}

            <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start gap-3.5">
                    <span
                        aria-hidden="true"
                        className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                    >
                        <img
                            src={project.icon}
                            alt=""
                            width={20}
                            height={20}
                            loading="lazy"
                            className="icon-white size-5 opacity-80"
                        />
                    </span>

                    <div className="min-w-0">
                        <h3 className="text-base font-medium tracking-tight text-white">
                            {project.title}
                        </h3>
                        <p className="mt-0.5 font-mono text-[11px] tracking-[0.18em] text-signal-400/80 uppercase">
                            {project.category}
                        </p>
                    </div>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/50">
                    {project.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                        <li
                            key={tag}
                            className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/45"
                        >
                            {tag}
                        </li>
                    ))}
                </ul>

                <div className="mt-6 flex items-center gap-4 border-t border-white/[0.07] pt-5">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
                    >
                        <GithubMark />
                        Source
                        <span className="sr-only">
                            for {project.title} on GitHub
                        </span>
                    </a>

                    {project.website && (
                        <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-signal-300"
                        >
                            <ExternalMark />
                            Live
                            <span className="sr-only">
                                site for {project.title}
                            </span>
                        </a>
                    )}
                </div>
            </div>
        </Card>
    );
}
