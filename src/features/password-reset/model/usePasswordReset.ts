import { useEffect, useState } from "react";
import { isValidEmail, isValidPassword } from "../../../shared/lib/validation";
import {
    PasswordResetError,
    requestPasswordResetCode,
    resetPassword,
    verifyPasswordResetCode,
} from "../api/passwordReset";

type Step = "verify-email" | "reset-password" | "complete";
type VerificationStatus =
    | "idle"
    | "requesting"
    | "sent"
    | "verifying"
    | "verified"
    | "error";

export function usePasswordReset() {
    const [step, setStep] = useState<Step>("verify-email");
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationStatus, setVerificationStatus] =
        useState<VerificationStatus>("idle");
    const [verificationError, setVerificationError] = useState<string | null>(null);
    // 인증 번호 유효시간과 재전송 대기시간 (회원가입과 동일한 카운트다운 로직)
    const [verificationExpiresAt, setVerificationExpiresAt] = useState<
        number | null
    >(null);
    const [resendAvailableAt, setResendAvailableAt] = useState<number | null>(
        null,
    );
    const [currentTime, setCurrentTime] = useState(() => Date.now());
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const emailIsValid = isValidEmail(email);
    const passwordIsValid = isValidPassword(password);
    const isPasswordMatch =
        passwordConfirm.length > 0 && password === passwordConfirm;
    const canResetPassword = passwordIsValid && isPasswordMatch;

    const verificationExpirySeconds = verificationExpiresAt
        ? Math.max(0, Math.ceil((verificationExpiresAt - currentTime) / 1000))
        : 0;
    const resendCooldownSeconds = resendAvailableAt
        ? Math.max(0, Math.ceil((resendAvailableAt - currentTime) / 1000))
        : 0;

    // 인증 번호와 재전송 카운트다운 갱신 (1초마다)
    useEffect(() => {
        if (!verificationExpiresAt && !resendAvailableAt) return;
        const timerId = window.setInterval(
            () => setCurrentTime(Date.now()),
            1000,
        );
        return () => window.clearInterval(timerId);
    }, [resendAvailableAt, verificationExpiresAt]);

    const changeEmail = (value: string) => {
        setEmail(value);
        setVerificationCode("");
        setVerificationStatus("idle");
        setVerificationError(null);
        setVerificationExpiresAt(null);
        setResendAvailableAt(null);
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
            const response = await requestPasswordResetCode(email);
            setVerificationExpiresAt(response.expiresAt);
            setResendAvailableAt(response.resendAvailableAt);
            setCurrentTime(Date.now());
            setVerificationStatus("sent");
        } catch (error) {
            setVerificationError(
                error instanceof PasswordResetError
                    ? error.message
                    : "인증번호 요청에 실패했어요. 다시 시도해 주세요.",
            );
            setVerificationStatus(
                verificationStatus === "sent" ||
                    verificationStatus === "verified"
                    ? verificationStatus
                    : "error",
            );
        }
    };

    const verifyCode = async () => {
        if (verificationCode.length !== 6 || verificationStatus === "verifying") return;
        setVerificationStatus("verifying");
        setVerificationError(null);

        try {
            const response = await verifyPasswordResetCode(email, verificationCode);
            if (response.verified) {
                setVerificationStatus("verified");
                setStep("reset-password");
                return;
            }
        } catch (error) {
            setVerificationStatus("sent");
            setVerificationError(
                error instanceof PasswordResetError
                    ? error.message
                    : "인증번호 확인에 실패했어요. 다시 시도해 주세요.",
            );
        }
    };

    const submitNewPassword = async () => {
        if (!canResetPassword || isSubmitting) return;
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await resetPassword(email, verificationCode, password);
            setStep("complete");
        } catch (e) {
            setSubmitError(
                e instanceof Error
                    ? e.message
                    : "비밀번호 변경에 실패했어요. 다시 시도해 주세요.",
            );
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
        verificationExpirySeconds,
        resendCooldownSeconds,
        password,
        passwordConfirm,
        isPasswordMatch,
        canResetPassword,
        isSubmitting,
        submitError,
        changeEmail,
        changeVerificationCode,
        setPassword,
        setPasswordConfirm,
        requestCode,
        verifyCode,
        submitNewPassword,
    };
}
