import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import { ErrorText } from "../../../shared/ui/error-text";
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
                email={form.email} // 이메일 입력창에 보여줄 현재 값
                emailIsValid={form.emailIsValid} // 이메일 형식이 올바른지 (인증번호 요청 버튼 활성화 여부에 씀)
                emailError={form.emailError} // 이메일 입력창 아래에 보여줄 에러 문구 (비었음/형식 틀림)
                status={form.emailVerificationStatus} // 인증 진행 상태: idle/requesting/sent/verifying/verified/error
                verificationCode={form.verificationCode} // 인증번호 입력창에 보여줄 현재 값 (6자리 숫자)
                verificationError={form.verificationError} // 인증번호 관련 에러 문구 (만료/불일치/횟수초과 등)
                verificationExpirySeconds={form.verificationExpirySeconds} // 인증번호 만료까지 남은 초 (카운트다운 표시용)
                resendCooldownSeconds={form.resendCooldownSeconds} // 재전송 버튼 다시 누를 수 있을 때까지 남은 초
                temporaryVerificationCode={form.temporaryVerificationCode} // 개발용 임시 인증번호(테스트 편의용, 실서비스 땐 제거 대상)
                onEmailChange={form.changeEmail} // 이메일 입력값 바뀔 때 호출 (기존 인증 상태 초기화까지 같이 함)
                onEmailBlur={form.touchEmail} // 이메일 입력창에서 포커스 벗어날 때 호출 (그때부터 에러 문구 노출 시작)
                onVerificationCodeChange={form.changeVerificationCode} // 인증번호 입력값 바뀔 때 호출
                onRequest={() => void form.requestVerificationCode()} // "인증번호 요청/재전송" 버튼 클릭 시 → 서버에 인증번호 발송 요청
                onVerify={() => void form.confirmVerificationCode()} // "확인" 버튼 클릭 시 → 입력한 인증번호가 맞는지 서버에 확인 요청
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
                    <ErrorText className="text-xs">
                        {form.nicknameError}
                    </ErrorText>
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
                    <ErrorText className="mb-2 text-xs">
                        {form.submitError}
                    </ErrorText>
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
