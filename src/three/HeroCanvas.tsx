import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";

const ArchitectureScene = lazy(() => import("./ArchitectureScene"));

/**
 * Hosts the hero's WebGL canvas.
 *
 * Three concerns handled here rather than in the scene:
 *  - the canvas only mounts in the browser (the SSG pass has no WebGL),
 *  - the render loop stops whenever the hero scrolls out of view or the tab is
 *    hidden, so the scene never burns battery in the background,
 *  - `prefers-reduced-motion` collapses it to a single static frame.
 */
export default function HeroCanvas() {
    const hostRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(true);
    const reducedMotion = useReducedMotion() ?? false;

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { rootMargin: "120px" },
        );
        observer.observe(host);

        const onVisibilityChange = () =>
            setVisible(
                document.visibilityState === "visible" &&
                    host.getBoundingClientRect().bottom > -120,
            );
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            observer.disconnect();
            document.removeEventListener(
                "visibilitychange",
                onVisibilityChange,
            );
        };
    }, []);

    // With reduced motion the scene is static, so one frame on demand is enough.
    const frameloop = reducedMotion ? "demand" : visible ? "always" : "never";

    return (
        <div ref={hostRef} className="absolute inset-0" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, 7.4], fov: 46 }}
                // Capped DPR: past ~1.75 the extra pixels cost frames and buy
                // nothing visible for a scene made of points and lines.
                dpr={[1, 1.75]}
                frameloop={frameloop}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
            >
                <Suspense fallback={null}>
                    <ArchitectureScene reducedMotion={reducedMotion} />
                </Suspense>
            </Canvas>
        </div>
    );
}
