import type { ActivityHistory } from "../../../entities/activity-history";
import type { UserProfile } from "../../../entities/user-profile";

const MOCK_PROFILE: UserProfile = {
    nickname: "담백한하루",
    email: "user@hanbbyeom.com",
    conversationPreference: "SILENT",
    averageRating: 4.9,
    completedActivityCount: 12,
    noShowReportCount: 0,
};

export function updateMockProfile(patch: Partial<UserProfile>) {
    Object.assign(MOCK_PROFILE, patch);
}

const MOCK_ACTIVITY_HISTORY: ActivityHistory[] = [
    { id: 1, activityMatchId: 101, title: "Silent Run · 뚝섬", dateLabel: "9월 5일", distanceKm: 8, partnerNickname: "새벽공기", partnerTalkLevel: "SILENT", reviewStatus: "completed" },
    { id: 2, activityMatchId: 102, title: "Silent Run · 여의도", dateLabel: "8월 28일", distanceKm: 10, partnerNickname: "조용한러너", partnerTalkLevel: "SILENT", reviewStatus: "required" },
    { id: 3, activityMatchId: 103, title: "Silent Run · 반포", dateLabel: "8월 21일", distanceKm: 5, partnerNickname: "오늘만러너", partnerTalkLevel: "LIGHT_CHAT", reviewStatus: "completed" },
];

export async function getMyPage() {
    // TODO: 마이페이지 API가 개발되면 실제 요청으로 교체
    await new Promise((resolve) => setTimeout(resolve, 350));
    return { profile: MOCK_PROFILE, activityHistory: MOCK_ACTIVITY_HISTORY };
}
