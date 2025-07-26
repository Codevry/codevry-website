"use client";

import { router } from "next/client";
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
    children: React.ReactElement;
    color: string;
    hoverColor: string;
    link?: string;
    route?: string;
}

export function MIconButton({
    children,
    link,
    route,
    color,
    hoverColor,
}: ButtonProps) {
    /**
     * open a link or navigate
     */
    function open() {
        if (link) window.open(link, "_blank");
        else if (route) router.push(route).then();
    }

    return (
        <div
            onClick={open}
            className={cn(
                color,
                `hover:${hoverColor} hover:scale-125`,
                "transition duration-500"
            )}
        >
            {children}
        </div>
    );
}
