import { useState } from "react";
import { isValidEmail, isValidPassword } from "../../../shared/lib/validation";
import {
    requestPasswordResetCode,
    resetPassword,
    TEMP_PASSWORD_RESET_CODE,
    verifyPasswordResetCode,
} from "../api/passwordReset";

type Step = "verify-email" | "reset-password" | "complete";
type VerificationStatus = "idle" | "requesting" | "sent" | "verifying";

export function usePasswordReset() {
    const [step, setStep] = useState<Step>("verify-email");
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationStatus, setVerificationStatus] =
        useState<VerificationStatus>("idle");
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const emailIsValid = isValidEmail(email);
    const passwordIsValid = isValidPassword(password);
    const isPasswordMatch =
        passwordConfirm.length > 0 && password === passwordConfirm;
    const canResetPassword = passwordIsValid && isPasswordMatch;

    const changeEmail = (value: string) => {
        setEmail(value);
        setVerificationCode("");
        setVerificationStatus("idle");
        setVerificationError(null);
    };

    const changeVerificationCode = (value: string) => {
        setVerificationCode(value.replace(/\D/g, ""));
        setVerificationError(null);
    };

    const requestCode = async () => {
        if (!emailIsValid || verificationStatus === "requesting") return;
        setVerificationStatus("requesting");
        setVerificationCode("");
        setVerificationError(null);

        try {
            await requestPasswordResetCode(email);
            setVerificationStatus("sent");
        } catch {
            setVerificationStatus("idle");
            setVerificationError("인증번호 요청에 실패했어요. 다시 시도해 주세요.");
        }
    };

    const verifyCode = async () => {
        if (verificationCode.length !== 6 || verificationStatus === "verifying") return;
        setVerificationStatus("verifying");
        setVerificationError(null);

        try {
            const response = await verifyPasswordResetCode(email, verificationCode);
            if (response.verified) {
                setStep("reset-password");
                return;
            }
            setVerificationStatus("sent");
            setVerificationError("인증번호가 올바르지 않아요.");
        } catch {
            setVerificationStatus("sent");
            setVerificationError("인증번호 확인에 실패했어요. 다시 시도해 주세요.");
        }
    };

    const submitNewPassword = async () => {
        if (!canResetPassword || isSubmitting) return;
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await resetPassword(email, password);
            setStep("complete");
        } catch {
            setSubmitError("비밀번호 변경에 실패했어요. 다시 시도해 주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        step,
        email,
        emailIsValid,
        verificationCode,
        verificationStatus,
        verificationError,
        password,
        passwordConfirm,
        isPasswordMatch,
        canResetPassword,
        isSubmitting,
        submitError,
        temporaryVerificationCode: TEMP_PASSWORD_RESET_CODE,
        changeEmail,
        changeVerificationCode,
        setPassword,
        setPasswordConfirm,
        requestCode,
        verifyCode,
        submitNewPassword,
    };
}
