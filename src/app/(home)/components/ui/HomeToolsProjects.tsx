"use client";

import useStoreHomeTools from "@/app/(home)/store/storeHomeTools";
import HomeContainerProject from "@/app/(home)/components/container/HomeContainerProject";

export default function HomeToolsProjects() {
    const { projects } = useStoreHomeTools();

    return (
        <div>
            {projects.map((project) => (
                <HomeContainerProject key={project.title} project={project} />
            ))}
        </div>
    );
}
