import { create } from "zustand";
import { TypeApp } from "@/types/TypeProject";

type TypeStore = {
    projects: TypeApp[];
};

const useStoreHomeApps = create<TypeStore>(() => ({
    projects: [
        {
            title: "Wlpapr",
            screenshots: [
                "/images/apps/wlpapr/tablet.png",
                "/images/apps/wlpapr/desktop.jpeg",
                "/images/apps/wlpapr/mobile.png",
            ],
            description:
                "Free random wallpapers to download for your desktop, tablet or mobile devices",
            icon: "wlpapr.svg",
            github: "https://github.com/dawnimpulse/wlpapr-web",
            website: "https://wlpapr.codevry.com",
            languages: [
                {
                    name: "Vue.js",
                    bgColor: "bg-green-300",
                    textColor: "text-black",
                },
                {
                    name: "Typescript",
                    bgColor: "bg-sky-600",
                    textColor: "text-white",
                },
            ],
        },
        {
            title: "Scroll",
            screenshots: [
                "/images/apps/scroll/2.png",
                "/images/apps/scroll/3.png",
                "/images/apps/scroll/4.png",
            ],
            description:
                "A simple way to access your contacts when your phone is lost/stolen/low-battery or simply unavailable.",
            icon: "scroll.svg",
            github: "https://github.com/dawnimpulse/scroll-web",
            website: "https://scroll.codevry.com",
            languages: [
                {
                    name: "Vue.js",
                    bgColor: "bg-green-300",
                    textColor: "text-black",
                },
                {
                    name: "Typescript",
                    bgColor: "bg-sky-600",
                    textColor: "text-white",
                },
            ],
        },
    ],
}));

export default useStoreHomeApps;
