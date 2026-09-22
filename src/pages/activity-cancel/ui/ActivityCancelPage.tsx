import { useNavigate, useParams } from "react-router-dom";
import {
	CANCEL_REASONS,
	CancelReasonOption,
	useActivityCancel,
} from "../../../features/activity-cancel";
import Button from "../../../shared/ui/button";
import { ErrorText } from "../../../shared/ui/error-text";
import { StatusText } from "../../../shared/ui/status-text";

export default function ActivityCancelPage() {
	const navigate = useNavigate();
	const { activityMatchId } = useParams();
	const id = Number(activityMatchId);
	const isValidId = Number.isInteger(id) && id > 0;

	const {
		selectedReason,
		setSelectedReason,
		isSubmitting,
		error,
		isCompleted,
		submit,
	} = useActivityCancel(id);

	if (!isValidId) {
		return (
			<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col items-center justify-center bg-primary-50">
				<StatusText>활동을 찾을 수 없어요.</StatusText>
			</main>
		);
	}

	if (isCompleted) {
		return (
			<main className="mx-auto flex h-dvh w-full max-w-[430px] flex-col items-center justify-center gap-3 bg-primary-50 px-6 text-center">
				<span
					aria-hidden="true"
					className="grid size-20 place-items-center rounded-full bg-secondary-400 text-white"
				>
					<svg
						viewBox="0 0 24 24"
						className="size-10 fill-none stroke-current"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M5 13l4 4L19 7" />
					</svg>
				</span>
				<h1 className="mt-2 text-xl font-bold text-title">
					활동을 취소했어요
				</h1>
				<p className="text-sm text-body">
					상대에게 취소 사실을 전달했어요.
				</p>
				<Button
					type="button"
					variant="primary"
					className="mt-8 h-14 w-full"
					onClick={() => navigate("/home", { replace: true })}
				>
					홈으로
				</Button>
			</main>
		);
	}

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
				<h1 className="text-2xl font-bold text-title">활동 취소</h1>
			</header>

			<section className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
				<h2 className="text-xl font-bold text-title">
					취소 사유를 알려주세요
				</h2>

				<p className="rounded-lg bg-error-bg px-4 py-3 text-sm text-error-text">
					활동 시작이 얼마 남지 않았어요. 반복적인 직전 취소는 신뢰
					프로필에 영향을 줄 수 있어요.
				</p>

				<div className="space-y-2">
					{CANCEL_REASONS.map((reason) => (
						<CancelReasonOption
							key={reason.code}
							label={reason.label}
							selected={selectedReason === reason.code}
							onSelect={() => setSelectedReason(reason.code)}
						/>
					))}
				</div>
				{error && (
					<ErrorText className="mb-2 text-sm">{error}</ErrorText>
				)}
			</section>

			<footer className="sticky bottom-0 border-t border-divider bg-primary-50 p-4">
				<div className="flex gap-2">
					<Button
						type="button"
						variant="secondary"
						className="h-14 flex-1"
						onClick={() => navigate(-1)}
					>
						취소
					</Button>
					<Button
						type="button"
						variant="destructive"
						className="h-14 flex-[2]"
						disabled={!selectedReason}
						isLoading={isSubmitting}
						loadingLabel="취소하는 중"
						onClick={submit}
					>
						활동 취소하기
					</Button>
				</div>
			</footer>
		</main>
	);
}
