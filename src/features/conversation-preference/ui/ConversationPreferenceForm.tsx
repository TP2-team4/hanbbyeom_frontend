import Button from "../../../shared/ui/button";
import { SelectableCard } from "../../../shared/ui/selectable-card";
import { ErrorText } from "../../../shared/ui/error-text";
import { useConversationPreference } from "../model/useConversationPreference";
import { OPTIONS, type ConversationPreference } from "../model/types";

type Props = {
	onSuccess: (preference: ConversationPreference) => void;
	initialPreference?: ConversationPreference;
	submitLabel?: string;
};

export function ConversationPreferenceForm({
	onSuccess,
	initialPreference,
	submitLabel = "시작하기",
}: Props) {
	const form = useConversationPreference({ onSuccess, initialPreference });

	const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		void form.submit();
	};

	return (
		<form
			className="flex min-h-[calc(100dvh-4rem)] flex-col"
			onSubmit={handleSubmit}
		>
			<div className="flex-1 px-6 pb-8 pt-12">
				<h2 className="text-3xl font-bold leading-tight text-title">
					활동 중 대화는
					<br />
					어디까지 괜찮으세요?
				</h2>
				<p className="mt-4 text-base leading-6 text-body">
					이 값이 매칭 조건의 기본값이 되고, 내 프로필에 표시돼요.
				</p>

				<div
					className="mt-8 flex flex-col gap-3"
					role="radiogroup"
					aria-label="선호 대화 수준"
				>
					{OPTIONS.map((option) => (
						<SelectableCard
							key={option.value}
							label={option.label}
							description={option.description}
							selected={form.selectedPreference === option.value}
							role="radio"
							aria-checked={
								form.selectedPreference === option.value
							}
							onClick={() => form.selectPreference(option.value)}
						/>
					))}
				</div>

				<p className="mt-7 rounded-lg bg-gray-50 px-4 py-4 text-sm leading-6 text-body">
					언제든 마이페이지에서 바꿀 수 있어요.
				</p>

				{form.submitError && (
					<ErrorText className="mt-3 text-xs">
						{form.submitError}
					</ErrorText>
				)}
			</div>

			<footer className="border-t border-divider bg-surface p-4">
				<Button
					type="submit"
					className="h-14 w-full"
					disabled={form.isSubmitting}
				>
					{form.isSubmitting ? "저장 중..." : submitLabel}
				</Button>
			</footer>
		</form>
	);
}
