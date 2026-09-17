import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import { ErrorText } from "../../../shared/ui/error-text";
import type { EmailVerificationStatus } from "../model/types";

type Props = {
    email: string;
    emailIsValid: boolean;
    emailError: string | null;
    status: EmailVerificationStatus;
    verificationCode: string;
    verificationError: string | null;
    verificationExpirySeconds: number;
    resendCooldownSeconds: number;
    temporaryVerificationCode: string;
    onEmailChange: (value: string) => void;
    onEmailBlur: () => void;
    onVerificationCodeChange: (value: string) => void;
    onRequest: () => void;
    onVerify: () => void;
};

export function EmailVerificationField({
    email,
    emailIsValid,
    emailError,
    status,
    verificationCode,
    verificationError,
    verificationExpirySeconds,
    resendCooldownSeconds,
    temporaryVerificationCode,
    onEmailChange,
    onEmailBlur,
    onVerificationCodeChange,
    onRequest,
    onVerify,
}: Props) {
    const showsCode =
        status === "sent" ||
        status === "verifying" ||
        status === "verified" ||
        (status === "requesting" && verificationExpirySeconds > 0);
    // 인증 번호 만료 안내 및 타이머 표시 추가
    const isExpired =
        showsCode && status !== "verified" && verificationExpirySeconds === 0;
    const visibleVerificationError = isExpired
        ? "인증 코드가 만료되었습니다. 재전송 버튼을 눌러주세요"
        : verificationError;

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold text-body">
                이메일
            </label>
            <div className="flex gap-2">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="이메일을 입력해 주세요"
                    autoComplete="email"
                    className="min-w-0 flex-1 bg-gray-50"
                    maxLength={255}
                    variant={emailError ? "error" : "default"}
                    value={email}
                    onChange={(event) => onEmailChange(event.target.value)}
                    onBlur={onEmailBlur}
                    required
                />
                <Button
                    type="button"
                    variant="secondary"
                    className="h-14 shrink-0 px-4"
                    disabled={!emailIsValid || status === "requesting"}
                    onClick={onRequest}
                >
                    {status === "requesting"
                        ? "요청 중"
                        : showsCode
                          ? "재요청"
                          : "인증요청"}
                </Button>
            </div>
            {emailError && (
                <ErrorText className="text-xs">{emailError}</ErrorText>
            )}

            {showsCode && (
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <div className="relative min-w-0 flex-1">
                            <Input
                                id="email-verification-code"
                                name="emailVerificationCode"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                placeholder="인증번호 6자리"
                                className="min-w-0 pr-16"
                                maxLength={6}
                                value={verificationCode}
                                disabled={
                                    status === "verified" ||
                                    status === "verifying"
                                }
                                onChange={(event) =>
                                    onVerificationCodeChange(event.target.value)
                                }
                            />
                            {status !== "verified" && (
                                <span
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${isExpired ? "text-error-text" : "text-body"}`}
                                >
                                    {isExpired
                                        ? "만료됨"
                                        : formatTime(verificationExpirySeconds)}
                                </span>
                            )}
                        </div>
                        <Button
                            type="button"
                            variant="secondary"
                            className="h-14 shrink-0 px-4"
                            disabled={
                                verificationCode.length !== 6 ||
                                status === "verified" ||
                                status === "verifying"
                            }
                            onClick={onVerify}
                        >
                            {status === "verified"
                                ? "인증완료"
                                : status === "verifying"
                                  ? "확인 중"
                                  : "확인"}
                        </Button>
                    </div>
                    {resendCooldownSeconds > 0 && (
                        <p className="text-xs text-body">
                            재요청 가능 {formatTime(resendCooldownSeconds)}
                        </p>
                    )}
                </div>
            )}

            {status === "sent" && !visibleVerificationError && (
                <p className="text-xs text-body">
                    임시 인증번호는 {temporaryVerificationCode}입니다.
                </p>
            )}
            {status === "verified" && (
                <p className="text-xs text-body">이메일 인증이 완료됐어요.</p>
            )}
            {visibleVerificationError && (
                <ErrorText className="text-xs">
                    {visibleVerificationError}
                </ErrorText>
            )}
            {status === "error" && !visibleVerificationError && (
                <ErrorText className="text-xs">
                    인증번호 요청에 실패했어요. 다시 시도해 주세요.
                </ErrorText>
            )}
        </div>
    );
}

function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
