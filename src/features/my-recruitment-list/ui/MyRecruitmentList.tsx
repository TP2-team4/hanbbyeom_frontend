import { useNavigate } from "react-router-dom";
import { MyRecruitmentCard } from "../../../entities/recruitment";
import { useMyRecruitments } from "../model/useMyRecruitments";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { RetryButton } from "../../../shared/ui/retry-button";

export function MyRecruitmentList() {
	const navigate = useNavigate();
	const { recruitments, isLoading, error, refetch } = useMyRecruitments(3);

	return (
		<section className="mt-8" aria-labelledby="my-recruitment-title">
			<div className="flex items-center justify-between">
				<h2
					id="my-recruitment-title"
					className="text-xl font-bold text-title"
				>
					모집 중인 내 글
				</h2>
				<button
					type="button"
					onClick={() => navigate("/recruitments/mine")}
					className="flex items-center text-sm font-medium text-body"
				>
					전체 보기
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="size-4 fill-none stroke-current"
						strokeWidth="2"
					>
						<path d="m9 5 7 7-7 7" />
					</svg>
				</button>
			</div>
			<div className="flex flex-col gap-2 mt-4">
				{isLoading && <StatusText>모집 중인 내 글을 불러오는 중...</StatusText>}
				{error && (
					<div className="flex items-center gap-2">
						<ErrorText>{error}</ErrorText>
						<RetryButton
							onClick={refetch}
							className="shrink-0 px-3 py-1"
						/>
					</div>
				)}
				{!isLoading &&
					!error &&
					recruitments.map((r) => (
						<MyRecruitmentCard
							key={r.id}
							recruitment={r}
							onClick={() => navigate(`/recruitments/${r.id}/applicants`)}
						/>
					))}
			</div>
		</section>
	);
}
