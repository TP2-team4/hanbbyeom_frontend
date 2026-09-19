import type { ChatMatchSummary } from "../../../entities/chat-room";
import {authorizedFetch} from "../../../shared/lib/authorizedFetch.ts";

export async function getChatMatchSummary(
	activityMatchId: number,
): Promise<ChatMatchSummary | null> {
	const response = await authorizedFetch(
		`/api/matching/matches/${activityMatchId}`,
	);

	if (!response.ok) {
		return null;
	}

	return response.json() as Promise<ChatMatchSummary>;
}
