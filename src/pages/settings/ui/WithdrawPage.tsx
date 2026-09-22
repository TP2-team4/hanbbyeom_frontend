import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/provider/AuthProvider";
import { useAccountWithdraw } from "../../../features/account-withdraw";
import Input from "../../../shared/ui/input";
import Button from "../../../shared/ui/button";
import { ErrorText } from "../../../shared/ui/error-text";
import { ConfirmModal } from "../../../shared/ui/confirm-modal";

export default function WithdrawPage() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [isConfirming, setIsConfirming] = useState(false);

	const { password, setPassword, isSubmitting, error, submit } =
		useAccountWithdraw({
			onSuccess: () => {
				logout();
				navigate("/user/login", { replace: true });
			},
		});

	return (
		<main className="mx-auto flex h-dvh w-full max-w-[430px] flex-col bg-primary-50">
			<header className="flex h-20 shrink-0 items-center gap-2 bg-primary-50 px-6">
				<button
					type="button"
					aria-label="뒤로 가기"
					className="grid size-10 place-items-center text-title"
					onClick={() => navigate(-1)}
				>
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="size-7 fill-none stroke-current"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="m15 18-6-6 6-6" />
					</svg>
				</button>
				<h1 className="text-2xl font-bold text-title">회원 탈퇴</h1>
			</header>

			<section className="flex-1 space-y-5 px-6 py-6">
				<p className="rounded-lg bg-error-bg px-4 py-3 text-sm text-error-text">
					탈퇴하면 계정 정보가 삭제되고 되돌릴 수 없어요.
				</p>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="withdraw-password"
						className="text-sm font-bold text-body"
					>
						현재 비밀번호
					</label>
					<Input
						id="withdraw-password"
						type="password"
						placeholder="비밀번호를 입력해 주세요"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					{error && (
						<ErrorText className="mb-2 text-sm">{error}</ErrorText>
					)}
				</div>
			</section>

			<footer className="sticky bottom-0 border-t border-divider bg-primary-50 p-4">
				<Button
					type="button"
					variant="destructive"
					className="h-14 w-full"
					disabled={!password}
					isLoading={isSubmitting}
					loadingLabel="탈퇴하는 중"
					onClick={() => setIsConfirming(true)}
				>
					회원 탈퇴
				</Button>
			</footer>

			{isConfirming && (
				<ConfirmModal
					title="정말 탈퇴하시겠어요?"
					description="탈퇴하면 계정 정보가 삭제되고 되돌릴 수 없어요."
					cancelLabel="취소"
					confirmLabel="탈퇴"
					confirmVariant="destructive"
					onCancel={() => setIsConfirming(false)}
					onConfirm={() => {
						setIsConfirming(false);
						void submit();
					}}
				/>
			)}
		</main>
	);
}
