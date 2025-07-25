import { create } from "zustand";
import { TypeProject } from "@/types/TypeProject";

type TypeStore = {
    projects: TypeProject[];
};

const useStoreHomeTools = create<TypeStore>(() => ({
    projects: [
        {
            title: "Project 1",
            description: "Project 1 description",
            icon: "restmap.svg",
            github: "https://github.com",
            website: "https://google.com",
            languages: [],
        },
    ],
}));

export default useStoreHomeTools;
