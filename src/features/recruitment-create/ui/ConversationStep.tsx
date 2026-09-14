//3. 대화 정도

import { SelectableCard } from "../../../shared/ui/selectable-card";
import { OPTIONS } from "../../conversation-preference/model/types";
import type { RecruitmentCreateForm } from "../model/useRecruitmentCreateForm";
import { formatPace } from "../model/format";
import { formatDate } from "../../../shared/lib/date";

type Props = {
	form: RecruitmentCreateForm;
};

export function ConversationStep({ form }: Props) {

	const summaryRows = [
		{ label: "코스", value: `${form.selectedCourseName} · ${form.meetingPlace}` },
		{
			label: "거리",
			value: `${form.minDistanceKm}~${form.maxDistanceKm}km`,
		},
		{ label: "일시", value: `${formatDate(form.date)} ${form.time}` },
		{
			label: "페이스",
			value: `${formatPace(form.minPaceSeconds)} ~ ${formatPace(form.maxPaceSeconds)}/km`,
		},
	];

	return (
		<div>
			<h2
				id="home-recommendation-title"
				className="text-3xl font-bold leading-tight text-title"
			>
				어떤 대화로
				<br />
				함께할까요?
			</h2>
			<fieldset className="mt-5">
				<div
					className="mt-1 flex flex-col gap-3"
					role="radiogroup"
					aria-label="선호 대화 수준"
				>
					{OPTIONS.map((option) => (
						<SelectableCard
							key={option.value}
							label={option.label}
							description={option.description}
							selected={form.conversationStyle === option.value}
							role="radio"
							aria-checked={
								form.conversationStyle === option.value
							}
							onClick={() =>
								form.selectConversationStyle(
									option.value,
									option.label,
								)
							}
						/>
					))}
				</div>
			</fieldset>

			<fieldset className="mt-7 flex flex-col rounded-lg bg-gray-50 px-4 py-4">
				<legend className="px-1 text-base font-bold text-title">
					입력한 조건
				</legend>
				<div className="mt-2 flex flex-col gap-2">
					{summaryRows.map((row) => (
						<div
							key={row.label}
							className="flex items-center justify-between text-sm"
						>
							<span className="text-body">{row.label}</span>
							<strong className="font-bold text-title">
								{row.value}
							</strong>
						</div>
					))}
				</div>
			</fieldset>
		</div>
	);
}
