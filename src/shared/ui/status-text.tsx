import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
	className?: string;
};

export function StatusText({ children, className = "py-10" }: Props) {
	return (
		<p className={`text-center text-sm text-body ${className}`}>
			{children}
		</p>
	);
}
