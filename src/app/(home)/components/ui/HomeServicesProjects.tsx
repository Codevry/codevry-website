"use client";

import HomeContainerProject from "@/app/(home)/components/container/HomeContainerProject";
import useStoreHomeServices from "@/app/(home)/store/storeHomeServices";

export default function HomeServicesProjects() {
    const { projects } = useStoreHomeServices();

    return (
        <div>
            {projects.map((project) => (
                <HomeContainerProject key={project.title} project={project} />
            ))}
        </div>
    );
}
