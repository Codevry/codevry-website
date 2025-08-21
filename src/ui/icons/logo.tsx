import Image from "next/image";
import { ENUM_COLOR } from "@/app/utils/enums";

export function Logo({ color = ENUM_COLOR.BLACK }: { color: ENUM_COLOR }) {
    return (
        <Image
            src={`/icons/codevry${color === ENUM_COLOR.WHITE ? "-white" : ""}.svg`}
            alt={""}
            height={32}
            width={32}
        />
    );
}
