import { useState } from "react";
import {
	applyToRecruitment,
	cancelApplication,
	type Recruitment,
} from "../../../entities/recruitment";
import { useAsync } from "../../../shared/lib/useAsync";
import { ApiError } from "../../../shared/lib/apiError";
import { getRecruitments } from "../api/getRecruitments";
import { getMyPendingApplicationIds } from "../api/getMyPendingApplicationIds";

// 신청 시점에 게시글 상태가 이미 바뀐 경우(마감/시작됨/경합 등) 백엔드가 400 또는 409로 응답한다.
// 이 경우엔 인라인 에러 대신 토스트로 안내하고 목록을 새로고침해서 최신 상태를 반영한다.
function isStaleRecruitmentError(error: unknown): error is ApiError {
	return (
		error instanceof ApiError && (error.status === 400 || error.status === 409)
	);
}

async function loadRecruitmentsWithMyStatus(): Promise<Recruitment[]> {
	const [recruitments, myPendingIds] = await Promise.all([
		getRecruitments(),
		getMyPendingApplicationIds(),
	]);
	return recruitments.map((item) =>
		myPendingIds.has(item.id) ? { ...item, status: "applied" as const } : item,
	);
}

export function useRecruitments() {
	const {
		data: recruitments,
		setData: setRecruitments,
		isLoading,
		error,
		refetch,
	} = useAsync(
		loadRecruitmentsWithMyStatus,
		[] as Recruitment[],
		[],
		"모집글을 불러오지 못했어요.",
	);
	const [processingId, setProcessingId] = useState<number | null>(null);
	const [actionError, setActionError] = useState<string | null>(null);
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	const apply = async (id: number) => {
		if (processingId !== null) return; // 처리 중 중복 클릭 방지

		const target = recruitments.find((item) => item.id === id);
		if (!target) return;
		const isCancelling = target.status === "applied";

		setProcessingId(id);
		setActionError(null);
		try {
			if (isCancelling) {
				await cancelApplication(id);
			} else {
				await applyToRecruitment(id);
			}
			// 성공했을 때만, 방금 수행한 액션에 맞는 상태로 명시적으로 바꾼다
			// (실패 시 catch로 빠지므로 이 아래 줄은 절대 실행되지 않는다)
			const nextStatus = isCancelling ? "open" : "applied";
			setRecruitments((current) =>
				current.map((item) =>
					item.id === id ? { ...item, status: nextStatus } : item,
				),
			);
		} catch (error) {
			if (isStaleRecruitmentError(error)) {
				setToastMessage(error.message);
				void refetch();
			} else {
				setActionError(
					error instanceof Error
						? error.message
						: target.status === "applied"
							? "신청을 취소하지 못했어요. 다시 시도해 주세요."
							: "신청하지 못했어요. 다시 시도해 주세요.",
				);
			}
		} finally {
			setProcessingId(null);
		}
	};

	return {
		recruitments,
		isLoading,
		error,
		refetch,
		processingId,
		actionError,
		apply,
		toastMessage,
		dismissToast: () => setToastMessage(null),
	};
}
