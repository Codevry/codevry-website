import { DotBackground } from "@/ui/DotBackground";
import { HomeButtonGithub } from "@/app/(home)/components/HomeButtonGithub";
import { HomeButtonLearnMore } from "@/app/(home)/components/HomeButtonLearnMore";
import HomeScroll from "@/app/(home)/components/ui/HomeScroll";
import { Logo } from "@/ui/icons/logo";
import { ENUM_COLOR } from "@/app/utils/enums";

export default function HomeLanding() {
    return (
        <div className="relative h-screen w-screen">
            {/*bg beams*/}
            <div className="absolute inset-0">
                <DotBackground className="h-screen w-screen" />
            </div>

            {/*app name*/}
            <div className="absolute z-20 mt-8 flex w-full flex-row justify-center">
                <div className="flex flex-col items-center font-bold tracking-widest text-black">
                    <Logo color={ENUM_COLOR.BLACK} />
                    <div className={"ml-4"}>CODEVRY</div>
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
            <HomeScroll />
        </div>
    );
}
