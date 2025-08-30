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
                "/images/apps/wlpapr/desktop.jpeg",
                "/images/apps/wlpapr/tablet.png",
                "/images/apps/wlpapr/mobile.png",
            ],
            description:
                "Free random wallpapers to download for your desktop, tablet or mobile devices",
            icon: "wlpapr.svg",
            github: "https://github.com/dawnimpulse/wlpapr-web",
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
