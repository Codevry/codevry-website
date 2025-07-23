import Image from "next/image";
import { DotBackground } from "@/ui/DotBackground";

export default function Page() {
    return (
        <div className="w-screen flex flex-col bg-black">
            {/*landing*/}
            <div className="relative h-screen w-screen">
                {/*bg beams*/}
                <div className="absolute inset-0">
                    <DotBackground className="h-screen w-screen" />
                </div>

                {/*app name*/}
                <div className="absolute z-20 mt-8 flex flex-row w-full justify-center">
                    <div className="text-black tracking-widest font-bold">
                        CODEVRY
                    </div>
                </div>

                {/*title & button*/}
                <div className="absolute inset-0 h-screen w-screen z-10 flex flex-col justify-center items-center">
                    {/*circle bg*/}
                    {/*<div className="relative self-end mr-16 size-[200px]  rounded-full mb-8 border-4 border-opacity-40 border-blue-500 bg-gradient-to-br from-blue-500 to-green-500 blur-[60px] opacity-60" />*/}

                    {/*title*/}
                    <div className="text-transparent text-4xl text-center leading-snug bg-gradient-to-b from-neutral-400 to-neutral-800 bg-clip-text ">
                        Building Open-Source <br />
                        Tools, Services & Applications
                    </div>

                    {/*button GitHub*/}
                    <button className="mt-8 flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-white hover:cursor-pointer hover:scale-110 transition duration-500">
                        <Image
                            src="/icons/github.svg"
                            alt="GitHub"
                            width={24}
                            height={24}
                        />
                        <span className="tracking-wide font-bold">GitHub</span>
                    </button>
                </div>

                {/*scroll*/}
                <div className="absolute h-screen w-screen flex flex-col-reverse pb-8 items-center">
                    <div className="flex flex-row items-center">
                        <div className="tracking-widest">Scroll</div>
                        <div className="ml-2 rounded-full size-8 flex items-center justify-center bg-black">
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
