import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getRecruitmentDetail,
	RecruitmentInfoCard,
	type RecruitmentDetail,
} from "../../../entities/recruitment";
import {
	getRecruitmentAuthorProfile,
	RecruitmentAuthorCard,
	type RecruitmentAuthorProfile,
} from "../../../entities/user-profile";
import Button from "../../../shared/ui/button";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { useApplication } from "../../../features/recruitment-detail";

type DetailData = {
	recruitment: RecruitmentDetail;
	author: RecruitmentAuthorProfile;
};

const STATUS_LABEL = {
	open: "신청하기",
	applied: "신청 취소",
} as const;

export default function RecruitmentDetailPage() {
	const navigate = useNavigate();
	const { recruitmentId } = useParams();
	const [detail, setDetail] = useState<DetailData | null>();
	const [loadError, setLoadError] = useState<string | null>(null);
	const [pending, setPending] = useState<"apply" | "cancel" | null>(null);
	const id = Number(recruitmentId);
	const isValidId = Number.isInteger(id);
	const { apply, cancel, isProcessing, error, feedback } = useApplication(id);

	useEffect(() => {
		if (!isValidId) return;
		let isActive = true;

		const loadDetail = async () => {
			try {
				const recruitment = await getRecruitmentDetail(id);
				if (!recruitment) {
					if (isActive) setDetail(null);
					return;
				}

				const author = await getRecruitmentAuthorProfile(id);
				if (isActive) setDetail(author ? { recruitment, author } : null);
			} catch {
				if (isActive) setLoadError("정보를 불러오지 못했어요. 다시 시도해 주세요.");
			}
		};

		void loadDetail();
		return () => {
			isActive = false;
		};
	}, [id, isValidId]);

	const handleConfirm = async () => {
		const newStatus = pending === "apply" ? await apply() : await cancel();
		setPending(null);
		if (newStatus) {
			setDetail((current) =>
				current
					? { ...current, recruitment: { ...current.recruitment, status: newStatus } }
					: current,
			);
		}
	};

	return (
		<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-primary-50">
			<header className="flex h-20 items-center gap-2 bg-surface px-6">
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
				<h1 className="text-2xl font-bold text-title">모집 상세</h1>
			</header>

			<section
				className="flex-1 space-y-5 px-6 py-6"
				aria-live="polite"
			>
				{isValidId && !loadError && detail === undefined && (
					<StatusText>모집글을 불러오는 중...</StatusText>
				)}
				{loadError && (
					<ErrorText className="py-10 text-center text-sm">
						{loadError}
					</ErrorText>
				)}
				{!loadError && (!isValidId || detail === null) && (
					<StatusText>모집글을 찾을 수 없어요.</StatusText>
				)}
				{isValidId && detail && (
					<>
						<RecruitmentInfoCard recruitment={detail.recruitment} />
						<RecruitmentAuthorCard profile={detail.author} />
					</>
				)}
			</section>

			{detail && (
				<footer className="sticky bottom-0 border-t border-divider bg-surface p-4">
					{error && <ErrorText className="mb-2 text-sm">{error}</ErrorText>}
					{feedback && (
						<p className="mb-2 text-sm text-body">{feedback}</p>
					)}
					<Button
						type="button"
						variant={detail.recruitment.status === "applied" ? "secondary" : "primary"}
						disabled={isProcessing}
						onClick={() =>
							setPending(
								detail.recruitment.status === "applied" ? "cancel" : "apply",
							)
						}
						className="h-14 w-full"
					>
						{isProcessing ? "처리 중…" : STATUS_LABEL[detail.recruitment.status]}
					</Button>
				</footer>
			)}

			{pending && (
				<div
					className="fixed inset-0 z-50 grid place-items-center bg-gray-900/40 px-4"
					role="presentation"
				>
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="application-confirm-title"
						className="w-full max-w-[360px] rounded-2xl bg-surface p-6 shadow-xl"
					>
						<p id="application-confirm-title" className="text-base font-bold text-title">
							{pending === "apply"
								? "이 모집에 신청할까요?"
								: "신청을 취소할까요?"}
						</p>
						<p className="mt-2 text-sm text-body">
							{pending === "apply"
								? "작성자가 수락하면 활동이 최종 확정돼요."
								: "취소한 후에도 모집 중이라면 다시 신청할 수 있어요."}
						</p>
						<div className="mt-6 flex gap-2">
							<Button
								type="button"
								variant="secondary"
								className="h-12 flex-1 text-sm"
								onClick={() => setPending(null)}
							>
								{pending === "apply" ? "취소" : "계속 기다리기"}
							</Button>
							<Button
								type="button"
								variant="primary"
								className="h-12 flex-1 text-sm"
								onClick={handleConfirm}
							>
								{pending === "apply" ? "신청" : "신청 취소"}
							</Button>
						</div>
					</section>
				</div>
			)}
		</main>
	);
}
