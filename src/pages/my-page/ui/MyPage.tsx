import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/provider/AuthProvider";
import { MyProfileContent } from "../../../features/my-profile";
import Button from "../../../shared/ui/button";

export default function MyPage() {
	const navigate = useNavigate();
	const { logout, triggerSessionExpired } = useAuth();

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
				{/* TODO: 실제 401 응답 감지 로직 연동 필요 - 연동되면 이 버튼 삭제 */}
				<Button
					type="button"
					variant="secondary"
					className="h-14 w-full text-secondary-400"
					onClick={triggerSessionExpired}
				>
					세션 만료 테스트
				</Button>
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
