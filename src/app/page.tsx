import HomeLanding from "@/app/components/ui/HomeLanding";
import HomeTools from "@/app/components/ui/HomeTools";

export default function Page() {
    return (
        <div className="flex w-screen flex-col">
            <HomeLanding />
            <HomeTools />
        </div>
    );
}
