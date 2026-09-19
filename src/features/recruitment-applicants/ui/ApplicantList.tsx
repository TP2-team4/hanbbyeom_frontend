import { useState } from "react";
import Button from "../../../shared/ui/button";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { RetryButton } from "../../../shared/ui/retry-button";
import { ConfirmModal } from "../../../shared/ui/confirm-modal";
import { useNavigate } from "react-router-dom";
import { usePendingApplicant } from "../model/usePendingApplicant";

type PendingAction = "accept" | "reject";

export function ApplicantList({ recruitmentId }: { recruitmentId: number }) {
	const navigate = useNavigate();
	const {
		pendingApplicant,
		isLoading,
		error,
		refetch,
		isProcessing,
		actionError,
		confirmedMatch,
		accept,
		reject,
	} = usePendingApplicant(recruitmentId);

	const [pending, setPending] = useState<PendingAction | null>(null);

	const handleConfirm = async () => {
		if (pending === "accept") await accept();
		if (pending === "reject") {
			await reject();
		}

		setPending(null);
	};

	if (confirmedMatch) {
		return (
			<div className="rounded-lg border border-border bg-surface px-5 py-10 text-center">
				<p className="text-lg font-bold text-title">
					매칭이 확정됐어요
				</p>
				{/* <p className="mt-2 text-sm text-body">현장 확인 코드</p>
				<p className="mt-1 text-2xl font-bold tracking-widest text-title">
					{confirmedMatch.meetingCode}
				</p> */}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{isLoading && <StatusText>신청자 정보를 불러오는 중...</StatusText>}
			{error && (
				<div className="flex flex-col items-center gap-3 py-10">
					<ErrorText className="text-center text-sm">
						{error}
					</ErrorText>
					<RetryButton onClick={refetch} />
				</div>
			)}
			{!isLoading && !error && !pendingApplicant && (
				<StatusText>아직 신청자가 없어요.</StatusText>
			)}
			{!isLoading && !error && pendingApplicant && (
				<article className="rounded-lg border border-border bg-surface px-5 py-5">
					<h3 className="text-lg font-bold text-title">
						현재 신청자
					</h3>

					<p className="mt-2 text-sm text-body">
						{pendingApplicant.profile.averageRating !== null ? (
							<>
								★{" "}
								{pendingApplicant.profile.averageRating.toFixed(
									1,
								)}
								{" · "}후기{" "}
								{pendingApplicant.profile.reviewCount}개
							</>
						) : (
							"평가 없음"
						)}
					</p>

					<p className="mt-1 text-sm text-body">
						완료 {pendingApplicant.profile.completedActivityCount}회
						{" · "}노쇼 {pendingApplicant.profile.noShowReportCount}
						회
					</p>

					<p className="mt-2 text-sm text-body">
						응답 기한:{" "}
						{new Date(
							pendingApplicant.decisionExpiresAt,
						).toLocaleString("ko-KR")}
					</p>

					<div className="mt-4 flex items-center gap-2">
						<button
							type="button"
							className="text-sm font-medium text-body underline"
							onClick={() =>
								navigate(
									`/matches/${pendingApplicant.activityMatchId}/applicant-profile`,
								)
							}
						>
							프로필 보기
						</button>

						<div className="ml-auto flex gap-2">
							<Button
								type="button"
								variant="destructive"
								isLoading={isProcessing}
								onClick={() => setPending("reject")}
								className="h-10 px-4 text-sm"
							>
								거절
							</Button>

							<Button
								type="button"
								variant="primary"
								isLoading={isProcessing}
								onClick={() => setPending("accept")}
								className="h-10 px-4 text-sm"
							>
								수락
							</Button>
						</div>
					</div>
				</article>
			)}
			{actionError && <ErrorText>{actionError}</ErrorText>}

			{pending && (
				<ConfirmModal
					title={
						pending === "accept"
							? "이 분의 신청을 수락할까요?"
							: "이 신청을 거절할까요?"
					}
					description={
						pending === "accept"
							? "수락하면 활동이 확정되고 모집글은 내려가요."
							: "거절 사유는 상대에게 공개되지 않아요."
					}
					cancelLabel="취소"
					confirmLabel={pending === "accept" ? "수락" : "거절"}
					confirmVariant={
						pending === "accept" ? "primary" : "destructive"
					}
					onCancel={() => setPending(null)}
					onConfirm={handleConfirm}
				/>
			)}
		</div>
	);
}
