"use client";

import { motion } from "motion/react";
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
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute flex h-screen w-screen flex-col-reverse items-center pb-8"
                >
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
                </motion.div>
            )}
        </div>
    );
}
