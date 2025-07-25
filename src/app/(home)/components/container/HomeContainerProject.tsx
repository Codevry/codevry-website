import { TypeProject } from "@/types/TypeProject";
import Image from "next/image";
import { MIconButton } from "@/ui/button/MIconButton";

export default function HomeContainerProject({
    project,
}: {
    project: TypeProject;
}) {
    return (
        <div className="flex flex-row items-start">
            {/*icon*/}
            <Image
                src={`/icons/${project.icon}`}
                alt=""
                width={36}
                height={36}
            />

            {/*details*/}
            <div className="ml-8 flex flex-col">
                {/*title*/}
                <div className="text-2xl font-bold">{project.title}</div>

                {/*description*/}
                <div className="mt-2 text-lg text-zinc-400">
                    {project.description}
                </div>

                {/*links & lang*/}
                <div className="mt-4 flex flex-row">
                    {/*links*/}

                    {/*github*/}
                    <MIconButton
                        icon="/icons/github-zinc.svg"
                        link={project.github}
                        className="size-6 hover:scale-125"
                    />

                    {/*website*/}
                    {project.website && (
                        <MIconButton
                            icon="/icons/web-zinc.svg"
                            link={project.website}
                            className="ml-4 size-6 hover:scale-125"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
