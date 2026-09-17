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
		case "RECRUITING":
			return { label: "모집 중", className: "bg-primary-100 text-secondary-400" };
		case "CLOSED":
			return { label: "마감", className: "bg-gray-100 text-body" };
		case "CANCELLED":
			return { label: "취소", className: "bg-gray-100 text-body" };
	}
}

function getSubtitle(recruitment: MyRecruitmentSummary) {
	const base = `${recruitment.dateLabel} ${recruitment.time}`;

	if (recruitment.status === "RECRUITING") {
		return `${base} · ${CONVERSATION_STYLE_LABEL[recruitment.conversationStyle]} · ${
			recruitment.applicantCount > 0
				? `신청자 ${recruitment.applicantCount}명`
				: "신청자 없음"
		}`;
	}

	if (recruitment.status === "CLOSED") {
		return recruitment.matchedPartnerNickname
			? `${base} · ${recruitment.matchedPartnerNickname} 확정`
			: `${base} · 신청자 없이 마감`;
	}

	return base;
}

export function MyRecruitmentCard({ recruitment, onClick }: Props) {
	const badge = getBadge(recruitment);
	const isRecruiting = recruitment.status === "RECRUITING";
	const showApplicantCheck = isRecruiting && recruitment.applicantCount > 0;

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
