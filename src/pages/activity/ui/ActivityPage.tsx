import { useNavigate } from "react-router-dom";
import { ScheduledActivityCard } from "../../../entities/activity";
import { useScheduledActivities } from "../../../features/scheduled-list-activity";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";

export default function ActivityPage() {
	const navigate = useNavigate();
	const { activities, isLoading, error } = useScheduledActivities();

	return (
		<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-primary-50">
			<header className="flex h-20 items-center gap-2 bg-primary-50 px-6">
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
				<h1 className="text-2xl font-bold text-title">예정된 활동</h1>
			</header>

			<section className="flex flex-col gap-2 px-6 py-6">
				{isLoading && <StatusText>예정된 활동을 불러오는 중...</StatusText>}
				{error && (
					<ErrorText className="py-10 text-center text-sm">
						{error}
					</ErrorText>
				)}
				{!isLoading && !error && activities.length === 0 && (
					<StatusText>예정된 활동이 없어요.</StatusText>
				)}
				{!isLoading &&
					!error &&
					activities.map((activity) => (
						<ScheduledActivityCard
							key={activity.id}
							activity={activity}
								onClick={() => navigate(`/chats/${activity.id}`)}
						/>
					))}
			</section>
		</main>
	);
}
