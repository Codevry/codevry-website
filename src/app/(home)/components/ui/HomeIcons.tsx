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

    return (
        <div className="flex w-screen justify-center">
            <div className="flex flex-row justify-between opacity-10 lg:w-8/12">
                {icons.map((icon, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center p-4"
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
