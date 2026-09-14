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
			className={`flex w-full items-center justify-between rounded-lg border-2 px-5 py-4 text-left transition-colors ${
				selected
					? "border-primary-400 bg-primary-100"
					: "border-border bg-surface"
			} ${className}`}
			{...props}
		>
			<span>
				<strong
					className={`block text-xl font-bold ${
						selected ? "text-title" : "text-gray-800"
					}`}
				>
					{label}
				</strong>
				{description && (
					<span
						className={`mt-1 block text-sm ${
							selected ? "text-secondary-400" : " text-body"
						}`}
					>
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
