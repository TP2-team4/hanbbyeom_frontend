import { useAsync } from "../../../shared/lib/useAsync";
import { useNavigate, useParams } from "react-router-dom";
import {
	CourseStep,
	ScheduleStep,
	ConversationStep,
	useRecruitmentCreateForm,
	type RecruitmentInitialValues,
} from "../../../features/recruitment-create";
import { OPTIONS as TALK_LEVEL_OPTIONS } from "../../../features/conversation-preference/model/types";
import {
	getRecruitmentDetail,
	getRunCondition,
} from "../../../entities/recruitment";
import { toDateValue, toTimeValue } from "../../../shared/lib/date";
import Button from "../../../shared/ui/button";
import { ErrorText } from "../../../shared/ui/error-text";
import { StatusText } from "../../../shared/ui/status-text";

export default function RecruitmentEditPage() {
	const navigate = useNavigate();
	const { recruitmentId } = useParams();
	const id = Number(recruitmentId);
	const isValidId = Number.isInteger(id);

	const {
		data: initialValues,
		isLoading,
		error: loadError,
	} = useAsync<RecruitmentInitialValues | undefined>(
		async () => {
			if (!isValidId) return undefined;
			const [detail, condition] = await Promise.all([
				getRecruitmentDetail(id),
				getRunCondition(id),
			]);

			if (!detail || !detail.isOwner || !condition) {
				throw new Error("모집글 정보를 불러오지 못했어요.");
			}

			const scheduledDate = new Date(detail.scheduledAt);
			const talkLevelOption = TALK_LEVEL_OPTIONS.find(
				(option) => option.value === detail.conversationStyle,
			);

			return {
				courseId: condition.courseId,
				courseName: condition.courseName,
				meetingPlace: detail.meetingPlace,
				date: toDateValue(scheduledDate),
				time: toTimeValue(scheduledDate),
				minDistanceKm: detail.minDistanceKm,
				maxDistanceKm: detail.maxDistanceKm,
				minPaceSeconds: condition.paceMinSec,
				maxPaceSeconds: condition.paceMaxSec,
				conversationStyle: detail.conversationStyle,
				conversationStyleLabel: talkLevelOption?.label ?? "조용히",
			};
		},
		undefined,
		[id, isValidId],
		"모집글 정보를 불러오지 못했어요.",
	);

	if (!isValidId || loadError) {
		return (
			<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col items-center justify-center gap-4 bg-primary-50 px-6">
				<ErrorText className="text-center text-sm">
					{loadError ?? "잘못된 접근이에요."}
				</ErrorText>
				<Button
					type="button"
					variant="secondary"
					className="h-12 w-full"
					onClick={() => navigate(-1)}
				>
					돌아가기
				</Button>
			</main>
		);
	}

	if (isLoading || !initialValues) {
		return (
			<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col items-center justify-center bg-primary-50">
				<StatusText>불러오는 중...</StatusText>
			</main>
		);
	}

	return (
		<RecruitmentEditWizard
			key={id}
			recruitmentId={id}
			initialValues={initialValues}
		/>
	);
}

type WizardProps = {
	recruitmentId: number;
	initialValues: RecruitmentInitialValues;
};

// 모집글 작성 마법사(CourseStep/ScheduleStep/ConversationStep)를 그대로 재사용해서
// 이전에 올렸던 값을 채운 채로 보여주고, 저장 시 수정 API를 호출하도록 함
function RecruitmentEditWizard({ recruitmentId, initialValues }: WizardProps) {
	const navigate = useNavigate();
	const form = useRecruitmentCreateForm({
		editingRecruitmentId: recruitmentId,
		initialValues,
		onSuccess: () =>
			navigate(`/recruitments/${recruitmentId}/applicants`, {
				replace: true,
			}),
	});
	const { step, totalSteps, goNext } = form;
	const isLastStep = step === totalSteps;

	const handlePrimaryAction = () => {
		if (isLastStep) {
			void form.submit();
			return;
		}
		goNext();
	};

	const handleBack = () => {
		if (step === 1) {
			navigate(-1);
			return;
		}
		form.goPrev();
	};

	return (
		<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-primary-50">
			<div className="sticky top-0 z-20 bg-primary-50">
				<header className="flex h-20 items-center justify-between px-6">
					<div className="flex items-center gap-2">
						<button
							type="button"
							aria-label="뒤로 가기"
							className="grid size-10 place-items-center text-title"
							onClick={handleBack}
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
						<h1 className="text-2xl font-bold text-title">
							모집글 수정
						</h1>
					</div>
					<span className="text-lg text-body">{`${step} / ${totalSteps}`}</span>
				</header>

				<div
					className="flex flex-row gap-2 px-6 pb-3"
					role="progressbar"
					aria-valuenow={step}
					aria-valuemin={1}
					aria-valuemax={totalSteps}
				>
					{Array.from({ length: totalSteps }, (_, index) => (
						<div
							key={index}
							className={`h-1 flex-1 rounded-full ${
								index + 1 <= step
									? "bg-action-primary"
									: "bg-gray-400"
							}`}
						/>
					))}
				</div>
			</div>

			<div className="flex-1 px-6 pb-12 pt-9">
				<section aria-labelledby="home-recommendation-title">
					{step === 1 && <CourseStep form={form} showSubmitError />}
					{step === 2 && <ScheduleStep form={form} />}
					{step === 3 && <ConversationStep form={form} />}
				</section>
				{step !== 1 && form.submitError && (
					<ErrorText className="mt-4 text-xs">
						{form.submitError}
					</ErrorText>
				)}
			</div>

			<footer className="sticky bottom-0 border-t border-divider bg-primary-50 p-4">
				<Button
					type="button"
					variant="primary"
					className="h-14 w-full"
					disabled={form.isSubmitting}
					onClick={handlePrimaryAction}
				>
					{isLastStep
						? form.isSubmitting
							? "저장 중..."
							: "저장하기"
						: "다음"}
				</Button>
			</footer>
		</main>
	);
}
