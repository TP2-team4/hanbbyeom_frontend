import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import { useSignupForm } from "../model/useSignupForm";
import { EmailVerificationField } from "./EmailVerificationField";
import { PasswordFields } from "./PasswordFields";

type Props = { onSuccess: (accessToken: string) => void };

export function SignupForm({ onSuccess }: Props) {
    const form = useSignupForm({ onSuccess });

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        void form.submit();
    };

    return (
        <form className="flex flex-col gap-4 px-4 pt-5" onSubmit={handleSubmit}>
            <EmailVerificationField
                email={form.email}
                emailIsValid={form.emailIsValid}
                emailError={form.emailError}
                status={form.emailVerificationStatus}
                verificationCode={form.verificationCode}
                verificationError={form.verificationError}
                verificationExpirySeconds={form.verificationExpirySeconds}
                resendCooldownSeconds={form.resendCooldownSeconds}
                temporaryVerificationCode={form.temporaryVerificationCode}
                onEmailChange={form.changeEmail}
                onEmailBlur={form.touchEmail}
                onVerificationCodeChange={form.changeVerificationCode}
                onRequest={() => void form.requestVerificationCode()}
                onVerify={() => void form.confirmVerificationCode()}
            />

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="nickname"
                    className="text-sm font-bold text-body"
                >
                    닉네임
                </label>
                <Input
                    id="nickname"
                    name="nickname"
                    type="text"
                    placeholder="최대 16자로 입력해 주세요."
                    autoComplete="nickname"
                    className="min-w-0"
                    maxLength={16}
                    variant={form.nicknameError ? "error" : "default"}
                    value={form.nickname}
                    onChange={(event) => form.setNickname(event.target.value)}
                    onBlur={form.touchNickname}
                    required
                />
                {form.nicknameError && (
                    <p role="alert" className="text-xs text-error-text">
                        {form.nicknameError}
                    </p>
                )}
            </div>

            <PasswordFields
                password={form.password}
                passwordError={form.passwordError}
                passwordConfirm={form.passwordConfirm}
                isPasswordMatch={form.isPasswordMatch}
                onPasswordChange={form.setPassword}
                onPasswordBlur={form.touchPassword}
                onPasswordConfirmChange={form.setPasswordConfirm}
            />

            <footer className="-mx-4 mt-2 border-t border-divider p-4">
                {form.submitError && (
                    <p role="alert" className="mb-2 text-xs text-error-text">
                        {form.submitError}
                    </p>
                )}
                <Button
                    type="submit"
                    variant="primary"
                    className="h-14 w-full"
                    disabled={!form.isFormValid || form.isSubmitting}
                >
                    {form.isSubmitting ? "가입 중..." : "가입하기"}
                </Button>
            </footer>
        </form>
    );
}
