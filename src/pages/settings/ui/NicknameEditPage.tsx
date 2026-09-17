import { useNavigate } from "react-router-dom";
import { NicknameEditForm, useMyPage } from "../../../features/my-profile";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";

export default function NicknameEditPage() {
	const navigate = useNavigate();
	const { profile, isLoading, error } = useMyPage();

	return (
		<main className="mx-auto flex h-dvh w-full max-w-[430px] flex-col bg-primary-50">
			<header className="flex h-20 shrink-0 items-center gap-2 bg-surface px-6">
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
				<h1 className="text-2xl font-bold text-title">닉네임 수정</h1>
			</header>

			{isLoading && (
				<StatusText className="py-16 text-center">
					불러오는 중...
				</StatusText>
			)}
			{error && (
				<ErrorText className="py-16 text-center text-sm">{error}</ErrorText>
			)}
			{profile && (
				<NicknameEditForm
					initialNickname={profile.nickname}
					onSaved={() => navigate(-1)}
				/>
			)}
		</main>
	);
}
