import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

type Props = {
    required: boolean;
};

export function OnboardingRoute({ required }: Props) {
    const { isOnboardingRequired } = useAuth();

    if (required !== isOnboardingRequired) {
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
