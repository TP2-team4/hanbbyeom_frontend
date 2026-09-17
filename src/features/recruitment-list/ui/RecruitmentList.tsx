import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	RecruitmentCard,
	type Recruitment,
} from "../../../entities/recruitment";
import { useRecruitments } from "../model/useRecruitments";
import { EMPTY_FILTERS, type RecruitmentFilters } from "../model/filterTypes";
import { RecruitmentFilterModal } from "./RecruitmentFilterModal";
import { Dropdown } from "../../../shared/ui/dropdown";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { ConfirmModal } from "../../../shared/ui/confirm-modal";

type SortOption = "LATEST" | "DATE" | "DISTANCE";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
	{ value: "LATEST", label: "최신순" },
	{ value: "DATE", label: "날짜 빠른 순" },
	{ value: "DISTANCE", label: "거리 짧은 순" },
];

const FILTER_LABELS = {
	date: { TODAY: "오늘", TOMORROW: "내일", THIS_WEEKEND: "이번 주말" },
	conversationStyle: { SILENT: "조용히", LIGHT_CHAT: "가벼운 대화" },
} as const;

export function RecruitmentList() {
	const navigate = useNavigate();
	const { recruitments, isLoading, error, processingId, actionError, apply } =
		useRecruitments();
	const [filters, setFilters] = useState<RecruitmentFilters>(EMPTY_FILTERS);
	const [draftFilters, setDraftFilters] =
		useState<RecruitmentFilters>(EMPTY_FILTERS);
	const [sortOption, setSortOption] = useState<SortOption>("LATEST");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [pendingId, setPendingId] = useState<number | null>(null);
	const pendingRecruitment = recruitments.find((item) => item.id === pendingId);

	const filteredRecruitments = useMemo(() => {
		return sortRecruitments(
			filterRecruitments(recruitments, filters),
			sortOption,
		);
	}, [filters, recruitments, sortOption]);

	const draftResultCount = useMemo(
		() => filterRecruitments(recruitments, draftFilters).length,
		[draftFilters, recruitments],
	);
	const activeFilters = getActiveFilters(filters);

	const openFilter = () => {
		setDraftFilters(filters);
		setIsFilterOpen(true);
	};

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
				<Dropdown
					options={SORT_OPTIONS}
					value={sortOption}
					onChange={setSortOption}
					label="정렬 조건"
				/>
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

			{!isLoading && !error && (
				<p className="px-6 pt-5 text-sm text-body">
					내 조건과 맞는 모집글 {filteredRecruitments.length}건 ·
					신청하면 작성자 수락 후 확정돼요
				</p>
			)}

			<div className="flex flex-col gap-3 px-6 pb-10 pt-5">
				{isLoading && <StatusText>모집글을 불러오는 중...</StatusText>}
				{error && (
					<ErrorText className="py-10 text-center text-sm">
						{error}
					</ErrorText>
				)}
				{actionError && <ErrorText>{actionError}</ErrorText>}
				{!isLoading && !error && filteredRecruitments.length === 0 && (
					<StatusText>조건에 맞는 모집글이 없어요.</StatusText>
				)}
				{filteredRecruitments.map((recruitment) => (
					<RecruitmentCard
						key={recruitment.id}
						recruitment={recruitment}
						onApply={setPendingId}
						onClick={(id) => navigate(`/recruitments/${id}`)}
						isProcessing={processingId === recruitment.id}
					/>
				))}
			</div>

			{isFilterOpen && (
				<RecruitmentFilterModal
					filters={draftFilters}
					resultCount={draftResultCount}
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
						pendingRecruitment.status === "applied" ? "계속 기다리기" : "취소"
					}
					confirmLabel={
						pendingRecruitment.status === "applied" ? "신청 취소" : "신청"
					}
					onCancel={() => setPendingId(null)}
					onConfirm={async () => {
						await apply(pendingRecruitment.id);
						setPendingId(null);
					}}
				/>
			)}
		</>
	);
}

function filterRecruitments(
	recruitments: Recruitment[],
	filters: RecruitmentFilters,
) {
	return recruitments.filter((item) => {
		if (filters.location && item.location !== filters.location)
			return false;
		if (
			item.maxDistanceKm < filters.minDistanceKm ||
			item.minDistanceKm > filters.maxDistanceKm
		)
			return false;
		if (
			item.maxPaceSeconds < filters.minPaceSeconds ||
			item.minPaceSeconds > filters.maxPaceSeconds
		)
			return false;
		if (
			filters.conversationStyle &&
			item.conversationStyle !== filters.conversationStyle
		)
			return false;
		if (filters.date && !matchesDateFilter(item.startsAt, filters.date))
			return false;
		return true;
	});
}

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

function matchesDateFilter(
	startsAt: string,
	filter: NonNullable<RecruitmentFilters["date"]>,
) {
	const target = new Date(startsAt);
	const today = new Date();
	if (filter === "TODAY") {
		return target.toDateString() === today.toDateString();
	}
	if (filter === "TOMORROW") {
		const tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + 1);
		return target.toDateString() === tomorrow.toDateString();
	}
	const saturday = new Date(today);
	const daysUntilSaturday = (6 - today.getDay() + 7) % 7;
	saturday.setDate(today.getDate() + daysUntilSaturday);
	saturday.setHours(0, 0, 0, 0);
	const monday = new Date(saturday);
	monday.setDate(saturday.getDate() + 2);
	return target >= saturday && target < monday;
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
