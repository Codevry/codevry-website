"use client";

import Image from "next/image";

export default function HomeIconGithub() {
    /**
     * GitHub open tab
     */
    function githubOpen() {
        window.open("https://github.com/orgs/codevry/repositories", "_blank");
    }

    return (
        <div>
            <Image
                className={"delay-150 duration-300 hover:scale-125"}
                src={`/icons/github.svg`}
                alt={"Github"}
                onClick={githubOpen}
                width={32}
                height={32}
            />
        </div>
    );
}
