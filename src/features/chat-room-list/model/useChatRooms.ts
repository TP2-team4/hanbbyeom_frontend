import { useEffect, useState } from "react";
import type { ChatRoom } from "../../../entities/chat-room";
import { getChatRooms } from "../api/getChatRooms";

export function useChatRooms() {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;
        const loadChatRooms = async () => {
            try {
                const response = await getChatRooms();
                if (isActive) setChatRooms(response);
            } catch {
                if (isActive) setError("채팅방을 불러오지 못했어요.");
            } finally {
                if (isActive) setIsLoading(false);
            }
        };
        void loadChatRooms();
        return () => {
            isActive = false;
        };
    }, []);

    return { chatRooms, isLoading, error };
}
