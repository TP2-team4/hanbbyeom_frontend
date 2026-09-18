import type { ChatMatchSummary } from "../../../entities/chat-room";
import { useAsync } from "../../../shared/lib/useAsync";
import { getChatMatchSummary } from "../api/getChatMatchSummary";

export function useChatMatchSummary(activityMatchId: number | null) {
	const { data, isLoading, error } = useAsync(
		() =>
			activityMatchId === null
				? Promise.resolve(null)
				: getChatMatchSummary(activityMatchId),
		null as ChatMatchSummary | null,
		[activityMatchId],
		"활동 정보를 불러오지 못했어요.",
	);

	return { matchSummary: data, isLoading, error };
}
