import type { RecruitmentAuthorProfile } from "../model/types";

type Props = {
	profile: RecruitmentAuthorProfile;
	onViewProfile?: () => void;
};

export function RecruitmentAuthorCard({ profile, onViewProfile }: Props) {
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
						작성자 신뢰 정보
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
				</div>
			</div>

			<button
				type="button"
				className="mt-5 w-full rounded-md bg-primary-100 px-4 py-4 font-bold text-secondary-400 transition-colors hover:bg-primary-200"
				onClick={() => onViewProfile?.()}
			>
				상세 프로필 보기
			</button>
		</section>
	);
}
