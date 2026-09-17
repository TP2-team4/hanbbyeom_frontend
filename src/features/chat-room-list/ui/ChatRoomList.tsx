import { ChatRoomItem } from "../../../entities/chat-room";
import { StatusText } from "../../../shared/ui/status-text";
import { useChatRooms } from "../model/useChatRooms";

export function ChatRoomList() {
    const { chatRooms, isLoading, error } = useChatRooms();

    if (isLoading) {
        return <StatusText className="self-center">채팅방을 불러오는 중...</StatusText>;
    }

    if (error) {
        return (
            <p
                role="alert"
                className="self-center text-center text-sm text-error-text"
            >
                {error}
            </p>
        );
    }

    if (chatRooms.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center px-6 pb-16 text-center">
                <span
                    aria-hidden="true"
                    className="grid size-16 place-items-center rounded-full bg-gray-50 text-gray-400"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="size-8 fill-none stroke-current"
                        strokeWidth="1.8"
                    >
                        <path d="M4 5.5h16v11H9l-5 4Z" strokeLinejoin="round" />
                    </svg>
                </span>
                <h2 className="mt-5 text-xl font-bold text-title">
                    열린 대화방이 없어요
                </h2>
                <p className="mt-2 text-sm text-body">
                    매칭이 확정되면 여기에 방이 생겨요.
                </p>
            </div>
        );
    }

    return (
        <div className="border-t border-divider bg-surface">
            {chatRooms.map((chatRoom) => (
                <ChatRoomItem key={chatRoom.id} chatRoom={chatRoom} />
            ))}
        </div>
    );
}
