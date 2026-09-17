import { useNavigate } from "react-router-dom";
import { usePasswordReset } from "../../../features/password-reset/model/usePasswordReset";
import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import { ErrorText } from "../../../shared/ui/error-text";
import icComplete from "../../../shared/assets/images/ic_complete.png";
export default function PasswordResetPage() {
    const navigate = useNavigate();
    const form = usePasswordReset();
    const codeWasSent =
        form.verificationStatus === "sent" ||
        form.verificationStatus === "verifying";

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        void form.submitNewPassword();
    };

    return (
        <main className="mx-auto min-h-full w-full max-w-[430px] bg-secondary-50">
            <section
                className="min-h-full bg-surface"
                aria-labelledby="password-reset-title"
            >
                <header className="flex h-16 items-center gap-3 px-4">
                    {form.step !== "complete" && (
                        <button
                            type="button"
                            aria-label="이전 화면으로 이동"
                            onClick={() => navigate(-1)}
                            className="grid size-10 place-items-center text-2xl text-title"
                        >
                            ←
                        </button>
                    )}
                    <h1
                        id="password-reset-title"
                        className="text-lg font-bold text-title"
                    >
                        비밀번호 찾기
                    </h1>
                </header>

                {form.step === "verify-email" && (
                    <div className="flex flex-col gap-4 px-4 pt-5">
                        <div>
                            <h2 className="text-xl font-bold text-title">
                                이메일을 인증해 주세요
                            </h2>
                            <p className="mt-2 text-sm text-body">
                                가입한 이메일로 인증번호를 보내드려요.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="reset-email"
                                className="text-sm font-bold text-body"
                            >
                                이메일
                            </label>
                            <div className="flex gap-2">
                                <Input
                                    id="reset-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="이메일을 입력해 주세요"
                                    className="min-w-0 flex-1"
                                    value={form.email}
                                    onChange={(event) =>
                                        form.changeEmail(event.target.value)
                                    }
                                    required
                                />
                                <Button
                                    variant="secondary"
                                    className="h-14 shrink-0 px-4"
                                    disabled={
                                        !form.emailIsValid ||
                                        form.verificationStatus === "requesting"
                                    }
                                    onClick={() => void form.requestCode()}
                                >
                                    {form.verificationStatus === "requesting"
                                        ? "요청 중"
                                        : codeWasSent
                                          ? "재요청"
                                          : "인증요청"}
                                </Button>
                            </div>
                        </div>
                        {codeWasSent && (
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="reset-code"
                                    className="text-sm font-bold text-body"
                                >
                                    인증번호
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        id="reset-code"
                                        name="verificationCode"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        placeholder="인증번호 6자리"
                                        className="min-w-0 flex-1"
                                        maxLength={6}
                                        value={form.verificationCode}
                                        disabled={
                                            form.verificationStatus ===
                                            "verifying"
                                        }
                                        onChange={(event) =>
                                            form.changeVerificationCode(
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <Button
                                        variant="secondary"
                                        className="h-14 shrink-0 px-4"
                                        disabled={
                                            form.verificationCode.length !==
                                                6 ||
                                            form.verificationStatus ===
                                                "verifying"
                                        }
                                        onClick={() => void form.verifyCode()}
                                    >
                                        {form.verificationStatus === "verifying"
                                            ? "확인 중"
                                            : "확인"}
                                    </Button>
                                </div>
                                {!form.verificationError && (
                                    <p className="text-xs text-body">
                                        임시 인증번호는{" "}
                                        {form.temporaryVerificationCode}입니다.
                                    </p>
                                )}
                            </div>
                        )}
                        {form.verificationError && (
                            <ErrorText className="text-xs">
                                {form.verificationError}
                            </ErrorText>
                        )}
                    </div>
                )}

                {form.step === "reset-password" && (
                    <form
                        className="flex flex-col gap-4 px-4 pt-5"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <h2 className="text-xl font-bold text-title">
                                새 비밀번호를 입력해 주세요
                            </h2>
                            <p className="mt-2 text-sm text-body">
                                8자 이상 입력해 주세요.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="new-password"
                                className="text-sm font-bold text-body"
                            >
                                새 비밀번호
                            </label>
                            <Input
                                id="new-password"
                                name="newPassword"
                                type="password"
                                placeholder="8자 이상 입력해 주세요."
                                autoComplete="new-password"
                                minLength={8}
                                value={form.password}
                                onChange={(event) =>
                                    form.setPassword(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="new-password-confirm"
                                className="text-sm font-bold text-body"
                            >
                                새 비밀번호 확인
                            </label>
                            <Input
                                id="new-password-confirm"
                                name="newPasswordConfirm"
                                type="password"
                                placeholder="다시 한번 입력해 주세요."
                                autoComplete="new-password"
                                variant={
                                    form.passwordConfirm.length > 0 &&
                                    !form.isPasswordMatch
                                        ? "error"
                                        : "default"
                                }
                                aria-invalid={
                                    form.passwordConfirm.length > 0 &&
                                    !form.isPasswordMatch
                                }
                                value={form.passwordConfirm}
                                onChange={(event) =>
                                    form.setPasswordConfirm(event.target.value)
                                }
                                required
                            />
                            {form.passwordConfirm.length > 0 && (
                                <p
                                    role={
                                        !form.isPasswordMatch
                                            ? "alert"
                                            : undefined
                                    }
                                    className={`text-xs ${form.isPasswordMatch ? "text-body" : "text-error-text"}`}
                                >
                                    {form.isPasswordMatch
                                        ? "비밀번호가 일치해요."
                                        : "비밀번호가 일치하지 않아요."}
                                </p>
                            )}
                        </div>
                        {form.submitError && (
                            <ErrorText className="text-xs">
                                {form.submitError}
                            </ErrorText>
                        )}
                        <Button
                            type="submit"
                            className="mt-2 h-14 w-full"
                            disabled={
                                !form.canResetPassword || form.isSubmitting
                            }
                        >
                            {form.isSubmitting ? "변경 중..." : "비밀번호 변경"}
                        </Button>
                    </form>
                )}

                {form.step === "complete" && (
                    <div className="flex min-h-[calc(100dvh-4rem)] flex-col px-4 pb-4 text-center">
                        <div className="flex flex-1 flex-col items-center justify-center">
                            <img
                                src={icComplete}
                                alt=""
                                className="mb-6 size-20 object-contain"
                            />
                            <h2 className="text-2xl font-bold text-title">
                                비밀번호를 변경했어요
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-body">
                                변경한 비밀번호로 다시 로그인해 주세요.
                            </p>
                        </div>
                        <Button
                            className="h-14 w-full"
                            onClick={() =>
                                navigate("/user/login", { replace: true })
                            }
                        >
                            로그인하기
                        </Button>
                    </div>
                )}
            </section>
        </main>
    );
}
