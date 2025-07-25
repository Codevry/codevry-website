import HomeToolsProjects from "@/app/(home)/components/ui/HomeToolsProjects";

export default function HomeTools() {
    return (
        <div className="mt-24 flex w-screen justify-center px-24">
            <div className="flex w-full flex-col lg:w-8/10">
                {/*heading*/}
                <div className="w-full pr-4 text-end text-6xl font-semibold tracking-widest">
                    TOOLS
                </div>

                {/*horizontal line*/}
                <div className="mt-4 h-[0.5px] w-full bg-neutral-300" />

                {/*projects*/}
                <div className="mt-24"></div>
                <HomeToolsProjects />
            </div>
        </div>
    );
}
