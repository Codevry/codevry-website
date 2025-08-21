"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomeScroll() {
    const [isVisible, setIsVisible] = useState(true); // Initial state: div is visible

    useEffect(() => {
        const handleScroll = () => {
            // Example: Hide div when scrolled down by a certain amount (e.g., 100px)
            setIsVisible(!(window.pageYOffset > 100));
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array ensures this runs once on the mount

    return (
        <div>
            {isVisible && (
                <div className="absolute flex h-screen w-screen flex-col-reverse items-center pb-8">
                    <div className="motion-preset-oscillate motion-duration-1500 flex flex-row items-center">
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
            )}
        </div>
    );
}
