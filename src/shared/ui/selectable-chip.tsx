import type { ButtonHTMLAttributes } from "react";

type SelectableChipProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
> & {
    selected: boolean;
    label: string;
};

export function SelectableChip({
    selected,
    label,
    className = "",
    type = "button",
    ...props
}: SelectableChipProps) {
    return (
        <button
            type={type}
            aria-pressed={selected}
            className={`rounded-full border px-4 py-2 text-sm font-bold ${
                selected
                    ? "border-primary-400 bg-primary-400 text-title"
                    : "border-border bg-surface text-body"
            } ${className}`}
            {...props}
        >
            {label}
        </button>
    );
}
