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
		<div className="flex min-h-full flex-col">
			<div className="flex-1 px-6 pb-6 pt-5">
				<MyProfileContent />
			</div>
			<footer className="p-4">
				<Button
					type="button"
					variant="secondary"
					className="h-14 w-full text-secondary-400"
					onClick={handleLogout}
				>
					로그아웃
				</Button>
			</footer>
		</div>
	);
}
