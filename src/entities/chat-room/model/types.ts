export type ChatRoomStatus =
	| "PROPOSED"
	| "CONFIRMED"
	| "REJECTED"
	| "EXPIRED"
	| "ENDED";

export type ChatRoom = {
	activityMatchId: number;
	counterpartUserId: number;
	status: ChatRoomStatus;
	courseName: string;
	location: string;
	scheduledAt: string;
	scheduledEndAt: string;
	lastMessage: string | null;
	lastMessageAt: string | null;
};

export type ChatMatchSummary = {
	activityMatchId: number;
	courseName: string;
	location: string;
	scheduledAt: string;
	scheduledEndAt: string;
	status: string;
	counterpartUserId: number;
	messageSendable: boolean;
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
