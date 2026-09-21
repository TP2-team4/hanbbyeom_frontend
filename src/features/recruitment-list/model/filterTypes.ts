import type { ConversationStyle } from "../../../entities/recruitment";

export type DateFilter = "TODAY" | "TOMORROW" | "THIS_WEEKEND";

// 서버가 지원하는 정렬 값 그대로 (GET /api/matching/board의 sort 파라미터)
export type RecruitmentSort = "LATEST" | "SCHEDULED" | "DISTANCE";

export type RecruitmentFilters = {
    location: string | null;
    date: DateFilter | null;
    minDistanceKm: number;
    maxDistanceKm: number;
    minPaceSeconds: number;
    maxPaceSeconds: number;
    conversationStyle: ConversationStyle | null;
};

export const EMPTY_FILTERS: RecruitmentFilters = {
    location: null,
    date: null,
    minDistanceKm: 1,
    maxDistanceKm: 20,
    minPaceSeconds: 300,
    maxPaceSeconds: 480,
    conversationStyle: null,
};
