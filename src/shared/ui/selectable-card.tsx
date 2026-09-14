import type { ButtonHTMLAttributes } from "react";

type SelectableCardProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
> & {
    selected: boolean;
    label: string;
    description?: string;
};

export function SelectableCard({
    selected,
    label,
    description,
    className = "",
    type = "button",
    ...props
}: SelectableCardProps) {
    return (
        <button
            type={type}
            className={`flex min-h-28 w-full items-center justify-between rounded-lg border px-5 py-4 text-left transition-colors ${
                selected
                    ? "border-primary-400 bg-primary-100"
                    : "border-border bg-surface"
            } ${className}`}
            {...props}
        >
            <span>
                <strong className="block text-xl font-bold text-title">
                    {label}
                </strong>
                {description && (
                    <span className="mt-1 block text-sm text-body">
                        {description}
                    </span>
                )}
            </span>
            {selected && (
                <span
                    aria-hidden="true"
                    className="text-3xl leading-none text-secondary-400"
                >
                    ✓
                </span>
            )}
        </button>
    );
}
