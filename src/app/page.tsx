import HomeLanding from "@/app/components/ui/HomeLanding";
import HomeTools from "@/app/components/ui/HomeTools";
import HomeIcons from "@/app/components/ui/HomeIcons";

export default function Page() {
    return (
        <div className="flex w-screen flex-col">
            <HomeLanding />
            <HomeIcons />
            <HomeTools />
        </div>
    );
}
