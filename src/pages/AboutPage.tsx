import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import About from "@/sections/About";
import Credibility from "@/sections/Credibility";
import ContactCta from "@/sections/ContactCta";
import { FOUNDER } from "@/data/site";

export default function AboutPage() {
    return (
        <>
            <Seo path="/about" />

            <PageHero
                eyebrow="About"
                title={`${FOUNDER.name} — ${FOUNDER.role}`}
                lede={FOUNDER.shortBio}
            />

            <Credibility />
            <About />
            <ContactCta />
        </>
    );
}
