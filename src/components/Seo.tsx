import { Head } from "vite-react-ssg";
import { SITE } from "@/data/site";
import { SHARE_IMAGE, canonical, getRoute, graphFor, shareImage } from "@/lib/seo";

type SeoProps = {
    /** Registered route path — pulls title/description from `ROUTES`. */
    path: string;
    /** Extra schema.org nodes appended to this page's @graph. */
    schema?: object[];
    /** Set on pages that must not be indexed (404). */
    noindex?: boolean;
};

/**
 * Emits the full head for a route. Because the site is prerendered by
 * vite-react-ssg, everything here lands in the static HTML — crawlers and
 * link unfurlers never have to execute JavaScript to see it.
 */
export default function Seo({ path, schema = [], noindex = false }: SeoProps) {
    const route = getRoute(path);
    const url = canonical(path);
    const ogImage = shareImage(route);

    return (
        <Head>
            <title>{route.title}</title>
            <meta name="description" content={route.description} />
            <link rel="canonical" href={url} />

            {noindex ? (
                <meta name="robots" content="noindex, follow" />
            ) : (
                <meta
                    name="robots"
                    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                />
            )}

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE.name} />
            <meta property="og:locale" content={SITE.locale} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={route.title} />
            <meta property="og:description" content={route.description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:secure_url" content={ogImage} />
            <meta property="og:image:type" content={SHARE_IMAGE.type} />
            <meta property="og:image:width" content={String(SHARE_IMAGE.width)} />
            <meta property="og:image:height" content={String(SHARE_IMAGE.height)} />
            <meta property="og:image:alt" content={route.imageAlt} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={route.title} />
            <meta name="twitter:description" content={route.description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content={route.imageAlt} />
            <meta name="twitter:creator" content="@dawnimpulse" />

            <script type="application/ld+json">
                {JSON.stringify(graphFor(path, schema))}
            </script>
        </Head>
    );
}
