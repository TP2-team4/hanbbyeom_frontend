import type { ChatPreset } from "../../../entities/chat-room";
import { useAsync } from "../../../shared/lib/useAsync";
import { getChatPresets } from "../api/getChatPresets";

export function useChatPresets() {
	const { data, isLoading, error } = useAsync(
		getChatPresets,
		[] as ChatPreset[],
		[],
		"빠른 메시지를 불러오지 못했어요.",
	);

	return {
		presets: data,
		isLoading,
		error,
	};
}
