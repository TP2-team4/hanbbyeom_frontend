import Button from "../../../shared/ui/button";
import type { Recruitment, RecruitmentStatus } from "../model/types";

type Props = {
	recruitment: Recruitment;
	onApply?: (id: number) => void;
	onClick?: (id: number) => void;
	isProcessing?: boolean;
};

const STATUS_LABEL: Record<RecruitmentStatus, string> = {
	open: "신청",
	applied: "신청취소",
};

const CONVERSATION_STYLE_LABEL = {
	SILENT: "조용히",
	LIGHT_CHAT: "가벼운 대화",
} as const;

export function RecruitmentCard({
	recruitment,
	onApply,
	onClick,
	isProcessing,
}: Props) {
	const handleCardClick = () => onClick?.(recruitment.id);

	return (
		<article
			className={`rounded-lg border border-border bg-surface px-5 py-5
			transition-all duration-200
  			hover:-translate-y-0.5
			active:-translate-y-0.5
			${onClick ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-400" : ""}`}
			onClick={handleCardClick}
			onKeyDown={(event) => {
				if (onClick && (event.key === "Enter" || event.key === " ")) {
					event.preventDefault();
					handleCardClick();
				}
			}}
			role={onClick ? "link" : undefined}
			tabIndex={onClick ? 0 : undefined}
		>
			<div className="flex flex-wrap items-center gap-2">
				<h3 className="text-xl font-bold text-title">
					{recruitment.location} · {recruitment.minDistanceKm}~
					{recruitment.maxDistanceKm}km
				</h3>
				<span className="rounded-full bg-primary-100 px-3 py-1.5 text-xs font-medium text-secondary-400">
					{CONVERSATION_STYLE_LABEL[recruitment.conversationStyle]}
				</span>
			</div>
			<p className="mt-3 text-sm text-body">
				{recruitment.dateLabel} {recruitment.time} · {recruitment.pace}
				/km
			</p>
			<div className="mt-4 flex items-center gap-3">
				<span
					aria-hidden="true"
					className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-100 text-secondary-300"
				>
					<svg
						viewBox="0 0 24 24"
						className="size-5 fill-current"
					>
						<circle
							cx="12"
							cy="8"
							r="3"
						/>
						<path d="M6.5 19c.4-3.8 2.2-5.5 5.5-5.5s5.1 1.7 5.5 5.5Z" />
					</svg>
				</span>
				<p className="min-w-0 flex-1 truncate text-sm text-body">
					{recruitment.authorNickname} · ★{" "}
					{recruitment.authorRating.toFixed(1)} · 완료{" "}
					{recruitment.authorCompletedCount}회
				</p>
				<Button
					type="button"
					variant={
						recruitment.status === "applied"
							? "secondary"
							: "primary"
					}
					disabled={isProcessing}
					onClick={(event) => {
						event.stopPropagation();
						onApply?.(recruitment.id);
					}}
					onKeyDown={(event) => event.stopPropagation()}
					className="h-12 shrink-0 rounded-md px-4 text-sm font-bold"
				>
					{isProcessing ? "처리 중…" : STATUS_LABEL[recruitment.status]}
				</Button>
			</div>
		</article>
	);
}
