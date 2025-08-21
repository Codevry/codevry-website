import { create } from "zustand";
import { TypeProject } from "@/types/TypeProject";

type TypeStore = {
    projects: TypeProject[];
};

const useStoreHomeServices = create<TypeStore>(() => ({
    projects: [
        {
            title: "Foundation",
            description:
                "Simple Rate limiting & Authentication gateway service for your APIs",
            icon: "api.svg",
            github: "https://github.com/Codevry/foundation",
            languages: [
                {
                    name: "Typescript",
                    bgColor: "bg-sky-600",
                    textColor: "text-white",
                },
            ],
        },
        {
            title: "Horm",
            description: "Html form saving backend service",
            icon: "list-box.svg",
            github: "https://github.com/Codevry/horm",
            languages: [
                {
                    name: "Typescript",
                    bgColor: "bg-sky-600",
                    textColor: "text-white",
                },
            ],
        },
    ],
}));

export default useStoreHomeServices;
