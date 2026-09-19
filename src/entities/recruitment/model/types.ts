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

export type MyRecruitmentStatus = MatchRequestStatus;

export type MyRecruitmentSummary = {
	id: number;
	location: string;
	minDistanceKm: number;
	maxDistanceKm: number;
	conversationStyle: ConversationStyle;
	dateLabel: string;
	time: string;
	status: MyRecruitmentStatus;
};

export type AppliedRecruitmentStatus =
	| "PENDING"
	| "ACCEPTED"
	| "REJECTED"
	| "CANCELLED";

export type AppliedRecruitmentSummary = {
	id: number;
	activityMatchId: number;
	hostMatchRequestId: number;
	location: string;
	minDistanceKm: number;
	maxDistanceKm: number;
	dateLabel: string;
	time: string;
	authorNickname: string;
	status: AppliedRecruitmentStatus;
};

export type RecruitmentDetail = {
	id: number;
	authorId: number;
	location: string;
	minDistanceKm: number;
	maxDistanceKm: number;
	conversationStyle: ConversationStyle;
	scheduledAt: string;
	dateLabel: string;
	time: string;
	pace: string;
	meetingPlace: string;
	status: RecruitmentStatus;
	requestStatus: MatchRequestStatus;
	isOwner: boolean;
	applicantCount: number;
	authorNickname: string;
	authorRating: number;
	authorCompletedCount: number;
};

export type MatchRequestStatus =
	| "SEARCHING"
	| "PENDING_CONFIRMATION"
	| "MATCHED"
	| "CANCELLED"
	| "EXPIRED"
	| "CLOSED";
