import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The hero's 3D object: a lattice of nodes wired into a graph, wrapped around a
 * pulsing core. It reads as a system diagram rather than a generic particle
 * blob, which is the point — the site sells architecture.
 *
 * Everything is generated once into static buffers; each frame only mutates a
 * handful of transforms and one uniform, so the scene stays cheap on mobile.
 */

const NODE_COUNT = 190;
const RADIUS = 2.55;
/** Nodes closer than this get wired together. Tuned for ~2 links per node. */
const LINK_DISTANCE = 0.92;
const MAX_LINKS = 320;

const ACCENT = new THREE.Color("#6d5cff");
const SIGNAL = new THREE.Color("#34d8c4");

/** Evenly distributes points on a sphere — no clustering at the poles. */
function fibonacciSphere(count: number, radius: number) {
    const points: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const ring = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = golden * i;
        // A little inward jitter keeps it from looking like a perfect shell.
        const r = radius * (0.82 + Math.random() * 0.18);
        points.push(
            new THREE.Vector3(
                Math.cos(theta) * ring * r,
                y * r,
                Math.sin(theta) * ring * r,
            ),
        );
    }
    return points;
}

function useGraph() {
    return useMemo(() => {
        const nodes = fibonacciSphere(NODE_COUNT, RADIUS);

        const nodePositions = new Float32Array(NODE_COUNT * 3);
        const nodeColors = new Float32Array(NODE_COUNT * 3);
        const scratch = new THREE.Color();

        nodes.forEach((n, i) => {
            nodePositions.set([n.x, n.y, n.z], i * 3);
            // Blend the two brand colours across the sphere's vertical axis.
            scratch.copy(ACCENT).lerp(SIGNAL, (n.y / RADIUS + 1) / 2);
            nodeColors.set([scratch.r, scratch.g, scratch.b], i * 3);
        });

        const linkPositions: number[] = [];
        const linkColors: number[] = [];
        let links = 0;

        outer: for (let i = 0; i < NODE_COUNT; i++) {
            for (let j = i + 1; j < NODE_COUNT; j++) {
                if (nodes[i].distanceTo(nodes[j]) > LINK_DISTANCE) continue;

                linkPositions.push(
                    nodes[i].x, nodes[i].y, nodes[i].z,
                    nodes[j].x, nodes[j].y, nodes[j].z,
                );

                for (const n of [nodes[i], nodes[j]]) {
                    scratch.copy(ACCENT).lerp(SIGNAL, (n.y / RADIUS + 1) / 2);
                    linkColors.push(scratch.r, scratch.g, scratch.b);
                }

                if (++links >= MAX_LINKS) break outer;
            }
        }

        return {
            nodePositions,
            nodeColors,
            linkPositions: new Float32Array(linkPositions),
            linkColors: new Float32Array(linkColors),
        };
    }, []);
}

/** Slow drifting dust well outside the graph, for depth. */
function Dust({ reducedMotion }: { reducedMotion: boolean }) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const count = 420;
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Rejection-free shell sampling between r=4 and r=9.
            const v = new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5,
            )
                .normalize()
                .multiplyScalar(4 + Math.random() * 5);
            arr.set([v.x, v.y, v.z], i * 3);
        }
        return arr;
    }, []);

    useFrame((_, delta) => {
        if (reducedMotion || !ref.current) return;
        ref.current.rotation.y -= delta * 0.012;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.028}
                color="#8b7cff"
                transparent
                opacity={0.5}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/**
 * Rim-lit glow. A solid emissive sphere reads as a flat sticker at this scale;
 * weighting opacity by the view angle gives the core a soft edge and real
 * volume instead.
 *
 * `side` decides which effect you get. FrontSide lights the silhouette of the
 * sphere itself — bright edge, dark centre. BackSide lights the far wall of a
 * larger shell, which reads as atmosphere around the body.
 */
function useGlowMaterial(
    color: string,
    power: number,
    strength: number,
    side: THREE.Side = THREE.BackSide,
) {
    return useMemo(
        () =>
            new THREE.ShaderMaterial({
                uniforms: {
                    uColor: { value: new THREE.Color(color) },
                    uPower: { value: power },
                    uStrength: { value: strength },
                },
                vertexShader: /* glsl */ `
                    varying vec3 vNormal;
                    varying vec3 vView;
                    void main() {
                        vNormal = normalize(normalMatrix * normal);
                        vec4 mv = modelViewMatrix * vec4(position, 1.0);
                        vView = normalize(-mv.xyz);
                        gl_Position = projectionMatrix * mv;
                    }
                `,
                fragmentShader: /* glsl */ `
                    uniform vec3 uColor;
                    uniform float uPower;
                    uniform float uStrength;
                    varying vec3 vNormal;
                    varying vec3 vView;
                    void main() {
                        float fresnel = 1.0 - abs(dot(vNormal, vView));
                        gl_FragColor = vec4(
                            uColor,
                            pow(fresnel, uPower) * uStrength
                        );
                    }
                `,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                side,
            }),
        [color, power, strength, side],
    );
}

type SceneProps = {
    /** When true the scene renders one static frame and never animates. */
    reducedMotion: boolean;
};

export default function ArchitectureScene({ reducedMotion }: SceneProps) {
    const group = useRef<THREE.Group>(null);
    const core = useRef<THREE.Group>(null);
    const shell = useRef<THREE.Mesh>(null);
    const { nodePositions, nodeColors, linkPositions, linkColors } = useGraph();
    // Canvas pixel size, not three.js viewport units — the latter varies with
    // aspect ratio, which makes it a poor proxy for "is this a phone".
    const { size } = useThree();

    // Bright violet rim on the core itself, then a tight teal atmosphere.
    const nucleusBloom = useGlowMaterial("#cdc4ff", 1.3, 0.85);
    const coreRim = useGlowMaterial("#9a8bff", 2.2, 1.25, THREE.FrontSide);
    const haloGlow = useGlowMaterial("#34d8c4", 4.2, 0.42);

    /**
     * Below the lg breakpoint the hero stacks and the canvas gets its own band
     * above the copy, so the graph just centres in it. From lg up the canvas is
     * full-bleed behind the text, and the graph shifts into the free right-hand
     * column so it never sits under the headline.
     */
    const stacked = size.width < 1024;
    const offsetX = stacked ? 0 : size.width > 1280 ? 2.6 : 1.4;
    // Stacked, the band is short and wide; without the bump the graph reads as
    // a small decoration rather than the subject.
    const scale = stacked ? 0.95 : 1;

    useFrame((state, delta) => {
        if (reducedMotion || !group.current) return;

        const t = state.clock.elapsedTime;

        group.current.rotation.y += delta * 0.085;

        // Pointer parallax. Damped so it glides instead of snapping, and scaled
        // down on narrow viewports where the pointer is usually a thumb.
        const strength = stacked ? 0.08 : 0.16;
        const targetX = -state.pointer.y * strength + Math.sin(t * 0.25) * 0.04;
        const targetZ = state.pointer.x * strength * 0.5;

        group.current.rotation.x = THREE.MathUtils.damp(
            group.current.rotation.x,
            targetX,
            3,
            delta,
        );
        group.current.rotation.z = THREE.MathUtils.damp(
            group.current.rotation.z,
            targetZ,
            3,
            delta,
        );

        // Core breathes; shell counter-rotates so the two never look welded.
        const pulse = 1 + Math.sin(t * 1.15) * 0.055;
        core.current?.scale.setScalar(pulse);

        if (shell.current) {
            shell.current.rotation.y -= delta * 0.2;
            shell.current.rotation.x += delta * 0.06;
        }
    });

    return (
        <>
            {/* No lights: every material here is basic, additive or a custom
                shader, so scene lighting would cost frames and change nothing. */}
            <group ref={group} position={[offsetX, 0, 0]} scale={scale}>
                {/* Wired connections between nearby nodes. */}
                <lineSegments>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[linkPositions, 3]}
                        />
                        <bufferAttribute
                            attach="attributes-color"
                            args={[linkColors, 3]}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial
                        vertexColors
                        transparent
                        opacity={0.24}
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </lineSegments>

                {/* The nodes themselves. */}
                <points>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[nodePositions, 3]}
                        />
                        <bufferAttribute
                            attach="attributes-color"
                            args={[nodeColors, 3]}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.062}
                        vertexColors
                        transparent
                        opacity={0.95}
                        sizeAttenuation
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </points>

                {/* Faceted shell, deliberately low-poly so the edges read. */}
                <mesh ref={shell}>
                    <icosahedronGeometry args={[RADIUS * 0.98, 1]} />
                    <meshBasicMaterial
                        color="#6d5cff"
                        wireframe
                        transparent
                        opacity={0.1}
                        depthWrite={false}
                    />
                </mesh>

                {/* Core: a small hot nucleus inside two rim-lit shells. A solid
                    lit sphere here just reads as a planet — the point is that
                    the centre is energy, not a body. */}
                <group ref={core}>
                    <mesh>
                        <sphereGeometry args={[0.1, 24, 24]} />
                        <meshBasicMaterial color="#efecff" />
                    </mesh>

                    {/* Low fresnel power spreads the falloff across the whole
                        shell, so the nucleus blooms instead of ending on a
                        hard edge. */}
                    <mesh material={nucleusBloom}>
                        <sphereGeometry args={[0.3, 24, 24]} />
                    </mesh>

                    <mesh material={coreRim}>
                        <sphereGeometry args={[0.46, 48, 48]} />
                    </mesh>

                    <mesh material={haloGlow}>
                        <sphereGeometry args={[0.92, 32, 32]} />
                    </mesh>
                </group>

                <mesh scale={1.35}>
                    <icosahedronGeometry args={[0.52, 1]} />
                    <meshBasicMaterial
                        color="#34d8c4"
                        wireframe
                        transparent
                        opacity={0.2}
                        depthWrite={false}
                    />
                </mesh>
            </group>

            <Dust reducedMotion={reducedMotion} />
        </>
    );
}
