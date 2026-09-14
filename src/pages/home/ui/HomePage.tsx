import { AppHeader } from "../../../widgets/app-header";
import { BottomNavigation } from "../../../widgets/bottom-navigation";
import { useNavigate } from "react-router-dom";
import { CreateRecruitmentBanner } from "./CreateRecruitmentBanner";

export default function HomePage() {
	const navigate = useNavigate();

	return (
		<main className="mx-auto grid min-h-full w-full max-w-[430px] grid-rows-[auto_1fr_auto] bg-primary-50">
			<AppHeader />

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

				<section
					className="mt-8"
					aria-labelledby="scheduled-activity-title"
				>
					<h2
						id="scheduled-activity-title"
						className="text-xl font-bold text-title"
					>
						예정된 활동
					</h2>
					<div className="mt-4" />
				</section>
			</div>

			<BottomNavigation
				activeItem="home"
				onSelect={(item) => {
					if (item === "recruit") navigate("/recruitments");
					if (item === "chat") navigate("/chats");
					if (item === "profile") navigate("/my-page");
				}}
			/>
		</main>
	);
}
