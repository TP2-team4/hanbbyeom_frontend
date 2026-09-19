import type { ConversationStyle, MyRecruitmentSummary } from "../model/types";

const CONVERSATION_STYLE_LABEL: Record<ConversationStyle, string> = {
	SILENT: "조용히",
	LIGHT_CHAT: "가벼운 대화",
};

type Props = {
	recruitment: MyRecruitmentSummary;
	onClick: () => void;
};

function getBadge(recruitment: MyRecruitmentSummary) {
	switch (recruitment.status) {
		case "SEARCHING":
			return {
				label: "모집 중",
				className: "bg-primary-100 text-secondary-400",
			};
		case "PENDING_CONFIRMATION":
			return {
				label: "신청 확인 대기",
				className: "bg-primary-100 text-secondary-400",
			};
		case "MATCHED":
			return { label: "매칭 확정", className: "bg-gray-100 text-body" };
		case "CANCELLED":
			return { label: "취소", className: "bg-gray-100 text-body" };
		case "EXPIRED":
			return { label: "기간 만료", className: "bg-gray-100 text-body" };
		case "CLOSED":
			return { label: "마감", className: "bg-gray-100 text-body" };
	}
}

function getSubtitle(recruitment: MyRecruitmentSummary) {
	return `${recruitment.dateLabel} ${recruitment.time} · ${
		CONVERSATION_STYLE_LABEL[recruitment.conversationStyle]
	}`;
}

export function MyRecruitmentCard({ recruitment, onClick }: Props) {
	const badge = getBadge(recruitment);
	const isRecruiting =
		recruitment.status === "SEARCHING" ||
		recruitment.status === "PENDING_CONFIRMATION";

	const showApplicantCheck =
		recruitment.status === "PENDING_CONFIRMATION";

	const content = (
		<div className="min-w-0 flex-1">
			<p className="truncate text-base font-bold text-title">
				{recruitment.location} · {recruitment.minDistanceKm}~
				{recruitment.maxDistanceKm}km
			</p>
			<p className="mt-1 truncate text-sm text-body">
				{getSubtitle(recruitment)}
			</p>
		</div>
	);

	return (
		<div className="overflow-hidden rounded-lg border border-border bg-surface">
			{isRecruiting ? (
				<button
					type="button"
					onClick={onClick}
					className="flex w-full items-center gap-3 px-4 py-4 text-left"
				>
					{content}
					<span
						className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${badge.className}`}
					>
						{badge.label}
					</span>
				</button>
			) : (
				<div className="flex w-full items-center gap-3 px-4 py-4">
					{content}
					<span
						className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${badge.className}`}
					>
						{badge.label}
					</span>
				</div>
			)}
			{showApplicantCheck && (
				<button
					type="button"
					onClick={onClick}
					className="block w-full bg-primary-400 px-4 py-3 text-center text-sm font-bold text-title"
				>
					신청자 확인
				</button>
			)}
		</div>
	);
}
