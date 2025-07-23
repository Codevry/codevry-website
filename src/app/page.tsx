import Image from "next/image";
import { DotBackground } from "@/ui/DotBackground";
import { HomeButtonGithub } from "@/app/components/HomeButtonGithub";
import { HomeButtonLearnMore } from "@/app/components/HomeButtonLearnMore";

export default function Page() {
    return (
        <div className="flex w-screen flex-col bg-black">
            {/*landing*/}
            <div className="relative h-screen w-screen">
                {/*bg beams*/}
                <div className="absolute inset-0">
                    <DotBackground className="h-screen w-screen" />
                </div>

                {/*app name*/}
                <div className="absolute z-20 mt-8 flex w-full flex-row justify-center">
                    <div className="font-bold tracking-widest text-black">
                        CODEVRY
                    </div>
                </div>

                {/*title & button*/}
                <div className="absolute inset-0 z-10 flex h-screen w-screen flex-col items-center justify-center">
                    {/*circle bg*/}
                    {/*<div className="relative self-end mr-16 size-[200px]  rounded-full mb-8 border-4 border-opacity-40 border-blue-500 bg-gradient-to-br from-blue-500 to-green-500 blur-[60px] opacity-60" />*/}

                    {/*title*/}
                    <div className="bg-gradient-to-b from-neutral-400 to-neutral-800 bg-clip-text text-center text-4xl leading-snug text-transparent">
                        Building Open-Source <br />
                        Tools, Services & Applications
                    </div>

                    {/*buttons*/}
                    <div className="mt-8 flex flex-row items-center">
                        {/*github*/}
                        <HomeButtonGithub />

                        {/*learn more*/}
                        <HomeButtonLearnMore />
                    </div>
                </div>

                {/*scroll*/}
                <div className="absolute flex h-screen w-screen flex-col-reverse items-center pb-8">
                    <div className="flex flex-row items-center">
                        <div className="font-bold tracking-widest">Scroll</div>
                        <div className="ml-2 flex size-8 items-center justify-center rounded-full bg-black">
                            <Image
                                className="mb-1"
                                alt=""
                                src="/icons/pan-down.svg"
                                height={20}
                                width={20}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
