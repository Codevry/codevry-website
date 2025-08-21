"use client";

import { MButton } from "@/ui/button/MButton";
import Image from "next/image";

export function HomeButtonGithub() {
    /**
     * GitHub open tab
     */
    function githubOpen() {
        window.open("https://github.com/orgs/codevry/repositories", "_blank");
    }

    return (
        <MButton
            click={githubOpen}
            className="flex flex-row items-center gap-2 bg-black text-white"
        >
            <Image
                src="/icons/github.svg"
                alt="GitHub"
                width={24}
                height={24}
            />
            <span className="font-bold tracking-wide">GitHub</span>
        </MButton>
    );
}
