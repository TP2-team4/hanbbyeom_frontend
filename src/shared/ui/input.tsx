import type { InputHTMLAttributes } from "react";

type InputVariant = "default" | "error";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	variant?: InputVariant;
}

const variantStyles: Record<InputVariant, string> = {
	default: "border-border focus:border-focus",
	error: "border-error-accent focus:border-error-accent",
};

export default function Input({
	variant = "default",
	className = "",
	...props
}: InputProps) {
	return (
		<input
			className={`h-14 w-full rounded-md border bg-surface px-4 text-base font-medium text-title outline-none placeholder:text-placeholder focus:border-2 ${variantStyles[variant]} ${className}`}
			{...props}
		/>
	);
}
