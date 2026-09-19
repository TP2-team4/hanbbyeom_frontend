import type { ActivityHistory } from "../../../entities/activity-history";
import { getCurrentUser, getMyTrustProfile, type UserProfile } from "../../../entities/user-profile";

const MOCK_PROFILE: UserProfile = {
	id: 1,
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
    { id: 1, activityMatchId: 201, title: "Silent Run · 뚝섬", dateLabel: "9월 12일 (금)", distanceKm: 8, partnerNickname: "조용한러너", partnerTalkLevel: "SILENT", status: "UPCOMING" },
    { id: 2, activityMatchId: 202, title: "Silent Run · 여의도", dateLabel: "9월 10일 (수)", distanceKm: 10, partnerNickname: "새벽공기", partnerTalkLevel: "SILENT", status: "IN_PROGRESS" },
    { id: 3, activityMatchId: 203, title: "Silent Run · 반포", dateLabel: "9월 5일 (금)", distanceKm: 5, partnerNickname: "밤산책", partnerTalkLevel: "SILENT", status: "REVIEW_REQUIRED" },
    { id: 4, activityMatchId: 204, title: "Silent Run · 안양천", dateLabel: "8월 28일 (수)", distanceKm: 12, partnerNickname: "고요한밤", partnerTalkLevel: "SILENT", status: "REVIEW_COMPLETED" },
    { id: 5, activityMatchId: 205, title: "Silent Run · 잠실", dateLabel: "8월 21일 (수)", distanceKm: 8, partnerNickname: "조용한러너", partnerTalkLevel: "SILENT", status: "COMPLETED" },
    { id: 6, activityMatchId: 206, title: "Silent Run · 뚝섬", dateLabel: "8월 14일 (수)", distanceKm: 8, partnerNickname: "새벽공기", partnerTalkLevel: "SILENT", status: "CANCELLED" },
    { id: 7, activityMatchId: 207, title: "Silent Run · 반포", dateLabel: "8월 7일 (수)", distanceKm: 5, partnerNickname: "-", partnerTalkLevel: "SILENT", status: "NO_SHOW_REPORTED" },
];

export async function getMyPage() {
    const [currentUser, trustProfile] = await Promise.all([
        getCurrentUser(),
        getMyTrustProfile(),
    ]);

    const profile: UserProfile = {
        ...MOCK_PROFILE,
        ...currentUser,
        averageRating: trustProfile.averageRating ?? 0,
        completedActivityCount: trustProfile.completedCount,
        noShowReportCount: trustProfile.noShowReportCount,
    };

    return { profile, activityHistory: MOCK_ACTIVITY_HISTORY };
}