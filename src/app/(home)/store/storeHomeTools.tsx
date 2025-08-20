import { create } from "zustand";
import { TypeProject } from "@/types/TypeProject";

type TypeStore = {
    projects: TypeProject[];
};

const useStoreHomeTools = create<TypeStore>(() => ({
    projects: [
        {
            title: "Restmap",
            description:
                "Simple way to query only the required data from a Rest API without relying on lot of external tools or code",
            icon: "restmap.svg",
            github: "https://github.com/restmap/restmap-node",
            languages: [
                {
                    name: "Typescript",
                    bgColor: "bg-sky-600",
                    textColor: "text-black",
                },
                {
                    name: "Javascript",
                    bgColor: "bg-yellow-300",
                    textColor: "text-black",
                },
            ],
        },
        {
            title: "JSON Keys Sort",
            description:
                "Sorting a json object based on keys either ascending or descending & even recursively",
            icon: "code-json.svg",
            github: "https://github.com/DawnImpulse/json-keys-sort",
            languages: [
                {
                    name: "Javascript",
                    bgColor: "bg-yellow-300",
                    textColor: "text-black",
                },
            ],
        },
    ],
}));

export default useStoreHomeTools;
