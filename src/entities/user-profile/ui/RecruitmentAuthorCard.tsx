import type { RecruitmentAuthorProfile } from "../model/types";
import { RecentReviewList } from "./RecentReviewList";

type Props = {
	nickname: string;
	profile: RecruitmentAuthorProfile;
};

export function RecruitmentAuthorCard({ nickname, profile }: Props) {
	return (
		<section
			className="rounded-2xl border border-border bg-surface p-6"
			aria-labelledby="author-heading"
		>
			<div className="flex items-center gap-4">
				<span
					aria-hidden="true"
					className="grid size-14 shrink-0 place-items-center rounded-full bg-primary-100 text-secondary-300"
				>
					<svg
						viewBox="0 0 24 24"
						className="size-7 fill-current"
					>
						<circle
							cx="12"
							cy="8"
							r="3"
						/>
						<path d="M6 20c.4-4.2 2.4-6 6-6s5.6 1.8 6 6Z" />
					</svg>
				</span>
				<div>
					<h2
						id="author-heading"
						className="text-xl font-bold text-title"
					>
						{nickname}
					</h2>
					<p className="mt-1 text-sm text-body">
						{profile.averageRating !== null ? (
							<>
								★{" "}
								<strong className="text-title">
									{profile.averageRating.toFixed(1)}
								</strong>{" "}
								· 후기 {profile.reviewCount}개 ·{" "}
							</>
						) : (
							"평가 없음 · "
						)}
						완료 {profile.completedActivityCount}회 · 노쇼{" "}
						{profile.noShowReportCount}회
					</p>
					{profile.perceivedTalkLevelMajority && (
						<p className="mt-1 text-xs text-body">
							체감 대화 수준:{" "}
							{profile.perceivedTalkLevelMajority === "SILENT"
								? "조용히"
								: "가벼운 대화"}{" "}
							({profile.perceivedTalkLevelMajorityCount}명)
						</p>
					)}
				</div>
			</div>

			<h3 className="mt-5 text-sm font-bold text-title">최근 후기</h3>
			<div className="mt-2">
				<RecentReviewList reviews={profile.recentReviews} />
			</div>
		</section>
	);
}
