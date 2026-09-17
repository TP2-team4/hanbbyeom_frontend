type Props = {
	label: string;
	selected: boolean;
	onSelect: () => void;
};

export function CancelReasonOption({ label, selected, onSelect }: Props) {
	return (
		<button
			type="button"
			onClick={onSelect}
			aria-pressed={selected}
			className={`flex w-full items-center gap-3 rounded-lg border-2 px-5 py-4 text-left transition-colors ${
				selected
					? "border-error-accent bg-error-bg"
					: "border-border bg-surface"
			}`}
		>
			<span
				aria-hidden="true"
				className={`grid size-5 shrink-0 place-items-center rounded border-2 ${
					selected
						? "border-error-accent bg-error-accent text-white"
						: "border-border bg-surface"
				}`}
			>
				{selected && (
					<svg
						viewBox="0 0 24 24"
						className="size-3.5 fill-none stroke-current"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M5 13l4 4L19 7" />
					</svg>
				)}
			</span>
			<span
				className={`text-base font-medium ${selected ? "text-title" : "text-body"}`}
			>
				{label}
			</span>
		</button>
	);
}
