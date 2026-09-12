import { useState } from "react";
import {
    requestEmailVerification,
    TEMP_VERIFICATION_CODE,
    verifyEmail,
} from "../api/emailVerification";
import { signup } from "../api/signup";
import type { EmailVerificationStatus } from "./types";
import {
    isValidEmail,
    isValidPassword,
} from "../../../shared/lib/validation";

type UseSignupFormOptions = { onSuccess: () => void };

// 회원가입 폼의 입력값, 유효성 검사, 이메일 인증 및 제출 상태를 관리하는 훅
export function useSignupForm({ onSuccess }: UseSignupFormOptions) {
    const [email, setEmail] = useState(""); //email input
    const [emailVerificationStatus, setEmailVerificationStatus] =
        useState<EmailVerificationStatus>("idle"); //email input state
    const [verificationCode, setVerificationCode] = useState(""); // email verification code input
    const [verificationError, setVerificationError] = useState<string | null>(
        null,
    ); // email code error message
    const [nickname, setNickname] = useState(""); //nick name input
    const [password, setPassword] = useState(""); //password input
    const [passwordConfirm, setPasswordConfirm] = useState(""); //password 2 input
    const [isSubmitting, setIsSubmitting] = useState(false); //submit state
    const [submitError, setSubmitError] = useState<string | null>(null); //submit error message

    const emailIsValid = isValidEmail(email);
    const isPasswordMatch =
        passwordConfirm.length > 0 && passwordConfirm === password;
    const isFormValid =
        emailIsValid &&
        emailVerificationStatus === "verified" &&
        nickname.trim().length > 0 &&
        isValidPassword(password) &&
        isPasswordMatch;

    // 이메일 값을 변경하고 기존에 진행한 이메일 인증 상태를 초기화하는 함수
    const changeEmail = (value: string) => {
        setEmail(value);
        setEmailVerificationStatus("idle");
        setVerificationCode("");
        setVerificationError(null);
    };

    // 인증번호에서 숫자가 아닌 문자를 제거하고 이전 인증 오류를 초기화하는 함수
    const changeVerificationCode = (value: string) => {
        setVerificationCode(value.replace(/\D/g, ""));
        setVerificationError(null);
    };

    // 입력한 이메일로 인증번호를 요청하고 요청 진행 상태를 관리하는 함수
    const requestVerificationCode = async () => {
        if (!emailIsValid || emailVerificationStatus === "requesting") return;
        setEmailVerificationStatus("requesting");
        setVerificationCode("");
        setVerificationError(null);

        try {
            await requestEmailVerification(email);
            setEmailVerificationStatus("sent");
        } catch {
            setEmailVerificationStatus("error");
        }
    };

    // 사용자가 입력한 6자리 인증번호를 확인하고 이메일 인증 결과를 저장하는 함수
    const confirmVerificationCode = async () => {
        if (verificationCode.length !== 6) return;
        setEmailVerificationStatus("verifying");
        setVerificationError(null);

        try {
            const response = await verifyEmail(verificationCode);
            if (response.verified) {
                setEmailVerificationStatus("verified");
                return;
            }
            setEmailVerificationStatus("sent");
            setVerificationError("인증번호가 올바르지 않아요.");
        } catch {
            setEmailVerificationStatus("sent");
            setVerificationError(
                "인증번호 확인에 실패했어요. 다시 시도해 주세요.",
            );
        }
    };

    // 유효한 회원가입 정보를 API에 전달하고 성공 시 onSuccess를 실행하는 함수
    const submit = async () => {
        if (!isFormValid || isSubmitting) return;
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await signup({ email, nickname, password });
            onSuccess();
        } catch {
            setSubmitError("회원가입에 실패했어요. 다시 시도해 주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        email,
        emailIsValid,
        emailVerificationStatus,
        verificationCode,
        verificationError,
        nickname,
        password,
        passwordConfirm,
        isPasswordMatch,
        isFormValid,
        isSubmitting,
        submitError,
        temporaryVerificationCode: TEMP_VERIFICATION_CODE,
        changeEmail,
        changeVerificationCode,
        setNickname,
        setPassword,
        setPasswordConfirm,
        requestVerificationCode,
        confirmVerificationCode,
        submit,
    };
}
