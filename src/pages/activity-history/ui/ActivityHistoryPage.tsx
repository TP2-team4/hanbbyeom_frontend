import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	ActivityHistoryItem,
	type ActivityHistoryStatus,
} from "../../../entities/activity-history";
import { useMyPage } from "../../../features/my-profile";
import { FilterTabs } from "../../../shared/ui/filter-tabs";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";

type FilterValue = "ALL" | "UPCOMING" | "REVIEW_REQUIRED" | "DONE";

const DONE_STATUSES: ActivityHistoryStatus[] = [
	"REVIEW_COMPLETED",
	"COMPLETED",
	"CANCELLED",
	"NO_SHOW_REPORTED",
];

function matchesFilter(status: ActivityHistoryStatus, filter: FilterValue) {
	if (filter === "ALL") return true;
	if (filter === "UPCOMING") return status === "UPCOMING" || status === "IN_PROGRESS";
	if (filter === "REVIEW_REQUIRED") return status === "REVIEW_REQUIRED";
	return DONE_STATUSES.includes(status);
}

export default function ActivityHistoryPage() {
	const navigate = useNavigate();
	const { activityHistory, isLoading, error } = useMyPage();
	const [filter, setFilter] = useState<FilterValue>("ALL");

	const filtered = activityHistory.filter((activity) =>
		matchesFilter(activity.status, filter),
	);

	return (
		<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-primary-50">
			<header className="flex h-20 shrink-0 items-center gap-2 bg-surface px-6">
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
				<h1 className="text-2xl font-bold text-title">활동 이력</h1>
			</header>

			<section className="flex-1 space-y-4 px-6 py-6" aria-live="polite">
				{!isLoading && !error && (
					<FilterTabs
						value={filter}
						onChange={setFilter}
						tabs={[
							{ value: "ALL", label: "전체", count: activityHistory.length },
							{ value: "UPCOMING", label: "예정" },
							{ value: "REVIEW_REQUIRED", label: "후기 작성 필요" },
							{ value: "DONE", label: "완료" },
						]}
					/>
				)}

				{isLoading && <StatusText>활동 이력을 불러오는 중...</StatusText>}
				{error && (
					<ErrorText className="text-center text-sm">{error}</ErrorText>
				)}
				{!isLoading && !error && filtered.length === 0 && (
					<StatusText>해당하는 활동 이력이 없어요.</StatusText>
				)}
				{!isLoading && !error && filtered.length > 0 && (
					<ul className="overflow-hidden rounded-lg border border-border bg-surface">
						{filtered.map((activity) => (
							<ActivityHistoryItem
								key={activity.id}
								activity={activity}
								onReview={(item) =>
									navigate(`/activities/${item.activityMatchId}/review`)
								}
							/>
						))}
					</ul>
				)}
			</section>
		</main>
	);
}
