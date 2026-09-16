import { useState } from "react";
import type { Applicant } from "../../../entities/recruitment";
import Button from "../../../shared/ui/button";
import { useApplicants } from "../model/useApplicants";

type PendingAction = {
	type: "accept" | "reject";
	applicant: Applicant;
};

export function ApplicantList({ recruitmentId }: { recruitmentId: number }) {
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
				<p className="text-lg font-bold text-title">매칭이 확정됐어요</p>
				<p className="mt-2 text-sm text-body">
					{matchedApplicant.nickname} 님의 신청을 수락했어요.
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{isLoading && (
				<p className="py-10 text-center text-sm text-body">
					신청자 목록을 불러오는 중...
				</p>
			)}
			{error && (
				<p role="alert" className="py-10 text-center text-sm text-error-text">
					{error}
				</p>
			)}
			{!isLoading && !error && applicants.length === 0 && (
				<p className="py-10 text-center text-sm text-body">
					아직 신청자가 없어요.
				</p>
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
								>
									프로필 보기
								</button>
								<div className="ml-auto flex gap-2">
									<Button
										type="button"
										variant="destructive"
										disabled={isProcessing}
										onClick={() =>
											setPending({ type: "reject", applicant })
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
											setPending({ type: "accept", applicant })
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
				<p role="alert" className="text-sm text-error-text">
					{actionError}
				</p>
			)}

			{pending && (
				<div
					className="fixed inset-0 z-50 grid place-items-center bg-gray-900/40 px-4"
					role="presentation"
				>
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="applicant-confirm-title"
						className="w-full max-w-[360px] rounded-2xl bg-surface p-6 shadow-xl"
					>
						<p id="applicant-confirm-title" className="text-base font-bold text-title">
							{pending.type === "accept"
								? "이 분의 신청을 수락할까요?"
								: "이 신청을 거절할까요?"}
						</p>
						<p className="mt-2 text-sm text-body">
							{pending.type === "accept"
								? "수락하면 활동이 확정되고 모집글은 내려가요."
								: "거절 사유는 상대에게 공개되지 않아요."}
						</p>
						<div className="mt-6 flex gap-2">
							<Button
								type="button"
								variant="secondary"
								className="h-12 flex-1 text-sm"
								onClick={() => setPending(null)}
							>
								취소
							</Button>
							<Button
								type="button"
								variant={pending.type === "accept" ? "primary" : "destructive"}
								className="h-12 flex-1 text-sm"
								onClick={handleConfirm}
							>
								{pending.type === "accept" ? "수락" : "거절"}
							</Button>
						</div>
					</section>
				</div>
			)}
		</div>
	);
}
