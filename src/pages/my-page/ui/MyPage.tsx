import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/provider/AuthProvider";
import { MyProfileContent } from "../../../features/my-profile";
import Button from "../../../shared/ui/button";
import { AppHeader } from "../../../widgets/app-header";
import { BottomNavigation } from "../../../widgets/bottom-navigation";

export default function MyPage() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/user/login", { replace: true });
    };

    return (
        <main className="mx-auto grid min-h-full w-full max-w-[430px] grid-rows-[auto_1fr_auto] bg-primary-50">
            <AppHeader />
            <div className="flex flex-col px-6 pb-6 pt-5">
                <MyProfileContent />
                <Button type="button" variant="secondary" className="mt-auto h-14 w-full text-secondary-400" onClick={handleLogout}>
                    로그아웃
                </Button>
            </div>
            <BottomNavigation
                activeItem="profile"
                onSelect={(item) => {
                    if (item === "home") navigate("/home");
                    if (item === "recruit") navigate("/recruitments");
                    if (item === "chat") navigate("/chats");
                }}
            />
        </main>
    );
}
