"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HomeIcons() {
    const [icons, setIcons] = useState<string[]>([]);

    useEffect(() => {
        const iconsList = [
            "tools.svg",
            "square-rounded-badge.svg",
            "source-branch.svg",
            "access-point.svg",
        ];
        setIcons(iconsList);
    }, []);

    /**
     * return motion class
     */
    function motion(index: number): string {
        switch (index) {
            case 0:
                return "motion-preset-stretch";
            case 1:
                return "motion-preset-seesaw motion-duration-300";
            case 2:
                return "motion-preset-pulse motion-duration-2000";
            case 3:
                return "motion-preset-oscillate motion-duration-2000";
            default:
                return "";
        }
    }

    return (
        <div className="flex w-screen justify-center">
            <div className="flex flex-row justify-between opacity-10 lg:w-8/12">
                {icons.map((icon, index) => (
                    <div
                        key={index}
                        className={`${motion(index)} flex items-center justify-center p-4`}
                    >
                        <Image
                            src={`/icons/${icon}`}
                            alt={icon.replace(".svg", "")}
                            width={64}
                            height={64}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
