import { useNavigate } from "react-router-dom";
import {
	RecruitmentSummaryCard,
	type ConversationStyle,
} from "../../../entities/recruitment";
import { useMyRecruitments } from "../../../features/my-recruitment-list";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";

const CONVERSATION_STYLE_LABEL: Record<ConversationStyle, string> = {
	SILENT: "조용히",
	LIGHT_CHAT: "가벼운 대화",
};

export default function MyRecruitmentListPage() {
	const navigate = useNavigate();
	const { recruitments, isLoading, error } = useMyRecruitments();

	return (
		<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-primary-50">
			<header className="flex h-20 shrink-0 items-center gap-2 bg-surface px-6">
				<button
					type="button"
					aria-label="뒤로 가기"
					className="grid size-10 place-items-center text-title"
					onClick={() => navigate(-1)}
				>
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="size-7 fill-none stroke-current"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="m15 18-6-6 6-6" />
					</svg>
				</button>
				<h1 className="text-2xl font-bold text-title">내 모집글</h1>
			</header>

			<section className="flex-1 space-y-2 px-6 py-6" aria-live="polite">
				{isLoading && (
					<StatusText>모집 중인 내 글을 불러오는 중...</StatusText>
				)}
				{error && <ErrorText>{error}</ErrorText>}
				{!isLoading && !error && recruitments.length === 0 && (
					<StatusText>작성한 모집글이 없어요.</StatusText>
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
			</section>
		</main>
	);
}
