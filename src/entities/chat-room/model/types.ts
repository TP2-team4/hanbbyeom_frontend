export type ChatRoomStatus = "scheduled" | "in_progress" | "completed";

export type ChatRoom = {
    id: number;
    participantNickname: string;
    lastMessage: string;
    activitySummary: string;
    status: ChatRoomStatus;
    hasUnreadMessage: boolean;
};
