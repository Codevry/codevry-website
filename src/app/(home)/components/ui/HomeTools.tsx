import HomeToolsProjects from "@/app/(home)/components/ui/HomeToolsProjects";

export default function HomeTools() {
    return (
        <div className="mt-24 flex w-screen justify-center px-8 lg:px-24">
            <div className="flex w-full flex-col lg:w-8/10">
                {/*heading*/}
                <div className="font-montserrat w-fit rounded-2xl bg-gradient-to-r from-rose-400 to-transparent px-16 py-6 text-3xl tracking-widest md:text-5xl">
                    TOOLS
                </div>

                {/*projects*/}
                <div className="mt-16" />
                <HomeToolsProjects />
            </div>
        </div>
    );
}
