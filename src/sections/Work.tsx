import { useState } from "react";
import { Link } from "react-router-dom";
import {
    PROJECTS,
    PROJECT_CATEGORIES,
    type ProjectCategory,
} from "@/data/site";
import ProjectCard from "@/components/ProjectCard";
import {
    ArrowIcon,
    Container,
    Reveal,
    SectionHeading,
} from "@/components/primitives";
import { cn } from "@/lib/cn";

type Filter = ProjectCategory | "All";
const FILTERS: Filter[] = ["All", ...PROJECT_CATEGORIES];

type WorkProps = {
    /** Home shows a preview with a link out; /work shows the filterable set. */
    preview?: boolean;
};

export default function Work({ preview = false }: WorkProps) {
    const [filter, setFilter] = useState<Filter>("All");

    const visible = preview
        ? PROJECTS.slice(0, 3)
        : filter === "All"
          ? PROJECTS
          : PROJECTS.filter((p) => p.category === filter);

    return (
        <section
            id="work"
            aria-labelledby="work-heading"
            className="relative py-24 sm:py-32"
        >
            <Container>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <Reveal>
                        <SectionHeading
                            eyebrow="Selected work"
                            title={
                                <span id="work-heading">
                                    Code you can read before you hire me
                                </span>
                            }
                            lede="Client work is mostly under NDA, so here is the open-source suite instead — applications, backend services and developer tools, all shipped and all public."
                        />
                    </Reveal>

                    {preview && (
                        <Reveal delay={0.1}>
                            <Link
                                to="/work"
                                className="group inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-white/85 transition duration-300 ease-out-expo hover:border-white/35 hover:bg-white/5 hover:text-white"
                            >
                                All {PROJECTS.length} projects
                                <ArrowIcon />
                            </Link>
                        </Reveal>
                    )}
                </div>

                {!preview && (
                    <div
                        role="tablist"
                        aria-label="Filter projects by category"
                        className="mt-12 flex flex-wrap gap-2"
                    >
                        {FILTERS.map((option) => {
                            const active = filter === option;
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setFilter(option)}
                                    className={cn(
                                        "rounded-xl border px-4 py-2 text-sm transition duration-300",
                                        active
                                            ? "border-white/25 bg-white text-ink-950"
                                            : "border-white/12 text-white/55 hover:border-white/30 hover:text-white",
                                    )}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                )}

                <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {visible.map((project, i) => (
                        <li key={project.title} className="h-full">
                            <Reveal delay={(i % 3) * 0.08} className="h-full">
                                <ProjectCard project={project} />
                            </Reveal>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
