import { cn } from "@/lib/utils";

interface ButtonProps {
    children: React.ReactNode;
    click?: () => void;
    className?: string;
}

export function MButton({ children, click, className }: ButtonProps) {
    return (
        <button
            onClick={click}
            className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl",
                "px-6 py-3",
                "transition duration-500 hover:scale-110 hover:cursor-pointer",
                className
            )}
        >
            {children}
        </button>
    );
}
