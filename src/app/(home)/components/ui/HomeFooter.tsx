"use client";

import { twMerge } from "tailwind-merge";
import HomeIconGithub from "@/app/(home)/components/HomeIconGithub";

interface HomeFooterProps {
    className?: string;
}

export default function HomeFooter({ className }: HomeFooterProps) {
    return (
        <div className={twMerge("flex w-screen justify-center", className)}>
            <div
                className={
                    "mt-24 mb-8 flex flex-row items-center justify-around rounded-2xl bg-black py-6 text-white lg:w-8/12"
                }
            >
                <div>Codevry</div>
                <div>© Codevry Labs, 2025</div>
                <HomeIconGithub />
            </div>
        </div>
    );
}
