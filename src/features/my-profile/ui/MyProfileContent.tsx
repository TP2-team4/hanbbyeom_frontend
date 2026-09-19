import { useNavigate } from "react-router-dom";
import { ActivityHistoryItem } from "../../../entities/activity-history";
import { MyRecruitmentCard } from "../../../entities/recruitment";
import { ProfileSummaryCard } from "../../../entities/user-profile";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { RetryButton } from "../../../shared/ui/retry-button";
import { useMyPage } from "../model/useMyPage";
import { useMyRecruitments } from "../../my-recruitment-list";

export function MyProfileContent() {
	const navigate = useNavigate();
	const { profile, activityHistory, isLoading, error } = useMyPage();
	const {
		recruitments,
		isLoading: isRecruitmentsLoading,
		error: recruitmentsError,
		refetch: refetchRecruitments,
	} = useMyRecruitments(3);
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

			<section className="mt-6" aria-labelledby="my-recruitment-title">
				<div className="flex items-center justify-between">
					<h2
						id="my-recruitment-title"
						className="text-xl font-bold text-title"
					>
						내 모집글
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
				<div className="mt-3 flex flex-col gap-2">
					{isRecruitmentsLoading && (
						<StatusText>내 모집글을 불러오는 중...</StatusText>
					)}
					{recruitmentsError && (
						<div className="flex items-center gap-2">
							<ErrorText>{recruitmentsError}</ErrorText>
							<RetryButton
								onClick={refetchRecruitments}
								className="shrink-0 px-3 py-1"
							/>
						</div>
					)}
					{!isRecruitmentsLoading &&
						!recruitmentsError &&
						recruitments.length === 0 && (
							<StatusText>작성한 모집글이 없어요.</StatusText>
						)}
					{!isRecruitmentsLoading &&
						!recruitmentsError &&
						recruitments.map((r) => (
							<MyRecruitmentCard
								key={r.id}
								recruitment={r}
								onClick={() =>
									navigate(`/recruitments/${r.id}/applicants`)
								}
							/>
						))}
				</div>
			</section>

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
