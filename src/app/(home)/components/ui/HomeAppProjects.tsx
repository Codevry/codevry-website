"use client";

import HomeContainerProject from "@/app/(home)/components/container/HomeContainerProject";
import useStoreHomeServices from "@/app/(home)/store/storeHomeServices";
import useStoreHomeApps from "@/app/(home)/store/storeHomeApps";
import HomeContainerApp from "@/app/(home)/components/container/HomeContainerApp";

export default function HomeAppProjects() {
    const { projects } = useStoreHomeApps();

    return (
        <div>
            {projects.map((project) => (
                <HomeContainerApp key={project.title} project={project} />
            ))}
        </div>
    );
}
