import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecruitmentCard } from "../../../entities/recruitment";
import { useRecruitments } from "../model/useRecruitments";
import { EMPTY_FILTERS, type RecruitmentFilters } from "../model/filterTypes";
import { RecruitmentFilterModal } from "./RecruitmentFilterModal";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { RetryButton } from "../../../shared/ui/retry-button";
import { ConfirmModal } from "../../../shared/ui/confirm-modal";
import { Toast } from "../../../shared/ui/toast";

// PR #104: 목록이 커서 페이지네이션으로 바뀌면서 서버는 "최신순" 고정 정렬만 지원.
// 날짜순/거리순은 이미 불러온 페이지 안에서만 재정렬 가능해서 무한스크롤 중 카드 순서가
// 뒤섞이는 문제가 있어 정렬 UI를 임시로 뺐다. 서버가 정렬 파라미터를 지원하게 되면 복구.
/*
import { Dropdown } from "../../../shared/ui/dropdown";
import type { Recruitment } from "../../../entities/recruitment";

type SortOption = "LATEST" | "DATE" | "DISTANCE";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
	{ value: "LATEST", label: "최신순" },
	{ value: "DATE", label: "날짜 빠른 순" },
	{ value: "DISTANCE", label: "거리 짧은 순" },
];

function sortRecruitments(recruitments: Recruitment[], sortOption: SortOption) {
	if (sortOption === "DISTANCE") {
		return [...recruitments].sort(
			(a, b) =>
				a.minDistanceKm - b.minDistanceKm ||
				a.maxDistanceKm - b.maxDistanceKm,
		);
	}
	if (sortOption === "DATE") {
		return [...recruitments].sort(
			(a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt),
		);
	}
	return recruitments;
}
*/

const FILTER_LABELS = {
	date: { TODAY: "오늘", TOMORROW: "내일", THIS_WEEKEND: "이번 주말" },
	conversationStyle: { SILENT: "조용히", LIGHT_CHAT: "가벼운 대화" },
} as const;

export function RecruitmentList() {
	const navigate = useNavigate();
	const [filters, setFilters] = useState<RecruitmentFilters>(EMPTY_FILTERS);
	const {
		recruitments,
		isLoading,
		error,
		refetch,
		loadMore,
		isLoadingMore,
		hasNext,
		processingId,
		actionError,
		apply,
		toastMessage,
		dismissToast,
	} = useRecruitments(filters);
	const [draftFilters, setDraftFilters] =
		useState<RecruitmentFilters>(EMPTY_FILTERS);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [pendingId, setPendingId] = useState<number | null>(null);
	// 응답이 대부분 아주 빨리 끝나서(로컬 목데이터 등) "처리 중" 문구가 순간적으로 깜빡이듯
	// 보이는 문제 방지 — 200ms 이상 걸릴 때만 로딩 상태를 화면에 노출한다.
	const [visibleProcessingId, setVisibleProcessingId] = useState<
		number | null
	>(null);
	useEffect(() => {
		if (processingId === null) {
			setVisibleProcessingId(null);
			return;
		}
		const timer = setTimeout(() => setVisibleProcessingId(processingId), 200);
		return () => clearTimeout(timer);
	}, [processingId]);
	const pendingRecruitment = recruitments.find(
		(item) => item.id === pendingId,
	);

	const activeFilters = getActiveFilters(filters);
	// 400/409 응답 후 refetch()로 목록을 조용히 갱신할 때, 이미 떠 있던 목록 위에
	// "불러오는 중" 문구가 끼어들면서 화면이 깜빡이는 것처럼 보이는 문제 방지 —
	// 데이터가 한 번도 없었을 때(최초 로딩)만 로딩 문구를 보여준다.
	const isInitialLoading = isLoading && recruitments.length === 0;

	const openFilter = () => {
		setDraftFilters(filters);
		setIsFilterOpen(true);
	};

	// 무한스크롤: 목록 끝의 sentinel이 화면에 보이면 다음 페이지를 불러온다
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || !hasNext) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) void loadMore();
			},
			{ rootMargin: "200px" },
		);
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [hasNext, loadMore]);

	return (
		<>
			<div className="flex items-center justify-between px-6">
				<button
					type="button"
					onClick={openFilter}
					className={`flex h-11 items-center gap-2 rounded-md border px-4 text-sm font-bold ${activeFilters.length > 0 ? "border-primary-400 bg-primary-100 text-secondary-400" : "border-border bg-surface text-body"}`}
				>
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="size-5 fill-none stroke-current"
						strokeWidth="1.8"
					>
						<path d="M4 6h16M7 12h10m-7 6h4" />
					</svg>
					필터
					{activeFilters.length > 0 && (
						<span className="grid size-7 place-items-center rounded-full bg-primary-400 text-xs text-title">
							{activeFilters.length}
						</span>
					)}
				</button>
				{/* PR #104: 서버 정렬이 최신순 고정이라 정렬 UI 임시 비활성화 (파일 상단 주석 참고)
				<Dropdown
					options={SORT_OPTIONS}
					value={sortOption}
					onChange={setSortOption}
					label="정렬 조건"
				/>
				*/}
			</div>

			{activeFilters.length > 0 && (
				<div
					className="mt-4 flex gap-2 overflow-x-auto px-6 pb-1"
					aria-label="적용된 필터"
				>
					{activeFilters.map((filter) => (
						<button
							key={filter.key}
							type="button"
							onClick={() =>
								setFilters(clearFilter(filters, filter.key))
							}
							className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-bold text-body"
						>
							{filter.label}
							<span
								aria-hidden="true"
								className="text-lg font-light"
							>
								×
							</span>
						</button>
					))}
				</div>
			)}

			{!isInitialLoading && !error && (
				<p className="px-6 pt-5 text-sm text-body">
					신청 가능한 모집글 · 내가 쓴
					글과 신청한 글은 보이지 않아요 <br/> 신청하면 작성자 수락 후
					확정돼요
				</p>
			)}

			<div className="flex flex-col gap-3 px-6 pb-32 pt-5">
				{isInitialLoading && <StatusText>모집글을 불러오는 중...</StatusText>}
				{error && (
					<div className="flex flex-col items-center gap-3 py-10">
						<ErrorText className="text-center text-sm">
							{error}
						</ErrorText>
						<RetryButton onClick={refetch} />
					</div>
				)}
				{actionError && <ErrorText>{actionError}</ErrorText>}
				{!isInitialLoading && !error && recruitments.length === 0 && (
					<StatusText>조건에 맞는 모집글이 없어요.</StatusText>
				)}
				{recruitments.map((recruitment) => (
					<RecruitmentCard
						key={recruitment.id}
						recruitment={recruitment}
						onApply={setPendingId}
						onClick={(id) => navigate(`/recruitments/${id}`)}
						isProcessing={visibleProcessingId === recruitment.id}
					/>
				))}
				{hasNext && (
					<div ref={sentinelRef} aria-hidden="true" className="h-1" />
				)}
				{isLoadingMore && <StatusText>더 불러오는 중...</StatusText>}
			</div>

			{isFilterOpen && (
				<RecruitmentFilterModal
					filters={draftFilters}
					onChange={setDraftFilters}
					onReset={() => setDraftFilters(EMPTY_FILTERS)}
					onClose={() => setIsFilterOpen(false)}
					onApply={() => {
						setFilters(draftFilters);
						setIsFilterOpen(false);
					}}
				/>
			)}

			{pendingRecruitment && (
				<ConfirmModal
					title={
						pendingRecruitment.status === "applied"
							? "신청을 취소할까요?"
							: "이 모집에 신청할까요?"
					}
					description={
						pendingRecruitment.status === "applied"
							? "취소한 후에도 모집 중이라면 다시 신청할 수 있어요."
							: "작성자가 수락하면 활동이 최종 확정돼요."
					}
					cancelLabel={
						pendingRecruitment.status === "applied"
							? "계속 기다리기"
							: "취소"
					}
					confirmLabel={
						pendingRecruitment.status === "applied"
							? "신청 취소"
							: "신청"
					}
					onCancel={() => setPendingId(null)}
					onConfirm={async () => {
						await apply(pendingRecruitment.id);
						setPendingId(null);
					}}
				/>
			)}

			{toastMessage && (
				<Toast message={toastMessage} onDismiss={dismissToast} />
			)}
		</>
	);
}

function getActiveFilters(filters: RecruitmentFilters) {
	const active: { key: keyof RecruitmentFilters; label: string }[] = [];
	if (filters.location)
		active.push({
			key: "location",
			label: filters.location.replace(" 한강공원", ""),
		});
	if (filters.date)
		active.push({ key: "date", label: FILTER_LABELS.date[filters.date] });
	if (filters.minDistanceKm !== 1 || filters.maxDistanceKm !== 20) {
		active.push({
			key: "minDistanceKm",
			label: `${filters.minDistanceKm}~${filters.maxDistanceKm}km`,
		});
	}
	if (filters.minPaceSeconds !== 300 || filters.maxPaceSeconds !== 480) {
		active.push({
			key: "minPaceSeconds",
			label: `${formatPace(filters.minPaceSeconds)}~${formatPace(filters.maxPaceSeconds)}/km`,
		});
	}
	if (filters.conversationStyle)
		active.push({
			key: "conversationStyle",
			label: FILTER_LABELS.conversationStyle[filters.conversationStyle],
		});
	return active;
}

function clearFilter(
	filters: RecruitmentFilters,
	key: keyof RecruitmentFilters,
) {
	if (key === "minDistanceKm" || key === "maxDistanceKm") {
		return { ...filters, minDistanceKm: 1, maxDistanceKm: 20 };
	}
	if (key === "minPaceSeconds" || key === "maxPaceSeconds") {
		return { ...filters, minPaceSeconds: 300, maxPaceSeconds: 480 };
	}
	return { ...filters, [key]: null };
}

function formatPace(totalSeconds: number) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = String(totalSeconds % 60).padStart(2, "0");
	return `${minutes}'${seconds}"`;
}
