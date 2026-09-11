import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import type { EmailVerificationStatus } from "../model/types";

type Props = {
    email: string;
    emailIsValid: boolean;
    status: EmailVerificationStatus;
    verificationCode: string;
    verificationError: string | null;
    temporaryVerificationCode: string;
    onEmailChange: (value: string) => void;
    onVerificationCodeChange: (value: string) => void;
    onRequest: () => void;
    onVerify: () => void;
};

export function EmailVerificationField({
    email,
    emailIsValid,
    status,
    verificationCode,
    verificationError,
    temporaryVerificationCode,
    onEmailChange,
    onVerificationCodeChange,
    onRequest,
    onVerify,
}: Props) {
    const showsCode =
        status === "sent" || status === "verifying" || status === "verified";

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
                    value={email}
                    onChange={(event) => onEmailChange(event.target.value)}
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

            {showsCode && (
                <div className="flex gap-2">
                    <Input
                        id="email-verification-code"
                        name="emailVerificationCode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        placeholder="인증번호 6자리"
                        className="min-w-0 flex-1"
                        maxLength={6}
                        value={verificationCode}
                        disabled={
                            status === "verified" || status === "verifying"
                        }
                        onChange={(event) =>
                            onVerificationCodeChange(event.target.value)
                        }
                    />
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
            )}

            {status === "sent" && !verificationError && (
                <p className="text-xs text-body">
                    임시 인증번호는 {temporaryVerificationCode}입니다.
                </p>
            )}
            {status === "verified" && (
                <p className="text-xs text-body">이메일 인증이 완료됐어요.</p>
            )}
            {verificationError && (
                <p role="alert" className="text-xs text-error-text">
                    {verificationError}
                </p>
            )}
            {status === "error" && (
                <p role="alert" className="text-xs text-error-text">
                    인증번호 요청에 실패했어요. 다시 시도해 주세요.
                </p>
            )}
        </div>
    );
}
