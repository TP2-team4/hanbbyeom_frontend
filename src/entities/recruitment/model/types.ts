export type RecruitmentStatus = "open" | "applied" | "matching";
export type ConversationStyle = "SILENT" | "GREETING_ONLY" | "LIGHT_CHAT";

export type Recruitment = {
    id: number;
    location: string;
    distanceKm: number;
    conversationStyle: ConversationStyle;
    startsAt: string;
    dateLabel: string;
    time: string;
    pace: string;
    authorNickname: string;
    authorRating: number;
    authorCompletedCount: number;
    status: RecruitmentStatus;
};
