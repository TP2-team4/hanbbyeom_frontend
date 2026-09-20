import type { ActivityHistory, ActivityHistoryStatus } from "../model/types";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";
import { formatDate } from "../../../shared/lib/date";

type ActivityMatchResponse = {
    activityMatchId: number;
    courseName: string;
    distanceMinMeters: number;
    distanceMaxMeters: number;
    scheduledAt: string;
    scheduledEndAt: string;
    status: "CONFIRMED" | "ENDED" | "CANCELLED";
    cancelledBy: "ME" | "COUNTERPART" | "SYSTEM" | null;
    counterpartNickname: string | null;
    submittedFeedbackType: "REVIEW" | "NO_SHOW_REPORT" | null;
};

function toStatus(item: ActivityMatchResponse): ActivityHistoryStatus {
    if (item.status === "CANCELLED") return "CANCELLED";

    const hasEnded =
        item.status === "ENDED" ||
        new Date(item.scheduledEndAt).getTime() <= Date.now();

    if (!hasEnded) {
        return new Date(item.scheduledAt).getTime() <= Date.now()
            ? "IN_PROGRESS"
            : "UPCOMING";
    }

    if (item.submittedFeedbackType === "REVIEW") return "REVIEW_COMPLETED";
    if (item.submittedFeedbackType === "NO_SHOW_REPORT")
        return "NO_SHOW_REPORTED";
    return "REVIEW_REQUIRED";
}

function toActivityHistory(item: ActivityMatchResponse): ActivityHistory {
    return {
        id: item.activityMatchId,
        activityMatchId: item.activityMatchId,
        title: item.courseName,
        dateLabel: formatDate(item.scheduledAt),
        minDistanceKm: item.distanceMinMeters / 1000,
        maxDistanceKm: item.distanceMaxMeters / 1000,
        partnerNickname: item.counterpartNickname ?? "탈퇴한 사용자",
        status: toStatus(item),
    };
}

export async function getActivityHistory(): Promise<ActivityHistory[]> {
    const response = await authorizedFetch("/api/matching/matches");

    if (!response.ok) {
        throw new Error(
            await extractErrorMessage(response, "활동 이력을 불러오지 못했습니다."),
        );
    }

    const body: ActivityMatchResponse[] = await response.json();
    return body
        .slice()
        .sort(
            (a, b) =>
                new Date(b.scheduledAt).getTime() -
                new Date(a.scheduledAt).getTime(),
        )
        .map(toActivityHistory);
}