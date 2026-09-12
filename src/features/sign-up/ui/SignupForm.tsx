import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import { useSignupForm } from "../model/useSignupForm";
import { EmailVerificationField } from "./EmailVerificationField";
import { PasswordFields } from "./PasswordFields";

type Props = { onSuccess: () => void };

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
                status={form.emailVerificationStatus}
                verificationCode={form.verificationCode}
                verificationError={form.verificationError}
                temporaryVerificationCode={form.temporaryVerificationCode}
                onEmailChange={form.changeEmail}
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
                    autoComplete="nickname"
                    className="min-w-0"
                    value={form.nickname}
                    onChange={(event) => form.setNickname(event.target.value)}
                    required
                />
            </div>

            <PasswordFields
                password={form.password}
                passwordConfirm={form.passwordConfirm}
                isPasswordMatch={form.isPasswordMatch}
                onPasswordChange={form.setPassword}
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
