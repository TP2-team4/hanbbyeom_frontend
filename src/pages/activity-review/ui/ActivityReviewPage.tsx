import { useNavigate, useParams } from "react-router-dom";
import { useMyPage } from "../../../features/my-profile";
import {
	NO_SHOW_REASONS,
	StarRating,
	TalkLevelChips,
	useActivityReview,
} from "../../../features/activity-review";
import { CancelReasonOption } from "../../../features/activity-cancel";
import { SelectableCard } from "../../../shared/ui/selectable-card";
import Button from "../../../shared/ui/button";
import { ErrorText } from "../../../shared/ui/error-text";
import { StatusText } from "../../../shared/ui/status-text";

export default function ActivityReviewPage() {
	const navigate = useNavigate();
	const { activityMatchId } = useParams();
	const id = Number(activityMatchId);
	const isValidId = Number.isInteger(id) && id > 0;

	const { activityHistory, isLoading, error: loadError } = useMyPage();
	const activity = activityHistory.find(
		(item) => item.activityMatchId === id,
	);

	const {
		step,
		met,
		setMet,
		proceedFromConfirm,
		rating,
		setRating,
		talkLevel,
		setTalkLevel,
		comment,
		setComment,
		submitReview,
		reasonCode,
		setReasonCode,
		detail,
		setDetail,
		submitReport,
		isSubmitting,
		error,
	} = useActivityReview(id);

	if (!isValidId) {
		return (
			<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col items-center justify-center bg-primary-50">
				<StatusText>활동을 찾을 수 없어요.</StatusText>
			</main>
		);
	}

	if (isLoading) {
		return (
			<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col items-center justify-center bg-primary-50">
				<StatusText>활동 정보를 불러오는 중...</StatusText>
			</main>
		);
	}

	if (loadError || !activity) {
		return (
			<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col items-center justify-center bg-primary-50">
				<ErrorText className="text-center text-sm">
					{loadError ?? "활동을 찾을 수 없어요."}
				</ErrorText>
			</main>
		);
	}

	if (step === "done") {
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
					{met ? "후기를 등록했어요" : "신고를 접수했어요"}
				</h1>
				<p className="text-sm text-body">
					{met
						? "소중한 후기 감사해요."
						: "확인 후 신뢰 프로필에 반영될 수 있어요."}
				</p>
				<Button
					type="button"
					variant="primary"
					className="mt-8 h-14 w-full"
					onClick={() => navigate("/my-page", { replace: true })}
				>
					마이페이지로
				</Button>
			</main>
		);
	}

	const headerTitle =
		step === "confirm" ? "활동 확인" : step === "review" ? "후기 작성" : "노쇼 신고";

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
				<h1 className="text-2xl font-bold text-title">{headerTitle}</h1>
			</header>

			<section className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
				{step === "confirm" && (
					<>
						<div className="rounded-lg border border-border bg-surface px-5 py-4">
							<strong className="block text-base font-bold text-title">
								{activity.title}
							</strong>
							<p className="mt-1 text-sm text-body">
								{activity.dateLabel} · {activity.distanceKm}km ·{" "}
								{activity.partnerNickname}
							</p>
						</div>

						<h2 className="text-xl font-bold text-title">
							실제로 만났나요?
						</h2>
						<p className="text-sm text-body">
							답변은 상대방에게 공개되지 않아요. 신뢰 프로필 관리에만
							사용돼요.
						</p>

						<div className="space-y-2">
							<SelectableCard
								label="네, 만나서 활동했어요"
								description="후기 작성으로 이어져요"
								selected={met === true}
								onClick={() => setMet(true)}
							/>
							<SelectableCard
								label="아니요, 만나지 못했어요"
								description="사유를 확인한 뒤 신고할 수 있어요"
								selected={met === false}
								onClick={() => setMet(false)}
							/>
						</div>
					</>
				)}

				{step === "review" && (
					<>
						<div>
							<h2 className="text-xl font-bold text-title">
								이번 활동은 어땠나요?
							</h2>
							<p className="mt-1 text-sm text-body">
								후기는 익명으로 등록돼요.
							</p>
							<div className="mt-3">
								<StarRating value={rating} onChange={setRating} />
							</div>
						</div>

						<div>
							<h3 className="text-base font-bold text-title">
								체감한 대화 수준
							</h3>
							<div className="mt-2">
								<TalkLevelChips
									value={talkLevel}
									onChange={setTalkLevel}
									partnerTalkLevel={activity.partnerTalkLevel}
								/>
							</div>
						</div>

						<div>
							<h3 className="text-base font-bold text-title">
								한 줄 후기 (선택)
							</h3>
							<textarea
								value={comment}
								onChange={(event) =>
									setComment(event.target.value.slice(0, 100))
								}
								placeholder="이번 활동에 대한 한 줄 후기를 남겨주세요"
								maxLength={100}
								rows={3}
								className="mt-2 w-full resize-none rounded-md border border-border bg-surface px-4 py-3 text-base text-title outline-none placeholder:text-placeholder focus:border-2 focus:border-focus"
							/>
							<div className="mt-1 flex items-center justify-between text-xs text-body">
								<span>
									비방·개인정보가 담긴 후기는 등록되지 않아요.
								</span>
								<span>{comment.length}/100</span>
							</div>
						</div>
					</>
				)}

				{step === "noshow" && (
					<>
						<p className="rounded-lg bg-error-bg px-4 py-3 text-sm text-error-text">
							신고는 취소할 수 없어요. 허위 신고가 반복되면 내 계정도
							제한될 수 있어요.
						</p>

						<h2 className="text-xl font-bold text-title">
							어떤 상황이었나요?
						</h2>
						<div className="space-y-2">
							{NO_SHOW_REASONS.map((reason) => (
								<CancelReasonOption
									key={reason.code}
									label={reason.label}
									selected={reasonCode === reason.code}
									onSelect={() => setReasonCode(reason.code)}
								/>
							))}
						</div>

						<div>
							<h3 className="text-base font-bold text-title">
								상세 내용 (선택)
							</h3>
							<textarea
								value={detail}
								onChange={(event) => setDetail(event.target.value)}
								placeholder="확인에 도움이 되는 내용을 적어주세요"
								rows={3}
								className="mt-2 w-full resize-none rounded-md border border-border bg-surface px-4 py-3 text-base text-title outline-none placeholder:text-placeholder focus:border-2 focus:border-focus"
							/>
						</div>
						{!reasonCode && (
							<p className="text-xs text-error-text">
								신고 사유를 하나 선택해 주세요.
							</p>
						)}
					</>
				)}
			</section>

			<footer className="sticky bottom-0 border-t border-divider bg-surface p-4">
				{error && <ErrorText className="mb-2 text-sm">{error}</ErrorText>}
				{step === "confirm" && (
					<Button
						type="button"
						variant="primary"
						className="h-14 w-full"
						disabled={met === null}
						onClick={proceedFromConfirm}
					>
						다음
					</Button>
				)}
				{step === "review" && (
					<Button
						type="button"
						variant="primary"
						className="h-14 w-full"
						disabled={rating === 0}
						isLoading={isSubmitting}
						loadingLabel="등록하는 중"
						onClick={submitReview}
					>
						후기 등록
					</Button>
				)}
				{step === "noshow" && (
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
							disabled={!reasonCode}
							isLoading={isSubmitting}
							loadingLabel="접수하는 중"
							onClick={submitReport}
						>
							신고 접수
						</Button>
					</div>
				)}
			</footer>
		</main>
	);
}
