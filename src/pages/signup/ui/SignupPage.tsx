import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupForm } from "../../../features/sign-up";
import { ConfirmModal } from "../../../shared/ui/confirm-modal";

export default function SignupPage() {
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleSignupSuccess = () => {
        setShowLoginModal(true);
    };

    const handleGoToLogin = () => {
        navigate("/user/login", { replace: true });
    };

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
                <SignupForm onSuccess={handleSignupSuccess} />
            </section>
            {showLoginModal && (
                <ConfirmModal
                    title="회원가입이 완료됐어요"
                    description="로그인 화면으로 이동해서 로그인해주세요"
                    cancelLabel="확인"
                    confirmLabel="로그인하기"
                    onCancel={handleGoToLogin}
                    onConfirm={handleGoToLogin}
                />
            )}
        </main>
    );
}
