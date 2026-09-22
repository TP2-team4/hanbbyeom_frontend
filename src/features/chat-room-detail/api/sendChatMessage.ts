import type { ChatMessage } from "../../../entities/chat-room";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export type SendChatMessageRequest = {
	content: string;
};

export async function sendChatMessage(
	activityMatchId: number,
	request: SendChatMessageRequest,
): Promise<ChatMessage> {
	const response = await authorizedFetch(
		`/api/matching/matches/${activityMatchId}/messages`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: request.content }),
		},
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "메시지를 보내지 못했습니다."),
		);
	}

	return response.json() as Promise<ChatMessage>;
}