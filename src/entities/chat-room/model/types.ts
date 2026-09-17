export type ChatRoomStatus = "scheduled" | "in_progress" | "completed";

export type ChatRoom = {
	activityMatchId: number;
	participantNickname: string;
	lastMessage: string;
	activitySummary: string;
	status: ChatRoomStatus;
	hasUnreadMessage: boolean;
};

export type ChatMessage = {
	id: number;
	activityMatchId: number;
	senderId: number;
	messageType: "TEXT" | "PRESET";
	presetCode: string | null;
	content: string;
	createdAt: string;
};

export type PresetCode =
	| "ARRIVED"
	| "LATE_5_MINUTES"
	| "CANNOT_FIND_PLACE"
	| "CANNOT_PARTICIPATE";

export type ChatPreset = {
	code: PresetCode;
	content: string;
};
