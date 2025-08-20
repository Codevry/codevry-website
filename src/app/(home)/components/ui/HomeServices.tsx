import HomeServicesProjects from "@/app/(home)/components/ui/HomeServicesProjects";

export default function HomeServices() {
    return (
        <div className="mt-24 flex w-screen justify-center px-24">
            <div className="flex w-full flex-col lg:w-8/10">
                {/*heading*/}
                <div className="font-montserrat w-full pr-4 text-6xl tracking-widest">
                    SERVICES
                </div>

                {/*horizontal line*/}
                <div className="mt-4 h-[0.5px] w-full bg-neutral-300" />

                {/*projects*/}
                <div className="mt-8"></div>
                <HomeServicesProjects />
            </div>
        </div>
    );
}
