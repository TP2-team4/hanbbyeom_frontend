import { useNavigate } from "react-router-dom";
import {
	CourseStep,
	ScheduleStep,
	ConversationStep,
	useRecruitmentCreateForm,
} from "../../../features/recruitment-create";
import Button from "../../../shared/ui/button";
import { ErrorText } from "../../../shared/ui/error-text";

export default function RecruitmentCreatePage() {
	const navigate = useNavigate();
	const form = useRecruitmentCreateForm({
		onSuccess: () => navigate("/recruitments", { replace: true }),
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
		} else {
			form.goPrev();
		}
	};

	return (
		<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-primary-50">
			<div className="sticky top-0 z-20 bg-surface">
				<header className="flex h-20 items-center justify-between px-6">
					<div className="flex items-center gap-2">
						<button
							type="button"
							aria-label="뒤로 가기"
							className="grid size-10 place-items-center text-title"
							onClick={() => {
								handleBack();
							}}
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
							모집글 작성
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
					{step === 1 && <CourseStep form={form} />}
					{step === 2 && <ScheduleStep form={form} />}
					{step === 3 && <ConversationStep form={form} />}
				</section>
			</div>

			<footer className="sticky bottom-0 border-t border-divider bg-surface p-4">
				{form.submitError && (
					<ErrorText className="mb-2 text-xs">
						{form.submitError}
					</ErrorText>
				)}
				<Button
					type="button"
					variant="primary"
					className="h-14 w-full"
					disabled={form.isSubmitting}
					onClick={handlePrimaryAction}
				>
					{isLastStep
						? form.isSubmitting
							? "작성 중..."
							: "작성 완료"
						: "다음"}
				</Button>
			</footer>
		</main>
	);
}
