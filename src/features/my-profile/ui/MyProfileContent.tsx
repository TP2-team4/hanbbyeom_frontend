import { useNavigate } from "react-router-dom";
import { ActivityHistoryItem } from "../../../entities/activity-history";
import { ProfileSummaryCard } from "../../../entities/user-profile";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { useMyPage } from "../model/useMyPage";

export function MyProfileContent() {
	const navigate = useNavigate();
	const { profile, activityHistory, isLoading, error } = useMyPage();
	const previewActivityHistory = activityHistory.slice(0, 3);

	if (isLoading)
		return <StatusText className="py-16">마이페이지를 불러오는 중...</StatusText>;
	if (error || !profile)
		return (
			<ErrorText className="py-16 text-center text-sm">
				{error ?? "프로필 정보가 없어요."}
			</ErrorText>
		);

	return (
		<>
			<ProfileSummaryCard profile={profile} />
			<section
				className="mt-6"
				aria-labelledby="activity-history-title"
			>
				<div className="flex items-center justify-between">
					<h2
						id="activity-history-title"
						className="text-xl font-bold text-title"
					>
						활동 이력
					</h2>
					<button
						type="button"
						onClick={() => navigate("/my-page/activity-history")}
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
				{previewActivityHistory.length > 0 ? (
					<ul className="mt-3 overflow-hidden rounded-lg border border-border bg-surface">
						{previewActivityHistory.map((activity) => (
							<ActivityHistoryItem
								key={activity.id}
								activity={activity}
								onReview={(item) =>
									navigate(`/activities/${item.activityMatchId}/review`)
								}
							/>
						))}
					</ul>
				) : (
					<div className="mt-3 rounded-lg border border-border bg-surface px-5 py-10 text-center">
						<p className="font-bold text-title">
							아직 활동 이력이 없어요
						</p>
						<p className="mt-2 text-sm text-body">
							첫 러닝메이트를 만나보세요.
						</p>
					</div>
				)}
			</section>
		</>
	);
}
