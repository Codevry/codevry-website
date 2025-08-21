"use client";

import { MButton } from "@/ui/button/MButton";

export function HomeButtonLearnMore() {
    return (
        <a href="#icons">
            <MButton className="ml-4 flex flex-row items-center gap-2 border-1 border-black">
                <span className="font-bold tracking-wide">Learn More</span>
            </MButton>
        </a>
    );
}
