import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../../../entities/chat-room";
import { useAsync } from "../../../shared/lib/useAsync";
import { getChatRoomMessages } from "../api/getChatRoomMessages";
import { sendChatMessage } from "../api/sendChatMessage";

const POLL_INTERVAL_MS = 4000;

export function useChatRoomMessages(
	activityMatchId: number | null,
	enabled = true,
) {
	const { data, setData, isLoading, error, refetch } = useAsync(
		() =>
			activityMatchId === null
				? Promise.resolve([])
				: getChatRoomMessages(activityMatchId),
		[] as ChatMessage[],
		[activityMatchId],
		"메시지를 불러오지 못했어요.",
	);
	const [isSending, setIsSending] = useState(false);
	const [sendError, setSendError] = useState<string | null>(null);
	const messagesRef = useRef(data);
	useEffect(() => {
		messagesRef.current = data;
	}, [data]);

	const appendMessage = useCallback(
		(message: ChatMessage) => {
			setData((current) => {
				const messagesById = new Map(
					current.map((item) => [item.id, item]),
				);

				messagesById.set(message.id, message);

				return [...messagesById.values()].sort((a, b) => a.id - b.id);
			});
		},
		[setData],
	);

	useEffect(() => {
		if (!enabled || activityMatchId === null) return;

		const poll = async () => {
			if (document.hidden) return;
			const lastId = messagesRef.current.at(-1)?.id;
			try {
				const newMessages = await getChatRoomMessages(
					activityMatchId,
					lastId,
				);
				newMessages.forEach(appendMessage);
			} catch {
				// 폴링 실패는 조용히 무시하고 다음 주기에 재시도
			}
		};

		const timerId = window.setInterval(poll, POLL_INTERVAL_MS);
		return () => window.clearInterval(timerId);
	}, [activityMatchId, enabled, appendMessage]);

	const sendMessage = async (content: string): Promise<boolean> => {
		const trimmed = content.trim();
		if (!trimmed || activityMatchId === null) return false;
		if (trimmed.length > 100) {
			setSendError("메시지는 100자까지 입력할 수 있어요.");
			return false;
		}

		setIsSending(true);
		setSendError(null);
		try {
			const message = await sendChatMessage(activityMatchId, {
				content: trimmed,
			});
			appendMessage(message);

			return true;
		} catch (error) {
			setSendError(
				error instanceof Error
					? error.message
					: "메시지를 보내지 못했어요. 다시 시도해 주세요.",
			);
			return false;
		} finally {
			setIsSending(false);
		}
	};

	return {
		messages: data,
		isLoading,
		error,
		refetch,
		isSending,
		sendError,
		sendMessage,
	};
}
