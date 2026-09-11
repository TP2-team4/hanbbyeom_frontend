import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
	primary: "bg-action-primary text-title",
	secondary: "bg-action-secondary text-secondary-400",
	destructive: "bg-error-text text-secondary-50",
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
			className={`rounded-md px-6 py-4 text-base font-bold transition-colors disabled:cursor-not-allowed disabled:bg-disabled disabled:text-placeholder ${variantStyles[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
