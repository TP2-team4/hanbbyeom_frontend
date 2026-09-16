import Button from "../../../shared/ui/button";
import { useApplicants } from "../model/useApplicants";

export function ApplicantList({ recruitmentId }: { recruitmentId: number }) {
	const { applicants, isLoading, error } = useApplicants(recruitmentId);

	return (
		<div className="flex flex-col gap-3">
			{isLoading && (
				<p className="py-10 text-center text-sm text-body">
					신청자 목록을 불러오는 중...
				</p>
			)}
			{error && (
				<p role="alert" className="py-10 text-center text-sm text-error-text">
					{error}
				</p>
			)}
			{!isLoading && !error && applicants.length === 0 && (
				<p className="py-10 text-center text-sm text-body">
					아직 신청자가 없어요.
				</p>
			)}
			{!isLoading &&
				!error &&
				applicants.map((applicant) => (
					<article
						key={applicant.id}
						className="rounded-lg border border-border bg-surface px-5 py-5"
					>
						<div className="flex flex-wrap items-center gap-2">
							<h3 className="text-lg font-bold text-title">
								{applicant.nickname}
							</h3>
							<span className="rounded-full bg-primary-100 px-3 py-1.5 text-xs font-medium text-secondary-400">
								{applicant.conversationStyle}
							</span>
						</div>
						<p className="mt-2 text-sm text-body">
							★ {applicant.averageRating.toFixed(1)} · 완료{" "}
							{applicant.completedActivityCount}회 · 노쇼{" "}
							{applicant.noShowReportCount}회
						</p>
						<div className="mt-4 flex items-center gap-2">
							<button
								type="button"
								className="text-sm font-medium text-body underline"
							>
								프로필 보기
							</button>
							<div className="ml-auto flex gap-2">
								<Button
									type="button"
									variant="destructive"
									className="h-10 px-4 text-sm"
								>
									거절
								</Button>
								<Button
									type="button"
									variant="primary"
									className="h-10 px-4 text-sm"
								>
									수락
								</Button>
							</div>
						</div>
					</article>
				))}
		</div>
	);
}
