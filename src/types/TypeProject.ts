export type TypeProject = {
    icon: string;
    title: string;
    description: string;
    github: string;
    website?: string;
    languages: TypeProjectLang[];
};

export type TypeProjectLang = {
    name: string;
    bgColor: string;
    textColor: string;
};
