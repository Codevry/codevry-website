# codevry.com

Marketing site for **Codevry** — the software architecture and engineering
studio run by [Saksham Khurana](https://sakshamkhurana.com).

Built with Vite + React + TypeScript, statically prerendered so every page ships
complete HTML (title, meta, Open Graph, JSON-LD) without needing JavaScript to
be indexed.

## Stack

| Concern    | Choice                                                     |
| ---------- | ---------------------------------------------------------- |
| Build      | Vite 7                                                     |
| UI         | React 19 + TypeScript                                      |
| Prerender  | `vite-react-ssg` (static HTML per route)                   |
| Routing    | React Router 6                                              |
| Styling    | Tailwind CSS v4 (tokens in `src/styles/index.css`)         |
| Motion     | `motion` (Framer Motion) for scroll reveals                |
| 3D         | `@react-three/fiber` + `three` for the hero scene          |

React Router is pinned to v6: `vite-react-ssg` imports `react-router-dom/server.js`
during the prerender, and v7 removed that entry point.

## Commands

```bash
bun install        # or npm install

bun run dev        # dev server
bun run build      # typecheck -> prerender -> sitemap/robots
bun run preview    # serve the built site
bun run lint       # eslint
bun run typecheck  # tsc, no emit
```

`build` runs three steps: `tsc -b`, then `vite-react-ssg build`, then
`scripts/generate-seo.mjs`.

## Layout

```
src/
  data/site.ts        all editable copy: services, projects, clients, contact
  lib/seo.ts          route registry + schema.org graph builders
  components/         Seo, Header, Footer, Layout, cards, primitives
  sections/           Hero, Credibility, Services, Process, Work, About, CTA
  pages/              one component per route
  three/              hero WebGL scene
  routes.tsx          route table (drives both router and prerender)
scripts/
  generate-seo.mjs    writes sitemap.xml + robots.txt from the built output
public/icons/         product and UI icons
public/images/        project screenshots
```

### Editing content

Nearly everything is in `src/data/site.ts` — services, projects, client list,
stats, capabilities and contact details. Per-page titles and meta descriptions
live in `ROUTES` in `src/lib/seo.ts`.

Two fields worth knowing:

- `FOUNDER.bookingUrl` — set it to a Cal.com/Calendly URL and the "Book a call"
  buttons appear on the home CTA and contact page. Empty means hidden.
- `SITE.url` — used for canonical URLs, Open Graph and structured data. The
  sitemap generator also reads `SITE_URL` from the environment if you need to
  override it for a preview deploy.

## SEO

- Every route is prerendered to static HTML; no client render needed to index.
- Per-page `<title>`, description, canonical, Open Graph and Twitter tags.
- One `schema.org` `@graph` per page: Organization, Person, WebSite,
  ProfessionalService, BreadcrumbList, WebPage — plus Service nodes on
  `/services`, an ItemList on `/work`, and FAQPage/ContactPage on `/contact`.
- `sitemap.xml` and `robots.txt` are generated from the files actually emitted,
  and anything the page marks `noindex` (the 404) is excluded automatically.
- `404.html` is prerendered for static hosts.

## Adding a page

1. Add an entry to `ROUTES` in `src/lib/seo.ts` (path, label, title, description).
2. Add the route to `src/routes.tsx`.
3. Create the page under `src/pages/` and render `<Seo path="/your-path" />`.

Nav, footer, breadcrumbs and the sitemap all follow from step 1.

## Deploying

Any static host. Build output is `dist/`; unknown paths should serve `404.html`,
which Netlify, Vercel, Cloudflare Pages and GitHub Pages all do by default.
