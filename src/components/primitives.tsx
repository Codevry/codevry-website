import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * An icon from public/icons, painted in the current text colour. The files are
 * used only as shape masks (see `.icon` in index.css), so every icon takes its
 * colour from the palette whatever fills the SVG itself carries.
 */
export function MaskIcon({ src, className }: { src: string; className?: string }) {
    return (
        <span
            aria-hidden="true"
            className={cn("icon", className)}
            style={{ "--icon": `url("${src}")` } as CSSProperties}
        />
    );
}

/** Page-width container. One place to change the site's measure. */
export function Container({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
            {children}
        </div>
    );
}

/**
 * Small uppercase label that sits above a section heading. Rendered as plain
 * text — it is decoration, so it stays out of the heading outline.
 */
export function Eyebrow({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <p
            className={cn(
                "flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-accent uppercase",
                className,
            )}
        >
            <span
                aria-hidden="true"
                className="h-px w-6 bg-accent/60"
            />
            {children}
        </p>
    );
}

type ButtonProps = {
    children: ReactNode;
    /** Internal route path, or an absolute URL for external destinations. */
    to?: string;
    href?: string;
    variant?: "primary" | "ghost";
    className?: string;
};

const buttonBase =
    "group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition duration-300 ease-out-expo";

const buttonVariants = {
    primary:
        "bg-accent text-on-accent hover:bg-accent-hover hover:shadow-[0_10px_24px_-12px] hover:shadow-accent/70",
    ghost: "border border-line-strong text-fg hover:border-fg/40 hover:bg-fg/5 hover:text-fg",
};

export function Button({
    children,
    to,
    href,
    variant = "primary",
    className,
}: ButtonProps) {
    const classes = cn(buttonBase, buttonVariants[variant], className);

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <a
            href={href}
            className={classes}
            {...(href?.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
        >
            {children}
        </a>
    );
}

/** Surface used for every card on the site. */
export function Card({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-line bg-surface p-6 backdrop-blur-sm transition duration-500 ease-out-expo hover:border-line-strong hover:bg-surface",
                className,
            )}
        >
            {children}
        </div>
    );
}

/**
 * Fades and lifts content into view once, on scroll. Wraps `motion` so the
 * reveal treatment is identical everywhere and reduced-motion is honoured in
 * one place (motion disables transforms itself under the OS setting).
 *
 * The `data-reveal` hook matters: motion serialises `initial` into the
 * prerendered HTML as `opacity: 0`, which would leave the whole page blank for
 * anyone without JavaScript. A <noscript> rule in index.html keys off this
 * attribute to force the finished state. See index.html.
 */
export function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            data-reveal=""
            className={className}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

/** Section heading + eyebrow + optional lede, used by every section. */
export function SectionHeading({
    eyebrow,
    title,
    lede,
    className,
    as: Tag = "h2",
}: {
    eyebrow: string;
    title: ReactNode;
    lede?: ReactNode;
    className?: string;
    as?: "h1" | "h2";
}) {
    return (
        <div className={cn("max-w-2xl", className)}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Tag className="mt-5 text-3xl leading-[1.12] font-medium tracking-tight text-balance text-fg sm:text-4xl md:text-5xl">
                {title}
            </Tag>
            {lede && (
                <p className="mt-5 text-base leading-relaxed text-pretty text-fg-2 sm:text-lg">
                    {lede}
                </p>
            )}
        </div>
    );
}

/** Inline arrow that nudges on hover. */
export function ArrowIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className={cn(
                "size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5",
                className,
            )}
        >
            <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
