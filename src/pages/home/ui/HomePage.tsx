import { useNavigate } from "react-router-dom";
import { CreateRecruitmentBanner } from "./CreateRecruitmentBanner";
import { ScheduledActivityList } from "../../../features/scheduled-list-activity";
import { MyRecruitmentList } from "../../../features/my-recruitment-list";

export default function HomePage() {
	const navigate = useNavigate();
	return (
		<div className="px-6 pb-12 pt-9">
			<section aria-labelledby="home-recommendation-title">
				<h2
					id="home-recommendation-title"
					className="text-3xl font-bold leading-tight text-title"
				>
					오늘, 조용히
					<br />
					함께 달릴까요?
				</h2>
				<p className="mt-4 text-base leading-6 text-body">
					가까워지지 않아도, 함께 달릴 수 있어요.
				</p>
				<div className="mt-7">
					<CreateRecruitmentBanner
						onCreate={() => navigate("/recruitments/new")}
					/>
				</div>
			</section>

			<ScheduledActivityList />

			<MyRecruitmentList />
		</div>
	);
}
