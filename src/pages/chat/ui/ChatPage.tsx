import { useNavigate } from "react-router-dom";
import { ChatRoomList } from "../../../features/chat-room-list";
import { AppHeader } from "../../../widgets/app-header";
import { BottomNavigation } from "../../../widgets/bottom-navigation";

export default function ChatPage() {
    const navigate = useNavigate();

    return (
        <main className="mx-auto grid min-h-full w-full max-w-[430px] grid-rows-[auto_1fr_auto] bg-primary-50">
            <AppHeader />
            <section className="grid min-h-0 grid-rows-[auto_1fr]" aria-label="채팅방 목록">
                <p className="px-6 py-5 text-sm leading-6 text-body">
                    확정된 활동에만 대화방이 열려요. 정해진 메시지만 주고받을 수 있어요.
                </p>
                <ChatRoomList />
            </section>
            <BottomNavigation
                activeItem="chat"
                onSelect={(item) => {
                    if (item === "home") navigate("/home");
                    if (item === "recruit") navigate("/recruitments");
                }}
            />
        </main>
    );
}
