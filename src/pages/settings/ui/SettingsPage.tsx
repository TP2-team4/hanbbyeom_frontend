import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/provider/AuthProvider";
import { useMyPage } from "../../../features/my-profile";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { useState } from "react";
import { ConfirmModal } from "../../../shared/ui/confirm-modal";

const CONVERSATION_PREFERENCE_LABEL = {
	SILENT: "조용히",
	LIGHT_CHAT: "가벼운 대화",
} as const;

function SettingsRow({
	label,
	value,
	onClick,
}: {
	label: string;
	value?: string;
	onClick: () => void;
}) {
	return (
		<li>
			<button
				type="button"
				onClick={onClick}
				className="flex w-full items-center justify-between px-5 py-4 text-left"
			>
				<span className="text-base font-medium text-title">
					{label}
				</span>
				<span className="flex items-center gap-1 text-sm text-body">
					{value}
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="size-4 fill-none stroke-current"
						strokeWidth="2"
					>
						<path d="m9 5 7 7-7 7" />
					</svg>
				</span>
			</button>
		</li>
	);
}

export default function SettingsPage() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const { profile, isLoading, error } = useMyPage();
	const [isTryLogout, setIsTryLogout] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/user/login", { replace: true });
	};

	return (
		<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-primary-50">
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
				<h1 className="text-2xl font-bold text-title">설정</h1>
			</header>

			<section className="flex-1 space-y-6 px-6 py-6 ">
				{isLoading && <StatusText>불러오는 중...</StatusText>}
				{error && <ErrorText className="text-sm">{error}</ErrorText>}

				{profile && (
					<ul className="divide-y divide-divider overflow-hidden rounded-lg border border-border bg-surface">
						<SettingsRow
							label="닉네임 수정"
							value={profile.nickname}
							onClick={() =>
								navigate("/my-page/settings/nickname")
							}
						/>
						<SettingsRow
							label="선호 대화 수준"
							value={
								CONVERSATION_PREFERENCE_LABEL[
									profile.conversationPreference
								]
							}
							onClick={() =>
								navigate(
									"/my-page/settings/conversation-preference",
								)
							}
						/>
					</ul>
				)}

				<ul className="overflow-hidden rounded-lg border border-border bg-surface">
					<li>
						<button
							type="button"
							onClick={() => setIsTryLogout(true)}
							className="w-full px-5 py-4 text-left text-base font-medium text-title"
						>
							로그아웃
						</button>
					</li>
				</ul>

				<ul className="overflow-hidden rounded-lg border border-border bg-surface">
					<li>
						<button
							type="button"
							onClick={() => navigate("/my-page/settings/withdraw")}
							className="w-full px-5 py-4 text-left text-base font-medium text-error-text "
						>
							회원탈퇴
						</button>
					</li>
				</ul>
			</section>

			{isTryLogout && (
				<ConfirmModal
					title={"로그아웃할까요?"}
					description={""}
					cancelLabel={"취소"}
					confirmLabel={"로그아웃"}
					onCancel={() => setIsTryLogout(false)}
					onConfirm={handleLogout}
				/>
			)}
		</main>
	);
}
