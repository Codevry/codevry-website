import HomeServicesProjects from "@/app/(home)/components/ui/HomeServicesProjects";
import HomeAppProjects from "@/app/(home)/components/ui/HomeAppProjects";

export default function HomeApps() {
    return (
        <div className="mt-36 flex w-screen justify-center px-8 lg:px-24">
            <div className="flex w-full flex-col lg:w-8/10">
                {/*heading*/}
                <div className="font-montserrat w-fit rounded-2xl bg-gradient-to-r from-blue-400 to-transparent px-16 py-6 text-3xl tracking-widest md:text-5xl">
                    APPS
                </div>

                {/*projects*/}
                <div className="mt-16" />
                <HomeAppProjects />
            </div>
        </div>
    );
}
