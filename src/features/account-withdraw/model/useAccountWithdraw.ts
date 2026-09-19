import { useState } from "react";
import { withdrawAccount } from "../api/withdrawAccount";

type Options = { onSuccess: () => void };

export function useAccountWithdraw({ onSuccess }: Options) {
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        if (!password || isSubmitting) return;
        setIsSubmitting(true);
        setError(null);
        try {
            await withdrawAccount(password);
            onSuccess();
        } catch (e) {
            setError(
                e instanceof Error
                    ? e.message
                    : "회원 탈퇴에 실패했어요. 다시 시도해 주세요.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return { password, setPassword, isSubmitting, error, submit };
}