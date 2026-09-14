import { FOUNDER, SERVICES, SITE, SOCIALS } from "@/data/site";

export type RouteMeta = {
    path: string;
    title: string;
    description: string;
    /** Short label used in nav and breadcrumbs. */
    label: string;
    /** Lower for utility pages so the sitemap reflects real importance. */
    priority: number;
    changefreq: "daily" | "weekly" | "monthly" | "yearly";
};

/**
 * Every indexable route, declared once. Drives the router, the nav, the
 * sitemap and the breadcrumb structured data so they can never drift apart.
 */
export const ROUTES: RouteMeta[] = [
    {
        path: "/",
        label: "Home",
        title: `${SITE.name} — Software Architecture & Engineering Studio`,
        description: SITE.description,
        priority: 1.0,
        changefreq: "monthly",
    },
    {
        path: "/services",
        label: "Services",
        title: `Services — Systems Architecture, Web, Mobile & Platform Engineering | ${SITE.name}`,
        description:
            "Systems architecture, websites and web applications, mobile apps, APIs and backend platforms, AI and agentic systems, plus architecture review and fractional CTO advisory — delivered by a principal architect with 9+ years in production systems.",
        priority: 0.9,
        changefreq: "monthly",
    },
    {
        path: "/work",
        label: "Work",
        title: `Work & Open Source — Applications, Services and Developer Tools | ${SITE.name}`,
        description:
            "The Codevry open-source suite: Wlpapr, Scroll, Foundation, Pixels, Horm, Restmap, JSON Keys Sort and Github Backup. Real, shipped, readable codebases you can audit before hiring.",
        priority: 0.9,
        changefreq: "monthly",
    },
    {
        path: "/about",
        label: "About",
        title: `About Saksham Khurana — Founder & Principal Software Architect | ${SITE.name}`,
        description:
            "Saksham Khurana is a software architect in New Delhi with 9+ years building websites, applications and servers for clients including Angeles Academy, Capgemini, Noumena, Visualoud, MyDataLabs, TNine and Wayne.",
        priority: 0.8,
        changefreq: "yearly",
    },
    {
        path: "/contact",
        label: "Contact",
        title: `Contact — Start a Project with ${SITE.name}`,
        description:
            "Tell me what you are building and what has to be true for it to work. Email hey@sakshamkhurana.com to scope an architecture or engineering engagement.",
        priority: 0.7,
        changefreq: "yearly",
    },
];

export function getRoute(path: string): RouteMeta {
    const found = ROUTES.find((r) => r.path === path);
    if (!found) {
        // A page rendering with an unregistered path is a wiring bug, not a
        // runtime condition to paper over.
        throw new Error(`No route metadata registered for "${path}"`);
    }
    return found;
}

export const canonical = (path: string) =>
    path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`;

const socialProfiles = SOCIALS.map((s) => s.href);

/** schema.org Organization — establishes Codevry as a real business entity. */
export const organizationSchema = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${SITE.url}/`,
    logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/icons/codevry.svg`,
    },
    description: SITE.description,
    foundingDate: String(SITE.foundingYear),
    founder: { "@id": `${SITE.url}/#founder` },
    email: FOUNDER.email,
    address: {
        "@type": "PostalAddress",
        addressLocality: SITE.location.city,
        addressRegion: SITE.location.region,
        addressCountry: SITE.location.countryCode,
    },
    sameAs: socialProfiles,
};

/** schema.org Person — the architect behind the business. */
export const personSchema = {
    "@type": "Person",
    "@id": `${SITE.url}/#founder`,
    name: FOUNDER.name,
    jobTitle: FOUNDER.role,
    description: FOUNDER.shortBio,
    email: FOUNDER.email,
    url: FOUNDER.personalSite,
    worksFor: { "@id": `${SITE.url}/#organization` },
    address: {
        "@type": "PostalAddress",
        addressLocality: SITE.location.city,
        addressCountry: SITE.location.countryCode,
    },
    knowsAbout: [
        "Software architecture",
        "Web application development",
        "Mobile application development",
        "API design",
        "Backend platform engineering",
        "AI and agentic systems",
        "Retrieval augmented generation",
        "TypeScript",
        "Node.js",
        "React",
        "Vue.js",
        "Android",
    ],
    sameAs: socialProfiles,
};

/** schema.org ProfessionalService — makes the offering itself indexable. */
export const professionalServiceSchema = {
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#service`,
    name: SITE.name,
    url: `${SITE.url}/`,
    description: SITE.description,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Place", name: "Worldwide" },
    serviceType: SERVICES.map((s) => s.title),
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engineering & architecture services",
        itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: s.title,
                description: s.summary,
            },
        })),
    },
};

export const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en",
};

export function breadcrumbSchema(path: string) {
    const route = getRoute(path);
    const items = [{ name: "Home", item: `${SITE.url}/` }];
    if (path !== "/") items.push({ name: route.label, item: canonical(path) });

    return {
        "@type": "BreadcrumbList",
        "@id": `${canonical(path)}#breadcrumb`,
        itemListElement: items.map((entry, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: entry.name,
            item: entry.item,
        })),
    };
}

/**
 * Assembles the single `@graph` document emitted per page. One script tag with
 * cross-referenced @ids beats several disconnected ones.
 */
export function graphFor(path: string, extra: object[] = []) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            organizationSchema,
            personSchema,
            websiteSchema,
            professionalServiceSchema,
            breadcrumbSchema(path),
            {
                "@type": "WebPage",
                "@id": `${canonical(path)}#webpage`,
                url: canonical(path),
                name: getRoute(path).title,
                description: getRoute(path).description,
                isPartOf: { "@id": `${SITE.url}/#website` },
                about: { "@id": `${SITE.url}/#organization` },
                breadcrumb: { "@id": `${canonical(path)}#breadcrumb` },
                inLanguage: "en",
            },
            ...extra,
        ],
    };
}
