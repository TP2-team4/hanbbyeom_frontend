import type { ScheduledActivity } from "../../../entities/activity";
import { useAsync } from "../../../shared/lib/useAsync";
import { getScheduledActivities } from "../api/getScheduledActivities";

export function useScheduledActivities(limit?: number) {
	const { data, isLoading, error, refetch } = useAsync(
		() => getScheduledActivities(limit),
		[] as ScheduledActivity[],
		[limit],
		"예정된 활동을 불러오지 못했어요.",
	);

	return {
		activities: data,
		isLoading,
		error,
		refetch,
	};
}
