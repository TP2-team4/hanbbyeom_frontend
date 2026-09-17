import { useState } from "react";
import { saveConversationPreference } from "../api/saveConversationPreference";
import type { ConversationPreference } from "./types";

type Options = {
    onSuccess: (preference: ConversationPreference) => void;
    initialPreference?: ConversationPreference;
};

export function useConversationPreference({
    onSuccess,
    initialPreference,
}: Options) {
    const [selectedPreference, setSelectedPreference] =
        useState<ConversationPreference>(initialPreference ?? "SILENT");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const submit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await saveConversationPreference(selectedPreference);
            onSuccess(selectedPreference);
        } catch {
            setSubmitError("대화 수준 저장에 실패했어요. 다시 시도해 주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        selectedPreference,
        isSubmitting,
        submitError,
        selectPreference: setSelectedPreference,
        submit,
    };
}
