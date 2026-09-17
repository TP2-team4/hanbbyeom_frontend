import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyRecruitmentCard, type MyRecruitmentStatus } from "../../../entities/recruitment";
import { useMyRecruitments } from "../../../features/my-recruitment-list";
import { FilterTabs } from "../../../shared/ui/filter-tabs";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";

type FilterValue = "ALL" | MyRecruitmentStatus;

export default function MyRecruitmentListPage() {
	const navigate = useNavigate();
	const { recruitments, isLoading, error } = useMyRecruitments();
	const [filter, setFilter] = useState<FilterValue>("ALL");

	const filtered =
		filter === "ALL"
			? recruitments
			: recruitments.filter((r) => r.status === filter);

	return (
		<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-primary-50">
			<header className="flex h-20 shrink-0 items-center gap-2 bg-surface px-6">
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
				<h1 className="text-2xl font-bold text-title">내 모집글</h1>
			</header>

			<section className="flex-1 space-y-4 px-6 py-6" aria-live="polite">
				{!isLoading && !error && (
					<FilterTabs
						value={filter}
						onChange={setFilter}
						tabs={[
							{ value: "ALL", label: "전체", count: recruitments.length },
							{ value: "RECRUITING", label: "모집 중" },
							{ value: "CLOSED", label: "마감" },
							{ value: "CANCELLED", label: "취소" },
						]}
					/>
				)}

				<div className="space-y-2">
					{isLoading && (
						<StatusText>모집 중인 내 글을 불러오는 중...</StatusText>
					)}
					{error && <ErrorText>{error}</ErrorText>}
					{!isLoading && !error && filtered.length === 0 && (
						<StatusText>해당하는 모집글이 없어요.</StatusText>
					)}
					{!isLoading &&
						!error &&
						filtered.map((r) => (
							<MyRecruitmentCard
								key={r.id}
								recruitment={r}
								onClick={() => navigate(`/recruitments/${r.id}/applicants`)}
							/>
						))}
				</div>
			</section>
		</main>
	);
}
