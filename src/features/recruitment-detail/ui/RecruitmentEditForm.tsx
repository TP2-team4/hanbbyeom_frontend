import { useState } from "react";
import {
	type ConversationStyle,
	type RecruitmentDetail,
	updateRecruitment,
} from "../../../entities/recruitment";
import { formatDate, toTimeValue } from "../../../shared/lib/date";
import Button from "../../../shared/ui/button";
import { ErrorText } from "../../../shared/ui/error-text";

type Props = {
	recruitment: RecruitmentDetail;
	onCancel: () => void;
	onSaved: (patch: Partial<RecruitmentDetail>) => void;
};

function toDateTimeLocal(value: string) {
	const date = new Date(value);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function RecruitmentEditForm({ recruitment, onCancel, onSaved }: Props) {
	const [scheduledAt, setScheduledAt] = useState(() =>
		toDateTimeLocal(recruitment.scheduledAt),
	);
	const [talkLevel, setTalkLevel] = useState<ConversationStyle>(
		recruitment.conversationStyle,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submit = async () => {
		const scheduledDate = new Date(scheduledAt);
		if (scheduledDate.getTime() < Date.now() + 3 * 60 * 60 * 1000) {
			setError("활동 시작 시각은 지금부터 최소 3시간 이후여야 해요.");
			return;
		}

		setIsSubmitting(true);
		setError(null);
		try {
			const nextScheduledAt = scheduledDate.toISOString();
			await updateRecruitment(recruitment.id, {
				scheduledAt: nextScheduledAt,
				talkLevel,
			});
			onSaved({
				scheduledAt: nextScheduledAt,
				dateLabel: formatDate(nextScheduledAt),
				time: toTimeValue(scheduledDate),
				conversationStyle: talkLevel,
			});
		} catch (cause) {
			setError(
				cause instanceof Error
					? cause.message
					: "모집글을 수정하지 못했어요.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="space-y-4 rounded-lg border border-border bg-surface p-5">
			<label className="block text-sm font-bold text-title">
				일정
				<input
					type="datetime-local"
					value={scheduledAt}
					onChange={(event) => setScheduledAt(event.target.value)}
					className="mt-2 h-12 w-full rounded-md border border-border bg-surface px-3 font-medium text-title"
				/>
			</label>

			<label className="block text-sm font-bold text-title">
				대화 수준
				<select
					value={talkLevel}
					onChange={(event) =>
						setTalkLevel(event.target.value as ConversationStyle)
					}
					className="mt-2 h-12 w-full rounded-md border border-border bg-surface px-3 font-medium text-title"
				>
					<option value="SILENT">조용히</option>
					<option value="LIGHT_CHAT">가벼운 대화</option>
				</select>
			</label>

			{error && <ErrorText>{error}</ErrorText>}

			<div className="flex gap-2">
				<Button
					type="button"
					variant="secondary"
					onClick={onCancel}
					className="h-12 flex-1"
				>
					취소
				</Button>
				<Button
					type="button"
					isLoading={isSubmitting}
					onClick={submit}
					className="h-12 flex-1"
				>
					저장
				</Button>
			</div>
		</section>
	);
}
