import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../app/provider/AuthProvider";
import { ConversationPreferenceForm } from "../../../../features/conversation-preference";

export default function ConversationPreferencePage() {
    const navigate = useNavigate();
    const { completeOnboarding } = useAuth();

    const handleSuccess = () => {
        completeOnboarding();
        navigate("/home", { replace: true });
    };

    return (
        <main className="mx-auto min-h-full w-full max-w-[430px] bg-secondary-50">
            <section
                className="min-h-full bg-surface"
                aria-labelledby="conversation-preference-title"
            >
                <header className="flex h-16 items-center px-6"></header>
                <ConversationPreferenceForm onSuccess={handleSuccess} />
            </section>
        </main>
    );
}
