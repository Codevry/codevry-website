import { useEffect, useRef } from "react";
import type { Figure, HairlineOptions } from "@lucasmarkes/hairline";
import { cn } from "@/lib/cn";

type Mount = (el: HTMLElement, options?: HairlineOptions) => Figure;

type HairlineFigureProps = {
    /**
     * One figure function from @lucasmarkes/hairline, e.g. `settle`. Passing
     * the function rather than a name keeps every other figure out of the
     * bundle.
     */
    mount: Mount;
    /** Accessible description of the figure. */
    label: string;
    /** How strongly the figure answers the pointer, 0 to 1. */
    intensity?: number;
    /** Walk the figure through its answer on a loop until the pointer arrives. */
    play?: boolean;
    className?: string;
};

/**
 * A Hairline line figure, coloured from the palette by the --hairline-*
 * properties in index.css. The prerender emits an empty 5:4 box; the drawing
 * is added in the browser, so nothing shifts when it appears.
 */
export default function HairlineFigure({
    mount,
    label,
    intensity = 0.65,
    play = false,
    className,
}: HairlineFigureProps) {
    const host = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!host.current) return;
        const figure = mount(host.current, {
            // The palette is light; "auto" would follow an OS dark setting the
            // site doesn't have.
            theme: "light",
            intensity,
            play,
            label,
        });
        return () => figure.destroy();
    }, [mount, label, intensity, play]);

    return <div ref={host} className={cn("aspect-[5/4] w-full", className)} />;
}
