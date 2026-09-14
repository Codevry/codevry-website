import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Services from "@/sections/Services";
import Process from "@/sections/Process";
import ContactCta from "@/sections/ContactCta";
import { SERVICES, SITE } from "@/data/site";
import { canonical } from "@/lib/seo";

/**
 * Lists each service as its own schema.org node so the offering can surface
 * independently of the page in search results.
 */
const serviceSchema = SERVICES.map((service) => ({
    "@type": "Service",
    "@id": `${canonical("/services")}#${service.slug}`,
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Place", name: "Worldwide" },
}));

export default function ServicesPage() {
    return (
        <>
            <Seo path="/services" schema={serviceSchema} />

            <PageHero
                eyebrow="Services"
                title="Architecture first. Then the code."
                lede="Websites, applications, APIs, mobile, AI — different surfaces, same discipline. Projects rarely fail on the technology; they fail on the system around it. These are the six ways I help teams get that right, whether you need a second opinion or the whole thing built."
            />

            <Services heading={false} />
            <Process />
            <ContactCta />
        </>
    );
}
