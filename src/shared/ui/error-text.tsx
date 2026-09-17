import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"p">;

export function ErrorText({ className = "text-sm", ...props }: Props) {
	return (
		<p
			{...props}
			role="alert"
			className={`text-error-text ${className}`}
		/>
	);
}
