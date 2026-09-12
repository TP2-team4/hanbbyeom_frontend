import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export function PublicOnlyRoute() {
    const { isAuthenticated, isOnboardingRequired } = useAuth();

    if (isAuthenticated) {
        return (
            <Navigate
                to={
                    isOnboardingRequired
                        ? "/onboarding/conversation-preference"
                        : "/home"
                }
                replace
            />
        );
    }

    return <Outlet />;
}
