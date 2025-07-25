"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ButtonProps {
    className?: string;
    icon: string;
    link?: string;
    route?: string;
}

export function MIconButton({ className, icon, link, route }: ButtonProps) {
    /**
     * GitHub open tab
     */
    function open() {
        if (link) window.open(link, "_blank");
    }

    return (
        <Image
            src={icon}
            alt=""
            width={24}
            height={24}
            onClick={open}
            className={cn(
                "transition duration-500 hover:scale-110 hover:cursor-pointer",
                className
            )}
        />
    );
}
