import Input from "../../../shared/ui/input";
import { ErrorText } from "../../../shared/ui/error-text";

type Props = {
    password: string;
    passwordError: string | null;
    passwordConfirm: string;
    isPasswordMatch: boolean;
    onPasswordChange: (value: string) => void;
    onPasswordBlur: () => void;
    onPasswordConfirmChange: (value: string) => void;
};

export function PasswordFields({
    password,
    passwordError,
    passwordConfirm,
    isPasswordMatch,
    onPasswordChange,
    onPasswordBlur,
    onPasswordConfirmChange,
}: Props) {
    return (
        <>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="password"
                    className="text-sm font-bold text-body"
                >
                    비밀번호
                </label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="8자 이상 64자 이하로 입력해주세요."
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={64}
                    variant={passwordError ? "error" : "default"}
                    required
                    value={password}
                    onChange={(event) => onPasswordChange(event.target.value)}
                    onBlur={onPasswordBlur}
                />
                {passwordError && (
                    <ErrorText className="text-xs">{passwordError}</ErrorText>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="password-confirm"
                    className="text-sm font-bold text-body"
                >
                    비밀번호 확인
                </label>
                <Input
                    id="password-confirm"
                    name="passwordConfirm"
                    type="password"
                    placeholder="다시 한번 입력해 주세요."
                    autoComplete="new-password"
                    aria-describedby="password-confirm-error"
                    aria-invalid={
                        passwordConfirm.length > 0 && !isPasswordMatch
                    }
                    variant={
                        passwordConfirm.length > 0 && !isPasswordMatch
                            ? "error"
                            : "default"
                    }
                    required
                    value={passwordConfirm}
                    onChange={(event) =>
                        onPasswordConfirmChange(event.target.value)
                    }
                />
                {passwordConfirm.length > 0 &&
                    (isPasswordMatch ? (
                        <p className="text-xs text-body">
                            비밀번호가 일치해요.
                        </p>
                    ) : (
                        <ErrorText
                            id="password-confirm-error"
                            className="text-xs"
                        >
                            비밀번호가 일치하지 않아요.
                        </ErrorText>
                    ))}
            </div>
        </>
    );
}
