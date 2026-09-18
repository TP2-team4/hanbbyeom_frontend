import { useNavigate } from "react-router-dom";
import { RecruitmentList } from "../../../features/recruitment-list";

export default function RecruitmentPage() {
	const navigate = useNavigate();

	return (
		<section
			aria-label="현재 모집 중인 활동"
			className="pt-5"
		>
			<RecruitmentList />
			<button
				className="fixed bottom-24 right-[max(1.5rem,calc((100vw-430px)/2+1.5rem))] z-10 flex items-center justify-center rounded-full bg-action-primary px-6 py-4 text-base font-bold text-title shadow-lg transition-colors hover:bg-primary-300 active:bg-primary-300"
				onClick={() => navigate("/recruitments/new")}
			>
				모집글 올리기
			</button>
		</section>
	);
}
