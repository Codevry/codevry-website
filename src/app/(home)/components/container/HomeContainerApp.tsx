import { TypeApp } from "@/types/TypeProject";
import Image from "next/image";
import { MIconButton } from "@/ui/button/MIconButton";
import ChipLanguage from "@/ui/chips/ChipLanguage";

export default function HomeContainerApp({ project }: { project: TypeApp }) {
    return (
        <div className={"flex flex-col"}>
            <div className="flex flex-col py-8 lg:flex-row lg:items-start">
                {/* Content Section */}
                <div className="flex flex-row items-start">
                    {/*icon*/}
                    <Image
                        src={`/icons/${project.icon}`}
                        className={"size-8 lg:size-10"}
                        alt=""
                        width={36}
                        height={36}
                    />

                    {/*details*/}
                    <div className="ml-8 flex flex-col">
                        {/*title*/}
                        <div className="text-2xl font-bold">
                            {project.title}
                        </div>

                        {/*description*/}
                        <div className="mt-1 text-lg text-zinc-400">
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
                                    <Image
                                        src={"/icons/github-zinc.svg"}
                                        alt={""}
                                        width={32}
                                        height={32}
                                        className="size-8"
                                    />
                                </MIconButton>

                                {/*website*/}
                                {project.website && (
                                    <MIconButton
                                        link={project.website}
                                        color="fill-zinc-300"
                                        hoverColor="fill-black"
                                        className={"ml-4"}
                                    >
                                        <Image
                                            src={"/icons/web-zinc.svg"}
                                            alt={""}
                                            width={32}
                                            height={32}
                                            className="size-8"
                                        />
                                    </MIconButton>
                                )}
                            </div>

                            <div
                                className={
                                    "mx-8 h-6 w-[2px] rounded-full bg-zinc-300"
                                }
                            />

                            <div className={"flex flex-col gap-2 lg:flex-row"}>
                                {/*language*/}
                                {project.languages.map((lang) => (
                                    <ChipLanguage key={lang.name} lang={lang} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Screenshot Section */}
            <div className="scrollbar-visible mt-8 w-full overflow-x-scroll lg:mt-0 lg:ml-8 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-400 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-zinc-200">
                <div className="flex flex-row gap-4 pb-2">
                    {project.screenshots.map((screenshot, index) => (
                        <Image
                            key={index}
                            src={screenshot}
                            alt=""
                            width={index === 0 ? 640 : 480}
                            height={360}
                            className="h-[360px] rounded-xl object-cover"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
