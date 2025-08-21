import { cn } from "@/lib/utils";
import { TypeProjectLang } from "@/types/TypeProject";

export default function ChipLanguage({ lang }: { lang: TypeProjectLang }) {
    return (
        <div
            className={cn(
                "flex flex-row items-center rounded-full px-8 py-1",
                `${lang.bgColor}`,
                `${lang.textColor}`,
                "text-sm"
            )}
        >
            {lang.name}
        </div>
    );
}
