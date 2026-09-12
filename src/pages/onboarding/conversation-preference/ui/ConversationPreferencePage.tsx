import { useNavigate } from "react-router-dom";
import { ConversationPreferenceForm } from "../../../../features/conversation-preference";

export default function ConversationPreferencePage() {
    const navigate = useNavigate();

    return (
        <main className="mx-auto min-h-full w-full max-w-[430px] bg-secondary-50">
            <section
                className="min-h-full bg-surface"
                aria-labelledby="conversation-preference-title"
            >
                <header className="flex h-16 items-center px-6"></header>
                <ConversationPreferenceForm
                    onSuccess={() => navigate("/home", { replace: true })}
                />
            </section>
        </main>
    );
}
