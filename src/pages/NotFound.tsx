import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { SITE } from "@/data/site";
import { ROUTES } from "@/lib/seo";
import { ArrowIcon, Container } from "@/components/primitives";

export default function NotFound() {
    return (
        <>
            {/* Not a registered route, so the head is written inline rather than
                through <Seo>. Never indexable. */}
            <Head>
                <title>{`Page not found — ${SITE.name}`}</title>
                <meta name="robots" content="noindex, follow" />
                <meta
                    name="description"
                    content="The page you were looking for doesn't exist."
                />
            </Head>

            <section className="bg-grid flex min-h-[100svh] items-center pt-24 pb-20">
                <Container>
                    <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
                        Error 404
                    </p>

                    <h1 className="mt-6 max-w-2xl text-[clamp(2.25rem,6vw,4rem)] leading-[1.06] font-medium tracking-tight text-balance text-fg">
                        This route was never architected.
                    </h1>

                    <p className="mt-6 max-w-lg text-base leading-relaxed text-fg-2">
                        The page you asked for doesn't exist. Here is everything
                        that does.
                    </p>

                    <nav aria-label="Site pages" className="mt-10">
                        <ul className="flex flex-wrap gap-3">
                            {ROUTES.map((route) => (
                                <li key={route.path}>
                                    <Link
                                        to={route.path}
                                        className="group inline-flex items-center gap-2 rounded-xl border border-line-strong px-6 py-3 text-sm font-medium text-fg transition duration-300 ease-out-expo hover:border-fg/40 hover:bg-fg/5 hover:text-fg"
                                    >
                                        {route.label}
                                        <ArrowIcon />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Container>
            </section>
        </>
    );
}
