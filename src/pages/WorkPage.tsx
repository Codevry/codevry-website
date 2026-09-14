import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Work from "@/sections/Work";
import ContactCta from "@/sections/ContactCta";
import { PROJECTS, SITE } from "@/data/site";
import { canonical } from "@/lib/seo";

/** The portfolio as an ItemList — lets search engines enumerate the projects. */
const workSchema = [
    {
        "@type": "ItemList",
        "@id": `${canonical("/work")}#projects`,
        name: "Codevry open-source projects",
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((project, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "SoftwareApplication",
                name: project.title,
                description: project.description,
                applicationCategory: project.category,
                url: project.website ?? project.github,
                codeRepository: project.github,
                author: { "@id": `${SITE.url}/#founder` },
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                },
            },
        })),
    },
];

export default function WorkPage() {
    return (
        <>
            <Seo path="/work" schema={workSchema} />

            <PageHero
                eyebrow="Work"
                title="Shipped, public, and open to inspection."
                lede="Client engagements are mostly under NDA. The Codevry suite is not — every project below is a real product with a readable codebase, so you can judge the engineering before you commit to it."
            />

            <Work />
            <ContactCta />
        </>
    );
}
