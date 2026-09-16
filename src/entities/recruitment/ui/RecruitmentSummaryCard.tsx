type BadgeTone = "green" | "gray";

type Props = {
	title: string;
	subtitle: string;
	badgeLabel: string;
	badgeTone: BadgeTone;
	onClick?: () => void;
};

const BADGE_TONE_CLASS: Record<BadgeTone, string> = {
	green: "bg-primary-100 text-secondary-400",
	gray: "bg-gray-100 text-body",
};

export function RecruitmentSummaryCard({
	title,
	subtitle,
	badgeLabel,
	badgeTone,
	onClick,
}: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex w-full items-center gap-3 rounded-lg border border-border bg-surface px-4 py-4 text-left"
		>
			<div className="min-w-0 flex-1">
				<p className="truncate text-base font-bold text-title">
					{title}
				</p>
				<p className="mt-1 truncate text-sm text-body">{subtitle}</p>
			</div>
			<span
				className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${BADGE_TONE_CLASS[badgeTone]}`}
			>
				{badgeLabel}
			</span>
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				className="size-5 shrink-0 fill-none stroke-gray-400"
				strokeWidth="2"
			>
				<path d="m9 5 7 7-7 7" />
			</svg>
		</button>
	);
}
