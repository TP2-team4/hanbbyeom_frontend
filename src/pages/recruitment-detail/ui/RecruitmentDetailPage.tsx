import { useAsync } from "../../../shared/lib/useAsync";
import { useState } from "react";
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
import { ConfirmModal } from "../../../shared/ui/confirm-modal";
import { useApplication } from "../../../features/recruitment-detail";
import { getMyAppliedRecruitments } from "../../../features/applied-recruitment-list";

type DetailData = {
	recruitment: RecruitmentDetail;
	author: RecruitmentAuthorProfile;
	hasMyPendingApplication: boolean;
};

type FooterState = "open" | "waiting" | "closed";

function getFooterState(
	requestStatus: RecruitmentDetail["requestStatus"],
	hasMyPendingApplication: boolean,
): FooterState {
	if (requestStatus === "SEARCHING") return "open";
	if (requestStatus === "PENDING_CONFIRMATION" && hasMyPendingApplication) {
		return "waiting";
	}
	return "closed";
}

export default function RecruitmentDetailPage() {
	const navigate = useNavigate();
	const { recruitmentId } = useParams();
	const [pending, setPending] = useState<"apply" | "cancel" | null>(null);
	const id = Number(recruitmentId);
	const isValidId = Number.isInteger(id);
	const { apply, cancel, isProcessing, error, feedback } = useApplication(id);

	const { data: detail, isLoading, error: loadError, refetch } = useAsync<DetailData | null>(
		async () => {
			if (!isValidId) return null;
			const recruitment = await getRecruitmentDetail(id);
			if (!recruitment) return null;
			const author = await getRecruitmentAuthorProfile(id);
			if (!author) return null;
			const hasMyPendingApplication = await getMyAppliedRecruitments()
				.then((applications) =>
					applications.some(
						(application) =>
							application.hostMatchRequestId === id &&
							application.status === "PENDING",
					),
				)
				.catch(() => false);
			return { recruitment, author, hasMyPendingApplication };
		},
		null,
		[id, isValidId],
		"정보를 불러오지 못했어요. 다시 시도해 주세요.",
	);

	const footerState = detail
		? getFooterState(detail.recruitment.requestStatus, detail.hasMyPendingApplication)
		: "closed";

	const handleConfirm = async () => {
		const succeeded = pending === "apply" ? await apply() : await cancel();
		setPending(null);
		if (succeeded) {
			void refetch();
		}
	};

	return (
		<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-primary-50">
			<header className="flex h-20 items-center gap-2 bg-primary-50 px-6">
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
				{isValidId && !loadError && isLoading && (
					<StatusText>모집글을 불러오는 중...</StatusText>
				)}
				{loadError && (
					<ErrorText className="py-10 text-center text-sm">
						{loadError}
					</ErrorText>
				)}
				{!loadError && (!isValidId || (!isLoading && detail === null)) && (
					<StatusText>모집글을 찾을 수 없어요.</StatusText>
				)}
				{isValidId && !isLoading && !loadError && detail && (
					<>
						{footerState !== "open" && (
							<p className="rounded-xl bg-primary-100 px-4 py-3 text-center text-sm font-semibold text-secondary-500">
								{footerState === "waiting"
									? "작성자의 수락을 기다리고 있어요."
									: "마감된 모집이에요."}
							</p>
						)}
						<RecruitmentInfoCard recruitment={detail.recruitment} />
						<RecruitmentAuthorCard
							nickname={detail.recruitment.authorNickname}
							profile={detail.author}
						/>
					</>
				)}
			</section>

			{isValidId && !isLoading && !loadError && detail && footerState !== "closed" && (
				<footer className="sticky bottom-0 border-t border-divider bg-surface p-4">
					{error && (
						<ErrorText className="mb-2 text-sm">{error}</ErrorText>
					)}
					{feedback && (
						<p className="mb-2 text-sm text-body">{feedback}</p>
					)}
					<Button
						type="button"
						variant={footerState === "waiting" ? "secondary" : "primary"}
						isLoading={isProcessing}
						onClick={() =>
							setPending(footerState === "waiting" ? "cancel" : "apply")
						}
						className="h-14 w-full"
					>
						{footerState === "waiting" ? "신청 취소" : "신청하기"}
					</Button>
				</footer>
			)}

			{pending && (
				<ConfirmModal
					title={
						pending === "apply"
							? "이 모집에 신청할까요?"
							: "신청을 취소할까요?"
					}
					description={
						pending === "apply"
							? "작성자가 수락하면 활동이 최종 확정돼요."
							: "취소한 후에도 모집 중이라면 다시 신청할 수 있어요."
					}
					cancelLabel={pending === "apply" ? "취소" : "계속 기다리기"}
					confirmLabel={pending === "apply" ? "신청" : "신청 취소"}
					onCancel={() => setPending(null)}
					onConfirm={handleConfirm}
				/>
			)}
		</main>
	);
}
