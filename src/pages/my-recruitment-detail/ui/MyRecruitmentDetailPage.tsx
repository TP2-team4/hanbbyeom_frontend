import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getRecruitmentDetail,
	RecruitmentInfoCard,
	type RecruitmentDetail,
} from "../../../entities/recruitment";
import { ApplicantList } from "../../../features/recruitment-applicants/ui/ApplicantList";

export default function MyRecruitmentDetailPage() {
	const navigate = useNavigate();
	const { recruitmentId } = useParams();
	const [detail, setDetail] = useState<RecruitmentDetail | null>();
	const id = Number(recruitmentId);
	const isValidId = Number.isInteger(id);

	useEffect(() => {
		if (!isValidId) return;
		let isActive = true;

		const loadDetail = async () => {
			const recruitment = await getRecruitmentDetail(id);
			if (isActive) setDetail(recruitment);
		};

		void loadDetail();
		return () => {
			isActive = false;
		};
	}, [id, isValidId]);

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
				{isValidId && detail === undefined && (
					<p className="py-10 text-center text-sm text-body">
						모집글을 불러오는 중...
					</p>
				)}
				{(!isValidId || detail === null) && (
					<p className="py-10 text-center text-sm text-body">
						모집글을 찾을 수 없어요.
					</p>
				)}
				{isValidId && detail && (
					<>
						<p className="text-sm text-body">
							신청자 {detail.applicantCount}명이 기다리고 있어요.
						</p>
						<RecruitmentInfoCard recruitment={detail} />
						<ApplicantList recruitmentId={id} />
					</>
				)}
			</section>
		</main>
	);
}
