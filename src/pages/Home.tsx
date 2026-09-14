import Seo from "@/components/Seo";
import Hero from "@/sections/Hero";
import Credibility from "@/sections/Credibility";
import Services from "@/sections/Services";
import Process from "@/sections/Process";
import Work from "@/sections/Work";
import About from "@/sections/About";
import ContactCta from "@/sections/ContactCta";

export default function Home() {
    return (
        <>
            <Seo path="/" />
            <Hero />
            <Credibility />
            {/* Work leads: the shipped evidence earns the read before the
                pitch does. */}
            <Work preview />
            <Services limit={6} />
            <Process />
            <About />
            <ContactCta />
        </>
    );
}
