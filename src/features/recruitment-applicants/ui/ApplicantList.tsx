import { useState } from "react";
import type { Applicant } from "../../../entities/recruitment";
import Button from "../../../shared/ui/button";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { ConfirmModal } from "../../../shared/ui/confirm-modal";
import { useApplicants } from "../model/useApplicants";
import { useNavigate } from "react-router-dom";

type PendingAction = {
	type: "accept" | "reject";
	applicant: Applicant;
};

export function ApplicantList({ recruitmentId }: { recruitmentId: number }) {
	const navigate = useNavigate();
	const {
		applicants,
		isLoading,
		error,
		processingId,
		matchedApplicant,
		actionError,
		accept,
		reject,
	} = useApplicants(recruitmentId);
	const [pending, setPending] = useState<PendingAction | null>(null);

	const handleConfirm = async () => {
		if (!pending) return;
		if (pending.type === "accept") await accept(pending.applicant);
		else await reject(pending.applicant);
		setPending(null);
	};

	if (matchedApplicant) {
		return (
			<div className="rounded-lg border border-border bg-surface px-5 py-10 text-center">
				<p className="text-lg font-bold text-title">
					매칭이 확정됐어요
				</p>
				<p className="mt-2 text-sm text-body">
					{matchedApplicant.nickname} 님의 신청을 수락했어요.
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{isLoading && <StatusText>신청자 목록을 불러오는 중...</StatusText>}
			{error && (
				<ErrorText className="py-10 text-center text-sm">
					{error}
				</ErrorText>
			)}
			{!isLoading && !error && applicants.length === 0 && (
				<StatusText>아직 신청자가 없어요.</StatusText>
			)}
			{!isLoading &&
				!error &&
				applicants.map((applicant) => {
					const isProcessing = processingId === applicant.id;
					return (
						<article
							key={applicant.id}
							className="rounded-lg border border-border bg-surface px-5 py-5"
						>
							<div className="flex flex-wrap items-center gap-2">
								<h3 className="text-lg font-bold text-title">
									{applicant.nickname}
								</h3>
								<span className="rounded-full bg-primary-100 px-3 py-1.5 text-xs font-medium text-secondary-400">
									{applicant.conversationStyle}
								</span>
							</div>
							<p className="mt-2 text-sm text-body">
								★ {applicant.averageRating.toFixed(1)} · 완료{" "}
								{applicant.completedActivityCount}회 · 노쇼{" "}
								{applicant.noShowReportCount}회
							</p>
							<div className="mt-4 flex items-center gap-2">
								<button
									type="button"
									className="text-sm font-medium text-body underline"
									onClick={() => {
										navigate(
											`/matches/${applicant.id}/applicant-profile`,
										);
									}}
								>
									프로필 보기
								</button>
								<div className="ml-auto flex gap-2">
									<Button
										type="button"
										variant="destructive"
										disabled={isProcessing}
										onClick={() =>
											setPending({
												type: "reject",
												applicant,
											})
										}
										className="h-10 px-4 text-sm"
									>
										{isProcessing ? "처리 중…" : "거절"}
									</Button>
									<Button
										type="button"
										variant="primary"
										disabled={isProcessing}
										onClick={() =>
											setPending({
												type: "accept",
												applicant,
											})
										}
										className="h-10 px-4 text-sm"
									>
										{isProcessing ? "처리 중…" : "수락"}
									</Button>
								</div>
							</div>
						</article>
					);
				})}
			{actionError && (
				<ErrorText>{actionError}</ErrorText>
			)}

			{pending && (
				<ConfirmModal
					title={
						pending.type === "accept"
							? "이 분의 신청을 수락할까요?"
							: "이 신청을 거절할까요?"
					}
					description={
						pending.type === "accept"
							? "수락하면 활동이 확정되고 모집글은 내려가요."
							: "거절 사유는 상대에게 공개되지 않아요."
					}
					cancelLabel="취소"
					confirmLabel={pending.type === "accept" ? "수락" : "거절"}
					confirmVariant={pending.type === "accept" ? "primary" : "destructive"}
					onCancel={() => setPending(null)}
					onConfirm={handleConfirm}
				/>
			)}
		</div>
	);
}
