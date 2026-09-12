import type { ConversationPreference } from "../model/types";

export async function saveConversationPreference(
    _preference: ConversationPreference,
) {
    // TODO: 프로필 설정 API가 개발되면 실제 요청으로 교체
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true };
}
