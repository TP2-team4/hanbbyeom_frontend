import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/provider/AuthProvider";
import { MyProfileContent } from "../../../features/my-profile";
import Button from "../../../shared/ui/button";

export default function MyPage() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/user/login", { replace: true });
    };

    return (
        <div className="flex flex-col px-6 pb-6 pt-5">
            <MyProfileContent />
            <Button type="button" variant="secondary" className="mt-auto h-14 w-full text-secondary-400" onClick={handleLogout}>
                로그아웃
            </Button>
        </div>
    );
}
