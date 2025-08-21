"use client";

import { twMerge } from "tailwind-merge";
import HomeIconGithub from "@/app/(home)/components/HomeIconGithub";
import { Logo } from "@/ui/icons/logo";
import { ENUM_COLOR } from "@/app/utils/enums";

interface HomeFooterProps {
    className?: string;
}

export default function HomeFooter({ className }: HomeFooterProps) {
    return (
        <div className={twMerge("flex w-screen justify-center", className)}>
            <div
                className={
                    "mx-4 mt-24 mb-8 flex w-full flex-col items-center justify-around gap-8 rounded-2xl bg-black py-6 text-white md:flex-row md:gap-0 lg:w-8/12"
                }
            >
                <Logo color={ENUM_COLOR.WHITE} />
                <div>© Codevry Labs, 2025</div>
                <HomeIconGithub />
            </div>
        </div>
    );
}
