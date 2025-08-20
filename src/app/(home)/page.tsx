import HomeLanding from "@/app/(home)/components/ui/HomeLanding";
import HomeTools from "@/app/(home)/components/ui/HomeTools";
import HomeIcons from "@/app/(home)/components/ui/HomeIcons";
import HomeServices from "@/app/(home)/components/ui/HomeServices";

export default function Page() {
    return (
        <div className="flex w-screen flex-col">
            <HomeLanding />
            <HomeIcons />
            <HomeTools />
            <HomeServices />
        </div>
    );
}
