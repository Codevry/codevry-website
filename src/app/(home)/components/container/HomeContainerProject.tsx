import { TypeProject } from "@/types/TypeProject";
import Image from "next/image";

export default function HomeContainerProject({
    project,
}: {
    project: TypeProject;
}) {
    return (
        <div className="flex">
            {/*icon*/}
            <Image
                src={`/icons/${project.icon}`}
                alt=""
                width={36}
                height={36}
            />

            {/*details*/}
            <div className="flex-col">
                {/*title*/}
                <div className="text-lg font-bold">{project.title}</div>

                {/*description*/}
                <div className="mt-4 text-stone-500">{project.description}</div>
            </div>
        </div>
    );
}
