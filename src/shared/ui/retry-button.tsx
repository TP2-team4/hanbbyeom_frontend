type Props = {
	onClick: () => void;
	className?: string;
};

export function RetryButton({ onClick, className = "" }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`rounded-md border border-border px-4 py-2 text-sm font-bold text-body ${className}`}
		>
			다시 시도
		</button>
	);
}
