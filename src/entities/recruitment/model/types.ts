export type RecruitmentStatus = "open" | "applied";
export type ConversationStyle = "SILENT" | "LIGHT_CHAT";

export type Recruitment = {
	id: number;
	location: string;
	minDistanceKm: number;
	maxDistanceKm: number;
	conversationStyle: ConversationStyle;
	startsAt: string;
	dateLabel: string;
	time: string;
	pace: string;
	minPaceSeconds: number;
	maxPaceSeconds: number;
	authorNickname: string;
	authorRating: number;
	authorCompletedCount: number;
	status: RecruitmentStatus;
};

export type RecruitmentDetail = {
	id: number;
	authorId: number;
	location: string;
	minDistanceKm: number;
	maxDistanceKm: number;
	conversationStyle: ConversationStyle;
	dateLabel: string;
	time: string;
	pace: string;
	meetingPlace: string;
	status: RecruitmentStatus;
};
