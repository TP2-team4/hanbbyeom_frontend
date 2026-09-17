import { ActivityHistoryItem } from "../../../entities/activity-history";
import { ProfileSummaryCard } from "../../../entities/user-profile";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { useMyPage } from "../model/useMyPage";

export function MyProfileContent() {
	const { profile, activityHistory, isLoading, error } = useMyPage();

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
				<h2
					id="activity-history-title"
					className="text-xl font-bold text-title"
				>
					활동 이력
				</h2>
				{activityHistory.length > 0 ? (
					<ul className="mt-3 overflow-hidden rounded-lg border border-border bg-surface">
						{activityHistory.map((activity) => (
							<ActivityHistoryItem
								key={activity.id}
								activity={activity}
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
