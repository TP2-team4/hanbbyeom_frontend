import {
    FeaturedActivityCard,
    ScheduledActivityCard,
    type FeaturedActivity,
    type ScheduledActivity,
} from "../../entities/activity";
import { AppHeader } from "../../widgets/app-header";
import { BottomNavigation } from "../../widgets/bottom-navigation";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const featuredActivity: FeaturedActivity = {
        title: "Silent Run",
        description: "서로 말 없이 페이스만 맞춰 달려요.",
        tags: ["5개 코스", "1~20km"],
    };

    const scheduledActivity: ScheduledActivity = {
        month: 9,
        day: 12,
        title: "Silent Run · 뚝섬",
        time: "금 07:00",
        distance: "8km",
        conversationStyle: "조용한러너",
    };

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
                        조건만 정하면 나머지는 한뼘이 맞춰요.
                    </p>
                    <div className="mt-7">
                        <FeaturedActivityCard activity={featuredActivity} />
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
                    <div className="mt-4">
                        {/* 샘플 */}
                        <ScheduledActivityCard activity={scheduledActivity} />
                    </div>
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
