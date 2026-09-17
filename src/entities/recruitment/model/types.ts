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

export type MyRecruitmentStatus = "RECRUITING" | "CLOSED" | "CANCELLED";

export type MyRecruitmentSummary = {
	id: number;
	location: string;
	minDistanceKm: number;
	maxDistanceKm: number;
	conversationStyle: ConversationStyle;
	dateLabel: string;
	time: string;
	applicantCount: number;
	status: MyRecruitmentStatus;
	matchedPartnerNickname?: string;
};

export type AppliedRecruitmentStatus = "WAITING" | "ACCEPTED";

export type AppliedRecruitmentSummary = {
	id: number;
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
	dateLabel: string;
	time: string;
	pace: string;
	meetingPlace: string;
	status: RecruitmentStatus;
	applicantCount: number;
	authorNickname: string;
	authorRating: number;
	authorCompletedCount: number;
};

export type Applicant = {
	id: number;
	nickname: string;
	conversationStyle: string;
	averageRating: number;
	completedActivityCount: number;
	noShowReportCount: number;
};
