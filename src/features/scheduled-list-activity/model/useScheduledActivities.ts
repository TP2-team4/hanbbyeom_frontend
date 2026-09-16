import { useEffect, useState } from "react";
import type { ScheduledActivity } from "../../../entities/activity";
import { getScheduledActivities } from "../api/getScheduledActivities";

export function useScheduledActivities(limit?: number) {
	const [activities, setActivities] = useState<ScheduledActivity[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isActive = true;

		const loadActivities = async () => {
			try {
				const response = await getScheduledActivities(limit);
				if (isActive) setActivities(response);
			} catch {
				if (isActive) setError("예정된 활동을 불러오지 못했어요.");
			} finally {
				if (isActive) setIsLoading(false);
			}
		};

		void loadActivities();

		return () => {
			isActive = false;
		};
	}, [limit]);

	return {
		activities,
		isLoading,
		error,
	};
}
