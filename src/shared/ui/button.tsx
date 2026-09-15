import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
	primary:
		"bg-action-primary text-title hover:bg-primary-300 active:bg-primary-300",
	secondary:
		"bg-action-secondary text-secondary-400 hover:bg-primary-200 active:bg-primary-200",
	destructive:
		"bg-error-text text-secondary-50 hover:bg-error-accent active:bg-error-accent",
};

export default function Button({
	children,
	type = "button",
	variant = "primary",
	className = "",
	onClick,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`flex items-center justify-center rounded-md px-6 py-4 text-base font-bold transition-colors disabled:cursor-not-allowed disabled:bg-disabled disabled:text-placeholder ${variantStyles[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
