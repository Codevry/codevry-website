import HomeServicesProjects from "@/app/(home)/components/ui/HomeServicesProjects";

export default function HomeServices() {
    return (
        <div className="mt-36 flex w-screen justify-center px-24">
            <div className="flex w-full flex-col lg:w-8/10">
                {/*heading*/}
                <div className="font-montserrat w-full rounded-2xl bg-gradient-to-r from-green-400 to-transparent py-6 pr-4 pl-16 text-5xl tracking-widest">
                    SERVICES
                </div>

                {/*projects*/}
                <div className="mt-16" />
                <HomeServicesProjects />
            </div>
        </div>
    );
}
