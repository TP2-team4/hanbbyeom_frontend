import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { CreatedRecruitment } from "../../../features/recruitment-create";
import { formatDate } from "../../../shared/lib/date";
import Button from "../../../shared/ui/button";

export default function RecruitmentCreateSuccessPage() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const recruitment = state as CreatedRecruitment | null;

	if (!recruitment) {
		return <Navigate to="/recruitments/new" replace />;
	}

	const handleEdit = () => {
		if (recruitment.id === null) {
			navigate("/recruitments/mine", { replace: true });
			return;
		}
		navigate(`/recruitments/${recruitment.id}/applicants`, {
			replace: true,
		});
	};

	return (
		<main className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-primary-50 px-4 pb-4 pt-6">
			<p className="px-2 text-base font-medium text-body">
				Silent Run · {recruitment.courseName}
			</p>

			<section className="flex flex-1 flex-col">
				<div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
					<div
						aria-hidden="true"
						className="grid size-40 place-items-center rounded-full bg-primary-100"
					>
						<div className="grid size-24 place-items-center rounded-full bg-primary-200">
							<div className="size-8 rounded-full bg-primary-400" />
						</div>
					</div>

					<h1 className="mt-7 text-2xl font-bold text-title">
						모집글을 올렸어요
					</h1>
					<p className="mt-2 text-sm leading-6 text-body">
						신청이 들어오면 알림으로 알려드릴게요.
						<br />
						신청자를 확인한 뒤 직접 수락하면 확정돼요.
					</p>

					<dl className="mt-6 w-full rounded-lg border border-border bg-surface px-4 py-4 text-sm">
						<div className="flex items-center justify-between gap-4">
							<dt className="text-body">코스</dt>
							<dd className="text-right text-title">
								{recruitment.courseName} · {recruitment.minDistanceKm}~
								{recruitment.maxDistanceKm}km
							</dd>
						</div>
						<div className="mt-3 flex items-center justify-between gap-4">
							<dt className="text-body">일시</dt>
							<dd className="text-right text-title">
								{formatDate(recruitment.date)} {recruitment.time}
							</dd>
						</div>
						<div className="mt-3 flex items-center justify-between gap-4">
							<dt className="text-body">대화 수준</dt>
							<dd className="text-right text-title">
								{recruitment.conversationStyleLabel}
							</dd>
						</div>
					</dl>
				</div>

				<Button
					type="button"
					variant="secondary"
					className="h-14 w-full"
					onClick={handleEdit}
				>
					모집글 수정하기
				</Button>
			</section>
		</main>
	);
}
