import { useAsync } from "../../../shared/lib/useAsync";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getRecruitmentDetail,
	RecruitmentInfoCard,
	type RecruitmentDetail,
} from "../../../entities/recruitment";
import { ApplicantList } from "../../../features/recruitment-applicants/ui/ApplicantList";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { useCancelRecruitment } from "../../../features/recruitment-detail";
import Button from "../../../shared/ui/button";
import { ConfirmModal } from "../../../shared/ui/confirm-modal";

export default function MyRecruitmentDetailPage() {
	const navigate = useNavigate();
	const { recruitmentId } = useParams();
	const id = Number(recruitmentId);
	const isValidId = Number.isInteger(id);
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

	const {
		cancel,
		isProcessing: isCancelProcessing,
		error: cancelError,
	} = useCancelRecruitment(id);

	const { data: detail, setData: setDetail, isLoading, error: loadError } = useAsync<RecruitmentDetail | null>(
		async () => {
			if (!isValidId) return null;
			return getRecruitmentDetail(id);
		},
		null,
		[id, isValidId],
		"정보를 불러오지 못했어요. 다시 시도해 주세요.",
	);

	const handleCancelRecruitment = async () => {
		const success = await cancel();

		if (success) {
			setDetail((current) =>
				current
					? {
							...current,
							requestStatus: "CANCELLED",
						}
					: current,
			);
		}

		setIsCancelModalOpen(false);
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
				{isValidId && !isLoading && !loadError && detail && !detail.isOwner && (
					<StatusText>
						내가 작성한 모집글만 확인할 수 있어요.
					</StatusText>
				)}

				{isValidId && !isLoading && !loadError && detail && detail.isOwner && (
					<>
						<RecruitmentInfoCard recruitment={detail} />

						{detail.requestStatus === "SEARCHING" && (
							<div>
								<div className="flex gap-2">
									<Button
										type="button"
										variant="secondary"
										onClick={() =>
											navigate(`/recruitments/${id}/edit`)
										}
										className="h-12 flex-1"
									>
										모집 수정
									</Button>
									<Button
										type="button"
										variant="destructive"
										isLoading={isCancelProcessing}
										onClick={() => setIsCancelModalOpen(true)}
										className="h-12 flex-1"
									>
										모집 취소
									</Button>
								</div>

								{cancelError && (
									<ErrorText className="mt-2 text-sm">
										{cancelError}
									</ErrorText>
								)}
							</div>
						)}

						{(detail.requestStatus === "SEARCHING" ||
							detail.requestStatus === "PENDING_CONFIRMATION") && (
							<ApplicantList recruitmentId={id} />
						)}

						{detail.requestStatus === "MATCHED" && (
							<StatusText>매칭이 확정된 모집이에요.</StatusText>
						)}

						{detail.requestStatus === "CANCELLED" && (
							<StatusText>취소한 모집이에요.</StatusText>
						)}

						{detail.requestStatus === "EXPIRED" && (
							<StatusText>기간이 만료된 모집이에요.</StatusText>
						)}

						{detail.requestStatus === "CLOSED" && (
							<StatusText>마감된 모집이에요.</StatusText>
						)}
					</>
				)}
			</section>
			{isCancelModalOpen && (
				<ConfirmModal
					title="모집을 취소할까요?"
					description="취소한 모집은 다시 신청받을 수 없어요."
					cancelLabel="계속 모집하기"
					confirmLabel="모집 취소"
					confirmVariant="destructive"
					onCancel={() => setIsCancelModalOpen(false)}
					onConfirm={handleCancelRecruitment}
				/>
			)}
		</main>
	);
}
