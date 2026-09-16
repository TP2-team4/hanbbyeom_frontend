import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import { useAuth } from "../../../app/provider/AuthProvider";
import { requestLogin } from "../../../features/login";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlerLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        const formData = new FormData(e.currentTarget);
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await requestLogin({
                email: String(formData.get("email")),
                password: String(formData.get("password")),
            });
            login(response.accessToken);
            navigate("/home", { replace: true });
        } catch {
            setError("이메일 또는 비밀번호가 일치하지 않아요.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <main className="mx-auto h-full w-full max-w-[430px] bg-secondary-50">
            {/* <h1 className="">01 로그인 / 회원가입</h1> */}

            <section className="mx-auto flex h-full w-full flex-col bg-surface px-6 py-8">
                <div className="flex w-full flex-1 flex-col justify-center">
                    <header className="mb-14 flex flex-col items-center text-center">
                        <h2
                            id="login-title"
                            className="text-5xl font-bold tracking-tight text-title font-jejudoldam"
                        >
                            한뼘
                        </h2>
                        <p className="mt-2 text-base font-medium text-body ">
                            필요한 활동만, 조용히 함께
                        </p>
                    </header>

                    <form
                        className="flex w-full flex-col items-center gap-5"
                        onSubmit={handlerLogin}
                    >
                        <div className="flex flex-col gap-2  w-full">
                            <label
                                htmlFor="email"
                                className="text-sm font-bold text-body"
                            >
                                이메일
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="이메일을 입력해 주세요"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2  w-full">
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
                                autoComplete="current-password"
                                placeholder="8자 이상 입력해 주세요"
                                minLength={8}
                                required
                            />
                        </div>

                        {error && (
                            <p role="alert" className="w-full text-sm text-error-text">
                                {error}
                            </p>
                        )}

                        <div className="mt-2 flex w-full flex-col gap-3">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isSubmitting}
                                className="h-14 w-full"
                            >
                                {isSubmitting ? "로그인 중…" : "로그인"}
                            </Button>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate("/user/signup")}
                                className="h-14 w-full"
                            >
                                회원가입
                            </Button>
                        </div>
                    </form>

                    <nav
                        aria-label="로그인 도움말"
                        className="flex items-center justify-center gap-5 pt-6 text-sm font-medium text-body"
                    >
                        <a href="/user/password/reset" className="">
                            비밀번호 찾기
                        </a>
                        {/* <span
                            aria-hidden="true"
                            className="h-4 w-px bg-gray-300"
                        />
                        <a href="/terms" className="">
                            이용약관
                        </a> */}
                    </nav>
                </div>

                <p className="mt-auto pt-12 text-center text-xs leading-5 text-body">
                    한뼘은 필요한 활동만, 딱 한 뼘의 거리에서 함께합니다.
                </p>
            </section>
        </main>
    );
}
