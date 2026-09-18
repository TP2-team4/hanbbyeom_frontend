import { useNavigate } from "react-router-dom";
import { ConversationPreferenceForm } from "../../../features/conversation-preference";
import { updateMockProfile, useMyPage } from "../../../features/my-profile";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";

export default function ConversationPreferenceEditPage() {
	const navigate = useNavigate();
	const { profile, isLoading, error } = useMyPage();

	return (
		<main className="mx-auto min-h-full w-full max-w-[430px] bg-secondary-50">
			<section className="min-h-full bg-primary-50">
				<header className="flex h-16 items-center gap-2 px-4">
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
					<h1 className="text-lg font-bold text-title ">
						선호 대화 수준
					</h1>
				</header>

				{isLoading && (
					<StatusText className="py-16 text-center">
						불러오는 중...
					</StatusText>
				)}
				{error && (
					<ErrorText className="py-16 text-center text-sm">
						{error}
					</ErrorText>
				)}
				{profile && (
					<ConversationPreferenceForm
						initialPreference={profile.conversationPreference}
						submitLabel="저장"
						onSuccess={(preference) => {
							updateMockProfile({
								conversationPreference: preference,
							});
							navigate(-1);
						}}
					/>
				)}
			</section>
		</main>
	);
}
