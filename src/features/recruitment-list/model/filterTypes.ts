import type { ConversationStyle } from "../../../entities/recruitment";

export type DateFilter = "TODAY" | "TOMORROW" | "THIS_WEEKEND";

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
