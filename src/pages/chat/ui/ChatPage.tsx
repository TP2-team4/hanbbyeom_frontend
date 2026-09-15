import { ChatRoomList } from "../../../features/chat-room-list";

export default function ChatPage() {
    return (
        <section className="grid min-h-0 grid-rows-[auto_1fr]" aria-label="채팅방 목록">
            <p className="px-6 py-5 text-sm leading-6 text-body">
                확정된 활동에만 대화방이 열려요. 정해진 메시지만 주고받을 수 있어요.
            </p>
            <ChatRoomList />
        </section>
    );
}
