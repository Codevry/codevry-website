import { TypeProject } from "@/types/TypeProject";
import Image from "next/image";
import { MIconButton } from "@/ui/button/MIconButton";
import IconGithub from "@/icons/github.svg";
import IconWeb from "@/icons/web.svg";
import ChipLanguage from "@/ui/chips/ChipLanguage";

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
                <div className="mt-4 flex flex-row items-center">
                    {/*links*/}
                    <div className={"flex flex-row"}>
                        {/*github*/}
                        <MIconButton
                            link={project.github}
                            color="fill-zinc-300"
                            hoverColor="fill-black"
                        >
                            <IconGithub className="size-8" />
                        </MIconButton>

                        {/*website*/}
                        {project.website && (
                            <MIconButton
                                link={project.website}
                                color="fill-zinc-300"
                                hoverColor="fill-black"
                                className={"ml-4"}
                            >
                                <IconWeb className="size-8" />
                            </MIconButton>
                        )}
                    </div>

                    <div
                        className={"mx-8 h-6 w-[2px] rounded-full bg-zinc-300"}
                    />

                    {/*language*/}
                    {project.languages.map((lang) => (
                        <ChipLanguage key={lang.name} lang={lang} />
                    ))}
                </div>
            </div>
        </div>
    );
}
