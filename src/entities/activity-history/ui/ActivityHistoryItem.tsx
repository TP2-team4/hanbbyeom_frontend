import type { ActivityHistory, ActivityHistoryStatus } from "../model/types";

type Props = {
	activity: ActivityHistory;
	onReview?: (activity: ActivityHistory) => void;
};

const STATUS_BADGE: Record<
	ActivityHistoryStatus,
	{ label: string; className: string }
> = {
	UPCOMING: { label: "예정", className: "bg-gray-100 text-body" },
	IN_PROGRESS: {
		label: "진행 중",
		className: "bg-primary-100 text-secondary-400",
	},
	REVIEW_REQUIRED: {
		label: "후기 작성 필요",
		className: "bg-secondary-100 text-secondary-400",
	},
	REVIEW_COMPLETED: {
		label: "후기 작성 완료",
		className: "bg-gray-100 text-body",
	},
	CANCELLED: { label: "취소", className: "bg-gray-100 text-body" },
	NO_SHOW_REPORTED: {
		label: "노쇼 신고",
		className: "bg-error-bg text-error-text",
	},
};

export function ActivityHistoryItem({ activity, onReview }: Props) {
	const badge = STATUS_BADGE[activity.status];
	const reviewRequired = activity.status === "REVIEW_REQUIRED";

	return (
		<li className="flex min-h-24 items-center gap-4 border-b border-divider px-5 py-4 last:border-b-0">
			<div className="min-w-0 flex-1">
				<strong className="block truncate text-base font-bold text-title">
					{activity.title}
				</strong>
				<p className="mt-1 truncate text-sm text-body">
					{activity.dateLabel} · {activity.minDistanceKm}~{activity.maxDistanceKm}km ·{" "}
					{activity.partnerNickname}
				</p>
			</div>
			<span
				className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${badge.className}`}
			>
				{badge.label}
			</span>
			{reviewRequired && (
				<button
					type="button"
					onClick={() => onReview?.(activity)}
					className="shrink-0 rounded-full bg-primary-400 px-4 py-2 text-sm font-bold text-title"
				>
					후기 작성
				</button>
			)}
		</li>
	);
}
