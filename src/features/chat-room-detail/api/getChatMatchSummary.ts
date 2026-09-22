import type { ChatMatchSummary } from "../../../entities/chat-room";
import {authorizedFetch} from "../../../shared/lib/authorizedFetch.ts";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export async function getChatMatchSummary(
	activityMatchId: number,
): Promise<ChatMatchSummary | null> {
	const response = await authorizedFetch(
		`/api/matching/matches/${activityMatchId}`,
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "활동 정보를 불러오지 못했습니다."),
		);
	}

	return response.json() as Promise<ChatMatchSummary>;
}
