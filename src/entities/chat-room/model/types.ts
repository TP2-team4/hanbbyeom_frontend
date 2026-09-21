export type ChatRoomStatus =
	| "PROPOSED"
	| "CONFIRMED"
	| "REJECTED"
	| "EXPIRED"
	| "CANCELLED"
	| "ENDED";

export type ChatRoom = {
	activityMatchId: number;
	counterpartUserId: number;
	counterpartNickname: string | null;
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
	status: string;
	meetingCode: string;
	confirmedAt: string;
	closedAt: string | null;
	counterpartUserId: number;
	courseName: string;
	location: string;
	scheduledAt: string;
	scheduledEndAt: string;
};

export type ChatMessage = {
	id: number;
	senderId: number;
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
