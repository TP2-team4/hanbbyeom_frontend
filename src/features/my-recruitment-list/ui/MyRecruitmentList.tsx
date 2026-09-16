import { useNavigate } from "react-router-dom";
import {
	RecruitmentSummaryCard,
	type ConversationStyle,
} from "../../../entities/recruitment";
import { useMyRecruitments } from "../model/useMyRecruitments";

const CONVERSATION_STYLE_LABEL: Record<ConversationStyle, string> = {
	SILENT: "조용히",
	LIGHT_CHAT: "가벼운 대화",
};

export function MyRecruitmentList() {
	const navigate = useNavigate();
	const { recruitments, isLoading, error } = useMyRecruitments(3);

	return (
		<section className="mt-8" aria-labelledby="my-recruitment-title">
			<div className="flex items-center justify-between">
				<h2
					id="my-recruitment-title"
					className="text-xl font-bold text-title"
				>
					모집 중인 내 글
				</h2>
				<button
					type="button"
					onClick={() => navigate("/recruitments/mine")}
					className="flex items-center text-sm font-medium text-body"
				>
					전체 보기
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="size-4 fill-none stroke-current"
						strokeWidth="2"
					>
						<path d="m9 5 7 7-7 7" />
					</svg>
				</button>
			</div>
			<div className="flex flex-col gap-2 mt-4">
				{isLoading && <p>...</p>}
				{error && (
					<p role="alert" className="text-sm text-error-text">
						{error}
					</p>
				)}
				{!isLoading &&
					!error &&
					recruitments.map((r) => (
						<RecruitmentSummaryCard
							key={r.id}
							title={`${r.location} · ${r.minDistanceKm}~${r.maxDistanceKm}km`}
							subtitle={`${r.dateLabel} ${r.time} · ${CONVERSATION_STYLE_LABEL[r.conversationStyle]}`}
							badgeLabel={
								r.applicantCount > 0
									? `신청자 ${r.applicantCount}명`
									: "대기 중"
							}
							badgeTone={r.applicantCount > 0 ? "green" : "gray"}
							onClick={() => navigate(`/recruitments/${r.id}/applicants`)}
						/>
					))}
			</div>
		</section>
	);
}
