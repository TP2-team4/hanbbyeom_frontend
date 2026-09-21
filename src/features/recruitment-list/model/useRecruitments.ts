import { useCallback, useEffect, useRef, useState } from "react";
import {
	applyToRecruitment,
	cancelApplication,
	type Recruitment,
} from "../../../entities/recruitment";
import { ApiError } from "../../../shared/lib/apiError";
import { getRecruitments } from "../api/getRecruitments";
import { getMyPendingApplicationIds } from "../api/getMyPendingApplicationIds";
import type { RecruitmentFilters } from "./filterTypes";

const PAGE_SIZE = 20;

// 신청 시점에 게시글 상태가 이미 바뀐 경우(마감/시작됨/경합 등) 백엔드가 400 또는 409로 응답한다.
// 이 경우엔 인라인 에러 대신 토스트로 안내하고 목록을 새로고침해서 최신 상태를 반영한다.
function isStaleRecruitmentError(error: unknown): error is ApiError {
	return (
		error instanceof ApiError && (error.status === 400 || error.status === 409)
	);
}

async function fetchPageWithMyStatus(
	filters: RecruitmentFilters,
	cursor?: number,
) {
	const [{ recruitments, nextCursor, hasNext }, myPendingIds] =
		await Promise.all([
			getRecruitments(filters, { cursor, size: PAGE_SIZE }),
			getMyPendingApplicationIds(),
		]);
	return {
		items: recruitments.map((item) =>
			myPendingIds.has(item.id) ? { ...item, status: "applied" as const } : item,
		),
		nextCursor,
		hasNext,
	};
}

export function useRecruitments(filters: RecruitmentFilters) {
	const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [nextCursor, setNextCursor] = useState<number | null>(null);
	const [hasNext, setHasNext] = useState(false);
	const requestId = useRef(0);

	const loadFirstPage = useCallback(async () => {
		const currentRequest = ++requestId.current;
		setIsLoading(true);
		setError(null);
		try {
			const page = await fetchPageWithMyStatus(filters);
			if (currentRequest !== requestId.current) return;
			setRecruitments(page.items);
			setNextCursor(page.nextCursor);
			setHasNext(page.hasNext);
		} catch (e) {
			if (currentRequest !== requestId.current) return;
			setError(e instanceof Error ? e.message : "모집글을 불러오지 못했어요.");
		} finally {
			if (currentRequest === requestId.current) setIsLoading(false);
		}
		// filters가 바뀌면(=적용 버튼 클릭) 커서 없이 첫 페이지부터 다시 불러온다
	}, [filters]);

	useEffect(() => {
		void loadFirstPage();
		return () => {
			requestId.current += 1;
		};
	}, [loadFirstPage]);

	const loadMore = useCallback(async () => {
		if (isLoadingMore || !hasNext || nextCursor === null) return;
		const currentRequest = requestId.current;
		setIsLoadingMore(true);
		try {
			const page = await fetchPageWithMyStatus(filters, nextCursor);
			if (currentRequest !== requestId.current) return;
			setRecruitments((current) => [...current, ...page.items]);
			setNextCursor(page.nextCursor);
			setHasNext(page.hasNext);
		} catch (e) {
			if (currentRequest !== requestId.current) return;
			setError(
				e instanceof Error ? e.message : "모집글을 더 불러오지 못했어요.",
			);
		} finally {
			if (currentRequest === requestId.current) setIsLoadingMore(false);
		}
	}, [filters, hasNext, isLoadingMore, nextCursor]);

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
				void loadFirstPage();
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
		refetch: loadFirstPage,
		loadMore,
		isLoadingMore,
		hasNext,
		processingId,
		actionError,
		apply,
		toastMessage,
		dismissToast: () => setToastMessage(null),
	};
}
