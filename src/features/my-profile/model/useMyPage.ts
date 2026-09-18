import { useEffect, useState } from "react";
import type { ActivityHistory } from "../../../entities/activity-history";
import type { UserProfile } from "../../../entities/user-profile";
import { getMyPage } from "../api/getMyPage";

export function useMyPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [activityHistory, setActivityHistory] = useState<ActivityHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;
        const loadMyPage = async () => {
            try {
                const response = await getMyPage();
                if (isActive) {
                    setProfile(response.profile);
                    setActivityHistory(response.activityHistory);
                }
            } catch (error) {
                if (isActive) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : "마이페이지를 불러오지 못했어요.",
                    );
                }
            } finally {
                if (isActive) setIsLoading(false);
            }
        };
        void loadMyPage();
        return () => { isActive = false; };
    }, []);

    return { profile, activityHistory, isLoading, error };
}
