import Input from "../../../shared/ui/input";

type Props = {
    password: string;
    passwordConfirm: string;
    isPasswordMatch: boolean;
    onPasswordChange: (value: string) => void;
    onPasswordConfirmChange: (value: string) => void;
};

export function PasswordFields({
    password,
    passwordConfirm,
    isPasswordMatch,
    onPasswordChange,
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
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={password}
                    onChange={(event) => onPasswordChange(event.target.value)}
                />
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
                        <p
                            id="password-confirm-error"
                            role="alert"
                            className="text-xs text-error-text"
                        >
                            비밀번호가 일치하지 않아요.
                        </p>
                    ))}
            </div>
        </>
    );
}
