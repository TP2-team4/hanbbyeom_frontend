import { useAsync } from "../../../shared/lib/useAsync";
import {
	getFeedbackStatus,
	type FeedbackStatus,
} from "../api/getFeedbackStatus";

export function useFeedbackStatus(activityMatchId: number) {
	const { data, isLoading, error } = useAsync<FeedbackStatus | null>(
		() => getFeedbackStatus(activityMatchId),
		null,
		[activityMatchId],
		"제출 가능 여부를 확인하지 못했어요.",
	);

	return { feedbackStatus: data, isLoading, error };
}
