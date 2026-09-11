import { useNavigate } from "react-router-dom";
import { SignupForm } from "../../../features/sign-up";

export default function SignupPage() {
    const navigate = useNavigate();

    return (
        <main className="mx-auto min-h-full w-full max-w-[430px] bg-secondary-50">
            <section
                aria-labelledby="signup-title"
                className="overflow-hidden bg-surface"
            >
                <header className="flex h-16 items-center gap-3 px-4">
                    <button
                        type="button"
                        aria-label="이전 화면으로 이동"
                        onClick={() => navigate(-1)}
                        className="grid size-10 place-items-center text-2xl text-title"
                    >
                        ←
                    </button>
                    <h1
                        id="signup-title"
                        className="text-lg font-bold text-title"
                    >
                        회원가입
                    </h1>
                </header>
                <SignupForm
                    onSuccess={() => navigate("/login", { replace: true })}
                />
            </section>
        </main>
    );
}
