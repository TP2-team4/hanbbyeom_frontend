import { useNavigate } from "react-router-dom";
import { ScheduledActivityCard } from "../../../entities/activity";
import { useScheduledActivities } from "../model/useScheduledActivities";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";

export function ScheduledActivityList() {
	const navigate = useNavigate();
	const { activities, isLoading, error } = useScheduledActivities(1); // 홈화면에는 하나만 표시

	return (
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
				{isLoading && (
					<StatusText>예정된 활동을 불러오는 중...</StatusText>
				)}
				{error && <ErrorText>{error}</ErrorText>}
				{!isLoading && !error && activities.length === 0 && (
					<StatusText>예정된 활동이 없어요.</StatusText>
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
	);
}
