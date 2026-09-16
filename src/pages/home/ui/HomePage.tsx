import { useNavigate } from "react-router-dom";
import { CreateRecruitmentBanner } from "./CreateRecruitmentBanner";
import { useScheduledActivities } from "../../../features/scheduled-list-activity";
import { ScheduledActivityCard } from "../../../entities/activity";

export default function HomePage() {
	const navigate = useNavigate();
	const { activities, isLoading, error } = useScheduledActivities(1);	// 홈화면에는 하나만 표시 
	return (
		<div className="px-6 pb-12 pt-9">
			<section aria-labelledby="home-recommendation-title">
				<h2
					id="home-recommendation-title"
					className="text-3xl font-bold leading-tight text-title"
				>
					오늘, 조용히
					<br />
					함께 달릴까요?
				</h2>
				<p className="mt-4 text-base leading-6 text-body">
					가까워지지 않아도, 함께 달릴 수 있어요.
				</p>
				<div className="mt-7">
					<CreateRecruitmentBanner
						onCreate={() => navigate("/recruitments/new")}
					/>
				</div>
			</section>

			<section
				className="mt-8"
				aria-labelledby="scheduled-activity-title"
			>
				<div className="flex items-center justify-between">
					<h2
						id="scheduled-activity-title"
						className="text-xl font-bold text-title"
					>
						예정된 활동
					</h2>
					<button
						type="button"
						onClick={() => navigate("/activities")}
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
				<div className="flex flex-col gap-1 mt-4">
					{isLoading && <p>...</p>}
					{error && (
						<p
							role="alert"
							className="text-sm text-error-text"
						>
							{error}
						</p>
					)}
					{!isLoading &&
						!error &&
						activities.map((a) => (
							<ScheduledActivityCard
								key={a.id}
								activity={a}
								onClick={() => navigate(`/activities/${a.id}`)}
							/>
						))}
				</div>
			</section>
		</div>
	);
}
