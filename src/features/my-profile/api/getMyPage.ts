import { getActivityHistory } from "../../../entities/activity-history";
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

export async function getMyPage() {
    const [currentUser, trustProfile, activityHistory] = await Promise.all([
        getCurrentUser(),
        getMyTrustProfile(),
        getActivityHistory(),
    ]);

    const profile: UserProfile = {
        ...MOCK_PROFILE,
        ...currentUser,
        averageRating: trustProfile.averageRating,
        completedActivityCount: trustProfile.completedCount,
        noShowReportCount: trustProfile.noShowReportCount,
    };

    return { profile, activityHistory };
}