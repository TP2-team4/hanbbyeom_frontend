import { useNavigate } from "react-router-dom";
import { RecruitmentSummaryCard } from "../../../entities/recruitment";
import { useMyAppliedRecruitment } from "../model/useMyAppliedRecruitment";

export function AppliedRecruitmentList() {
	const navigate = useNavigate();
	const { recruitments, isLoading, error } = useMyAppliedRecruitment(3);

	return (
		<section className="mt-8" aria-labelledby="applied-recruitment-title">
			<div className="flex items-center justify-between">
				<h2
					id="applied-recruitment-title"
					className="text-xl font-bold text-title"
				>
					내가 신청한 모집
				</h2>
				<button
					type="button"
					onClick={() => navigate("/recruitments/applied")}
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
							subtitle={`${r.dateLabel} ${r.time} · ${r.authorNickname}`}
							badgeLabel={
								r.status === "ACCEPTED" ? "수락됨" : "대기 중"
							}
							badgeTone={
								r.status === "ACCEPTED" ? "green" : "gray"
							}
							onClick={() => navigate(`/recruitments/${r.id}`)}
						/>
					))}
			</div>
		</section>
	);
}
