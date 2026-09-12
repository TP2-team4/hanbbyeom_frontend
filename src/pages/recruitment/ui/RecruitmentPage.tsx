import { useNavigate } from "react-router-dom";
import { RecruitmentList } from "../../../features/recruitment-list";
import { AppHeader } from "../../../widgets/app-header";
import { BottomNavigation } from "../../../widgets/bottom-navigation";

export default function RecruitmentPage() {
    const navigate = useNavigate();

    return (
        <main className="mx-auto grid min-h-full w-full max-w-[430px] grid-rows-[auto_1fr_auto] bg-primary-50">
            <AppHeader />
            <section aria-label="현재 모집 중인 활동" className="pt-5">
                <RecruitmentList />
            </section>
            <BottomNavigation
                activeItem="recruit"
                onSelect={(item) => {
                    if (item === "home") navigate("/home");
                    if (item === "chat") navigate("/chats");
                    if (item === "profile") navigate("/my-page");
                }}
            />
        </main>
    );
}
