import { useNavigate } from "react-router-dom";
import { RecruitmentSummaryCard } from "../../../entities/recruitment";
import { useMyAppliedRecruitment } from "../../../features/applied-recruitment-list";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { RetryButton } from "../../../shared/ui/retry-button";

const STATUS_LABEL = {
	PENDING: "대기 중",
	ACCEPTED: "수락됨",
	REJECTED: "거절·기한 만료",
	CANCELLED: "신청 취소",
};

export default function AppliedRecruitmentListPage() {
	const navigate = useNavigate();
	const { recruitments, isLoading, error, refetch } =
		useMyAppliedRecruitment();

	return (
		<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-primary-50">
			<header className="flex h-20 shrink-0 items-center gap-2 bg-primary-50 px-6">
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
				<h1 className="text-2xl font-bold text-title">
					내가 신청한 모집
				</h1>
			</header>

			<section
				className="flex-1 space-y-2 px-6 py-6"
				aria-live="polite"
			>
				{isLoading && (
					<StatusText>내가 신청한 모집을 불러오는 중...</StatusText>
				)}
				{error && (
					<div className="flex flex-col items-center gap-3 py-10">
						<ErrorText className="text-center text-sm">
							{error}
						</ErrorText>
						<RetryButton onClick={refetch} />
					</div>
				)}
				{!isLoading && !error && recruitments.length === 0 && (
					<StatusText>신청한 모집글이 없어요.</StatusText>
				)}
				{!isLoading &&
					!error &&
					recruitments.map((r) => (
						<RecruitmentSummaryCard
							key={r.id}
							title={`${r.location} · ${r.minDistanceKm}~${r.maxDistanceKm}km`}
							subtitle={`${r.dateLabel} ${r.time} · ${r.authorNickname}`}
							badgeLabel={STATUS_LABEL[r.status]}
							badgeTone={
								r.status === "ACCEPTED" ? "green" : "gray"
							}
							onClick={() =>
								navigate(`/recruitments/${r.hostMatchRequestId}`)
							}
						/>
					))}
			</section>
		</main>
	);
}
