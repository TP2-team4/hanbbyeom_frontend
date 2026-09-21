import { getActivityHistory } from "../../../entities/activity-history";
import { getCurrentUser, getMyTrustProfile, type UserProfile } from "../../../entities/user-profile";

export async function getMyPage() {
    const [currentUser, trustProfile, activityHistory] = await Promise.all([
        getCurrentUser(),
        getMyTrustProfile(),
        getActivityHistory(),
    ]);

    const profile: UserProfile = {
        id: currentUser.id,
        nickname: currentUser.nickname,
        email: currentUser.email,
        conversationPreference: currentUser.defaultTalkLevel,
        averageRating: trustProfile.averageRating,
        completedActivityCount: trustProfile.completedActivityCount,
        noShowReportCount: trustProfile.noShowReportCount,
    };

    return { profile, activityHistory };
}