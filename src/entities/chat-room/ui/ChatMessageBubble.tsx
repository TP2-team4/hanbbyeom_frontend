import type { ChatMessage } from "../model/types";

type Props = {
	message: ChatMessage;
	currentUserId: number;
};

const timeFormatter = new Intl.DateTimeFormat("ko-KR", {
	hour: "numeric",
	minute: "2-digit",
	timeZone: "Asia/Seoul",
});

export function ChatMessageBubble({ message, currentUserId }: Props) {
	const isMine = message.senderId === currentUserId;

	return (
		<div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
			<div className="flex max-w-[75%] flex-col gap-1">
				<p
					className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${
						isMine
							? "rounded-br-sm bg-primary-400 text-secondary-600"
							: "rounded-bl-sm bg-secondary-200 text-title"
					}`}
				>
					{message.content}
				</p>
				<span
					className={`text-xs text-body ${isMine ? "text-right" : "text-left"}`}
				>
					{timeFormatter.format(new Date(message.createdAt))}
				</span>
			</div>
		</div>
	);
}
