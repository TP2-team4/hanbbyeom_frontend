import type { ChatRoom, ChatRoomStatus } from "../model/types";
import { formatDate, toTimeValue } from "../../../shared/lib/date";

type Props = {
	chatRoom: ChatRoom;
	onClick?: (activityMatchId: number) => void;
};

const STATUS_LABEL: Record<ChatRoomStatus, string> = {
	PROPOSED: "매칭 대기",
	CONFIRMED: "진행 예정",
	REJECTED: "매칭 거절",
	EXPIRED: "기한 만료",
	ENDED: "완료",
};

export function ChatRoomItem({ chatRoom, onClick }: Props) {
	const dateLabel = formatDate(chatRoom.scheduledAt);
	const timeLabel = toTimeValue(new Date(chatRoom.scheduledAt));

	return (
		<button
			type="button"
			onClick={() => onClick?.(chatRoom.activityMatchId)}
			className="flex w-full items-center gap-4 border-b border-divider px-5 py-5 text-left"
		>
			<span
				aria-hidden="true"
				className="grid size-14 shrink-0 place-items-center rounded-full bg-primary-100 text-secondary-300"
			>
				<svg
					viewBox="0 0 24 24"
					className="size-7 fill-current"
				>
					<circle
						cx="12"
						cy="8"
						r="3"
					/>
					<path d="M6 20c.4-4.2 2.4-6 6-6s5.6 1.8 6 6Z" />
				</svg>
			</span>

			<span className="min-w-0 flex-1">
				<span className="flex flex-wrap items-center gap-2">
					<strong className="text-lg font-bold text-title">
						{chatRoom.counterpartNickname ?? "탈퇴한 사용자"}
					</strong>
					<span
						className={`rounded-full px-3 py-1 text-xs font-medium ${chatRoom.status === "ENDED" ? "bg-gray-50 text-gray-600" : "bg-primary-100 text-secondary-400"}`}
					>
						{STATUS_LABEL[chatRoom.status]}
					</span>
				</span>
				<span className="mt-1 block line-clamp-2 break-words text-sm text-body">
					{chatRoom.lastMessage ?? "아직 주고받은 메시지가 없어요."}
				</span>
				<span className="mt-1 block truncate text-xs text-body">
					{chatRoom.courseName} · {dateLabel} {timeLabel} ·{" "}
					{chatRoom.location}
				</span>
			</span>
		</button>
	);
}
