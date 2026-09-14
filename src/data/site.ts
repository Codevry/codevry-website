/**
 * Single source of truth for everything editable on the site.
 *
 * Content lives here rather than inline in components so copy, links and
 * contact details can be changed without touching layout code.
 */

export const SITE = {
    name: "Codevry",
    legalName: "Codevry Labs",
    /** Used for canonical URLs, sitemap and structured data. No trailing slash. */
    url: "https://codevry.com",
    title: "Codevry — Software Architecture & Engineering Studio",
    tagline: "Architected and shipped.",
    description:
        "Codevry is an independent software architecture studio led by Saksham Khurana. We design and build websites, applications, APIs, backend platforms and AI systems for teams that need production-grade engineering, not prototypes.",
    locale: "en_IN",
    foundingYear: 2019,
    location: {
        city: "New Delhi",
        region: "Delhi",
        country: "India",
        countryCode: "IN",
    },
} as const;

export const FOUNDER = {
    name: "Saksham Khurana",
    role: "Founder & Principal Software Architect",
    shortBio:
        "Developer with 9+ years of excellence in websites, applications and servers — architecting and building systems end to end, from the interface down to the infrastructure.",
    longBio:
        "I have spent 9+ years building websites, applications and servers — across consultancies, startups and my own open-source suite. Whatever the surface, the job is the same: work out what the system actually has to do, design it so it holds up under real traffic and real people, then build it. Web platforms, mobile apps, APIs, data pipelines, and lately a lot of AI — Codevry is how I take that work on for clients.",
    email: "hey@sakshamkhurana.com",
    personalSite: "https://sakshamkhurana.com",
    yearsExperience: "9+",
    /**
     * Optional scheduling link (Cal.com, Calendly, …). Leave as an empty string
     * and the "book a call" affordances are hidden automatically.
     */
    bookingUrl: "",
} as const;

export const SOCIALS = [
    { name: "GitHub", href: "https://github.com/dawnimpulse", icon: "github" },
    { name: "Codevry on GitHub", href: "https://github.com/Codevry", icon: "github" },
    { name: "Instagram", href: "https://www.instagram.com/00saksham/", icon: "instagram" },
    { name: "Strava", href: "https://www.strava.com/athletes/116418175", icon: "strava" },
] as const;

/** Companies and clients Saksham has delivered for. Rendered as wordmarks. */
export const CLIENTS = [
    "Capgemini",
    "Noumena",
    "Visualoud",
    "MyDataLabs",
    "TNine",
    "Wayne",
] as const;

export const STATS = [
    { value: "9+", label: "Years shipping software" },
    { value: "8", label: "Open-source products" },
    { value: "6", label: "Clients & companies" },
    { value: "3", label: "Platforms — web, mobile, server" },
] as const;

export type Service = {
    slug: string;
    title: string;
    summary: string;
    /** Concrete deliverables — what the client actually receives. */
    deliverables: string[];
    icon: string;
};

export const SERVICES: Service[] = [
    {
        slug: "systems-architecture",
        title: "Systems Architecture",
        summary:
            "The design work that decides whether a system survives contact with real users. Data model, service boundaries, failure modes, scale and cost ceilings — specified and agreed before a line of production code is written.",
        deliverables: [
            "Architecture decision records & system diagrams",
            "Data modelling and service boundaries",
            "Scale, cost and capacity modelling",
            "Failure, fallback and degradation strategy",
        ],
        icon: "/icons/access-point.svg",
    },
    {
        slug: "web-product-engineering",
        title: "Websites & Web Applications",
        summary:
            "Marketing sites, dashboards and full products — fast, accessible, properly indexed, and built on a front-end your team can still work in a year from now.",
        deliverables: [
            "React, Next.js and Vue applications",
            "Design systems and component libraries",
            "Performance, accessibility and technical SEO",
            "CMS, analytics and deployment wiring",
        ],
        icon: "/icons/web-zinc.svg",
    },
    {
        slug: "mobile-applications",
        title: "Mobile & Cross-Platform Apps",
        summary:
            "Native Android and cross-platform applications, from first build to store release — with the offline behaviour, sync and release process worked out rather than bolted on.",
        deliverables: [
            "Android (Kotlin) and cross-platform builds",
            "Offline-first storage and sync",
            "Push, deep links and release pipelines",
            "Play Store submission and staged rollout",
        ],
        icon: "/icons/square-rounded-badge.svg",
    },
    {
        slug: "apis-and-platforms",
        title: "APIs & Backend Platforms",
        summary:
            "The layer everything else depends on. Typed APIs, authentication, rate limiting, queues and caching — the same patterns behind Codevry's open-source gateway and processing services.",
        deliverables: [
            "REST and typed API design with contract tests",
            "Auth, rate limiting and multi-tenant boundaries",
            "Background jobs, queues and scheduled pipelines",
            "Observability: logs, metrics, traces and alerts",
        ],
        icon: "/icons/api.svg",
    },
    {
        slug: "ai-systems",
        title: "AI & Agentic Systems",
        summary:
            "Where it genuinely earns its place: agents, retrieval over your own data and LLM pipelines that do real work — built to be evaluated and debugged, not just demoed.",
        deliverables: [
            "Model selection and cost modelling",
            "RAG and retrieval pipelines over your own data",
            "Tool-calling, orchestration, retries and tracing",
            "Evaluation harnesses and quality baselines",
        ],
        icon: "/icons/source-branch.svg",
    },
    {
        slug: "review-and-advisory",
        title: "Architecture Review & Advisory",
        summary:
            "An independent read on a codebase, a roadmap or a build-vs-buy decision — as a one-off written assessment, or as ongoing fractional CTO ownership for a team without a principal engineer.",
        deliverables: [
            "Codebase and architecture assessment",
            "Scalability, security and cost risk register",
            "Prioritised remediation roadmap",
            "Recurring reviews, hiring and vendor decisions",
        ],
        icon: "/icons/list-box.svg",
    },
];

export const PROCESS = [
    {
        step: "01",
        title: "Scope",
        body: "A call, then a written brief. What the system has to do, what it must not do, and what success is measured against. No engagement starts on a vague ask.",
    },
    {
        step: "02",
        title: "Architect",
        body: "Design before build — diagrams, decision records, cost model and the risks stated plainly. You approve the shape of the thing before anyone pays for implementation.",
    },
    {
        step: "03",
        title: "Build",
        body: "Shipped in reviewable increments against the agreed architecture, with tests and observability built in rather than retrofitted.",
    },
    {
        step: "04",
        title: "Hand over",
        body: "Documentation, runbooks and a walkthrough so your team owns the system. Ongoing support is optional, never a dependency I engineer in.",
    },
] as const;

export type ProjectCategory = "Applications" | "Services" | "Tools";

export type Project = {
    title: string;
    description: string;
    category: ProjectCategory;
    icon: string;
    github: string;
    website?: string;
    tags: string[];
    screenshots?: string[];
};

/**
 * The Codevry open-source suite. This doubles as the public work sample —
 * every entry is a real, shipped, readable codebase.
 */
export const PROJECTS: Project[] = [
    {
        title: "Wlpapr",
        category: "Applications",
        description:
            "Free random wallpapers to download for your desktop, tablet or mobile devices.",
        icon: "/icons/wlpapr.svg",
        github: "https://github.com/dawnimpulse/wlpapr-web",
        website: "https://wlpapr.codevry.com",
        tags: ["Vue.js", "TypeScript"],
        screenshots: [
            "/images/apps/wlpapr/desktop.jpeg",
            "/images/apps/wlpapr/tablet.png",
            "/images/apps/wlpapr/mobile.png",
        ],
    },
    {
        title: "Scroll",
        category: "Applications",
        description:
            "A simple way to access your contacts when your phone is lost, stolen, low on battery or simply unavailable.",
        icon: "/icons/scroll.svg",
        github: "https://github.com/dawnimpulse/scroll-web",
        website: "https://scroll.codevry.com",
        tags: ["Vue.js", "TypeScript"],
        screenshots: [
            "/images/apps/scroll/2.png",
            "/images/apps/scroll/3.png",
            "/images/apps/scroll/4.png",
        ],
    },
    {
        title: "Foundation",
        category: "Services",
        description:
            "Rate limiting and authentication gateway for your APIs — the access layer, without the platform lock-in.",
        icon: "/icons/api.svg",
        github: "https://github.com/Codevry/foundation",
        tags: ["TypeScript", "Gateway"],
    },
    {
        title: "Pixels",
        category: "Services",
        description:
            "Image processing and caching service, on-demand or batch, built to sit in front of any storage bucket.",
        icon: "/icons/image-sync.svg",
        github: "https://github.com/codevry/pixels-server",
        tags: ["TypeScript", "Media"],
    },
    {
        title: "Horm",
        category: "Services",
        description:
            "HTML form saving backend — drop-in persistence for static sites with no backend of their own.",
        icon: "/icons/list-box.svg",
        github: "https://github.com/Codevry/horm",
        tags: ["TypeScript", "Forms"],
    },
    {
        title: "Restmap",
        category: "Tools",
        description:
            "Query only the data you need from a REST API, without pulling in a stack of external tools or glue code.",
        icon: "/icons/restmap.svg",
        github: "https://github.com/restmap/restmap-node",
        tags: ["TypeScript", "JavaScript"],
    },
    {
        title: "JSON Keys Sort",
        category: "Tools",
        description:
            "Sort a JSON object by keys, ascending or descending, recursively if you need it to be.",
        icon: "/icons/code-json.svg",
        github: "https://github.com/DawnImpulse/json-keys-sort",
        tags: ["JavaScript", "npm"],
    },
    {
        title: "Github Backup",
        category: "Tools",
        description:
            "Back up your GitHub repositories to a local folder or S3 bucket, manually or on a cron inside a container.",
        icon: "/icons/github-black.svg",
        github: "https://github.com/DawnImpulse/github-backup",
        tags: ["TypeScript", "Docker"],
    },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
    "Applications",
    "Services",
    "Tools",
];

/** Technology areas shown in the capability strip. */
export const CAPABILITIES = [
    "System architecture",
    "TypeScript & Node",
    "React, Next.js & Vue",
    "Android & mobile",
    "REST & typed APIs",
    "PostgreSQL & Redis",
    "LLM & agent systems",
    "Docker & CI/CD",
    "AWS & Cloudflare",
] as const;
