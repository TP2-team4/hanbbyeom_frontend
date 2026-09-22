import {useEffect, useState} from "react";
import {
    EmailVerificationError,
    requestEmailVerification,
    verifyEmail,
} from "../api/emailVerification";
import {signup} from "../api/signup";
import type {ConversationPreference} from "../../conversation-preference/model/types";
import type {EmailVerificationStatus} from "./types";
import {
    getNicknameError,
    isPasswordTooManyBytes,
    isValidEmail,
    isValidNickname,
    isValidPassword,
} from "../../../shared/lib/validation";

type SignupStep = "form" | "talkLevel";

type UseSignupFormOptions = { onSuccess: () => void };

// 회원가입 폼의 입력값, 유효성 검사, 이메일 인증 및 제출 상태를 관리하는 훅
export function useSignupForm({onSuccess}: UseSignupFormOptions) {
    const [step, setStep] = useState<SignupStep>("form");
    const [defaultTalkLevel, setDefaultTalkLevel] =
        useState<ConversationPreference>("SILENT");
    const [email, setEmail] = useState(""); //email input
    const [emailVerificationStatus, setEmailVerificationStatus] =
        useState<EmailVerificationStatus>("idle"); //email input state
    const [verificationCode, setVerificationCode] = useState(""); // email verification code input
    const [verificationError, setVerificationError] = useState<string | null>(
        null,
    ); // email code error message
    // 인증 번호 유효시간과 재전송 대기시간 추가
    const [verificationExpiresAt, setVerificationExpiresAt] = useState<
        number | null
    >(null);
    const [resendAvailableAt, setResendAvailableAt] = useState<number | null>(
        null,
    );
    const [currentTime, setCurrentTime] = useState(() => Date.now());
    const [nickname, setNickname] = useState(""); //nick name input
    const [password, setPassword] = useState(""); //password input
    const [passwordConfirm, setPasswordConfirm] = useState(""); //password 2 input
    const [isSubmitting, setIsSubmitting] = useState(false); //submit state
    const [submitError, setSubmitError] = useState<string | null>(null); //submit error message
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [nicknameTouched, setNicknameTouched] = useState(false);

    const emailIsValid = isValidEmail(email);
    const isPasswordMatch =
        passwordConfirm.length > 0 && passwordConfirm === password;
    const isFormValid =
        emailIsValid &&
        emailVerificationStatus === "verified" &&
        isValidNickname(nickname) &&
        isValidPassword(password) &&
        isPasswordMatch;

    const verificationExpirySeconds = verificationExpiresAt
        ? Math.max(0, Math.ceil((verificationExpiresAt - currentTime) / 1000))
        : 0;
    const resendCooldownSeconds = resendAvailableAt
        ? Math.max(0, Math.ceil((resendAvailableAt - currentTime) / 1000))
        : 0;

    // 인증 번호와 재전송 카운트다운 갱신 추가
    useEffect(() => {
        if (!verificationExpiresAt && !resendAvailableAt) return;
        const timerId = window.setInterval(
            () => setCurrentTime(Date.now()),
            1000,
        );
        return () => window.clearInterval(timerId);
    }, [resendAvailableAt, verificationExpiresAt]);

    const emailError = !emailTouched
        ? null
        : email.trim().length === 0
            ? "이메일을 입력해주세요."
            : !emailIsValid
                ? "올바른 이메일 형식으로 입력해주세요."
                : null;

    const passwordError = !passwordTouched
        ? null
        : password.length === 0
            ? "비밀번호를 입력해주세요."
            : isPasswordTooManyBytes(password)
                ? "비밀번호가 너무 길어요. 조금 더 짧게 입력해주세요."
                : !isValidPassword(password)
                    ? "비밀번호는 8자 이상 입력해주세요."
                    : null;

    const nicknameError = nicknameTouched ? getNicknameError(nickname) : null;

    // 이메일 값을 변경하고 기존에 진행한 이메일 인증 상태를 초기화하는 함수
    const changeEmail = (value: string) => {
        setEmail(value);
        setEmailVerificationStatus("idle");
        setVerificationCode("");
        setVerificationError(null);
        setVerificationExpiresAt(null);
        setResendAvailableAt(null);
    };

    const touchEmail = () => setEmailTouched(true);
    const touchPassword = () => setPasswordTouched(true);
    const touchNickname = () => setNicknameTouched(true);

    // 인증번호에서 숫자가 아닌 문자를 제거하고 이전 인증 오류를 초기화하는 함수
    const changeVerificationCode = (value: string) => {
        setVerificationCode(value.replace(/\D/g, ""));
        setVerificationError(
            verificationExpiresAt && Date.now() >= verificationExpiresAt
                ? "인증 코드가 만료되었습니다. 재전송 버튼을 눌러주세요"
                : null,
        );
    };

    // 입력한 이메일로 인증번호를 요청하고 요청 진행 상태를 관리하는 함수
    const requestVerificationCode = async () => {
        if (!emailIsValid || emailVerificationStatus === "requesting") return;
        setEmailVerificationStatus("requesting");
        setVerificationCode("");
        setVerificationError(null);

        try {
            const response = await requestEmailVerification(email);
            setVerificationExpiresAt(response.expiresAt);
            setResendAvailableAt(response.resendAvailableAt);
            setCurrentTime(Date.now());
            setEmailVerificationStatus("sent");
        } catch (error) {
            setVerificationError(getVerificationErrorMessage(error));
            setEmailVerificationStatus(
                emailVerificationStatus === "sent" ||
                emailVerificationStatus === "verified"
                    ? emailVerificationStatus
                    : "error",
            );
        }
    };

    // 사용자가 입력한 6자리 인증번호를 확인하고 이메일 인증 결과를 저장하는 함수
    const confirmVerificationCode = async () => {
        if (verificationCode.length !== 6) return;
        setEmailVerificationStatus("verifying");
        setVerificationError(null);

        try {
            const response = await verifyEmail(email, verificationCode);
            if (response.verified) {
                setEmailVerificationStatus("verified");
                return;
            }
        } catch (error) {
            setEmailVerificationStatus("sent");
            setVerificationError(getVerificationErrorMessage(error));
        }
    };

    // 기본 정보 입력이 끝나면 대화 수준 선택 단계로 넘어가는 함수 (아직 회원가입 API 호출 전)
    const goToTalkLevelStep = () => {
        if (!isFormValid) return;
        setStep("talkLevel");
    };

    // 대화 수준 선택 단계에서 기본 정보 입력 단계로 되돌아가는 함수
    const goBackToForm = () => {
        setStep("form");
    };

    // 대화 수준까지 선택된 상태에서 회원가입 API를 호출하고 성공 시 onSuccess를 실행하는 함수
    const submit = async () => {
        if (!isFormValid || isSubmitting) return;
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await signup({email, nickname, password, defaultTalkLevel});
            onSuccess();
        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "회원가입에 실패했어요. 다시 시도해 주세요.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        step,
        defaultTalkLevel,
        email,
        emailIsValid,
        emailError,
        emailVerificationStatus,
        verificationCode,
        verificationError,
        verificationExpirySeconds,
        resendCooldownSeconds,
        nickname,
        nicknameError,
        password,
        passwordError,
        passwordConfirm,
        isPasswordMatch,
        isFormValid,
        isSubmitting,
        submitError,
        selectTalkLevel: setDefaultTalkLevel,
        changeEmail,
        changeVerificationCode,
        setNickname,
        setPassword,
        setPasswordConfirm,
        requestVerificationCode,
        confirmVerificationCode,
        touchEmail,
        touchPassword,
        touchNickname,
        goToTalkLevelStep,
        goBackToForm,
        submit,
    };
}

function getVerificationErrorMessage(error: unknown) {
    return error instanceof EmailVerificationError
        ? error.message
        : "인증번호 처리에 실패했어요. 다시 시도해 주세요.";
}
