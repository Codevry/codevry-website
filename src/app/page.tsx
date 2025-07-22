import { BackgroundBeams } from "@/ui/beams/background-beams";
import Image from "next/image";

export default function Page() {
    return (
        <div className="w-screen flex flex-col bg-black">
            {/*landing*/}
            <div className="relative h-screen w-full">
                {/*bg beams*/}
                <div className="absolute inset-0 h-screen w-screen">
                    <BackgroundBeams className="bg-black" />
                </div>

                <div className="absolute z-20 mt-8 flex flex-row w-full justify-center">
                    <div className="text-white tracking-widest">CODEVRY</div>
                </div>

                {/*title & button*/}
                <div className="absolute inset-0 h-screen w-screen z-10 flex flex-col justify-center items-center">
                    {/*circle bg*/}
                    <div className="relative self-end mr-16 size-[200px]  rounded-full mb-8 border-4 border-opacity-40 border-blue-500 bg-gradient-to-br from-blue-500 to-green-500 blur-[60px] opacity-60" />

                    {/*title*/}
                    <div className="text-white text-4xl text-center leading-snug">
                        Building Open-Source <br />
                        Tools, Services & Applications
                    </div>

                    {/*button GitHub*/}
                    <button className="mt-8 flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-black">
                        <Image
                            src="/github.svg"
                            alt="GitHub"
                            width={24}
                            height={24}
                        />
                        <span className="tracking-wide font-bold">GitHub</span>
                    </button>

                    {/*circle bg*/}
                    <div className="relative self-start ml-16 size-[200px] rounded-full mb-8 border-4 border-opacity-40 border-red-500 bg-gradient-to-br from-red-500 to-yellow-500 blur-[60px] opacity-60" />
                </div>
            </div>
        </div>
    );
}
