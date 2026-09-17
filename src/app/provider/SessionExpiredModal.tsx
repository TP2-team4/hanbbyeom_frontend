import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { ConfirmModal } from "../../shared/ui/confirm-modal";

export function SessionExpiredModal() {
	const { isSessionExpired, logout } = useAuth();
	const navigation = useNavigate();

	if (!isSessionExpired) return null;

	const handleGoToLogin = () => {
		logout();
		navigation("/user/login");
	};

	return (
		<ConfirmModal
			title="세션이 만료되었어요"
			description="다시 로그인해주세요"
			cancelLabel="확인"
			confirmLabel="로그인하기"
			onCancel={handleGoToLogin}
			onConfirm={handleGoToLogin}
		/>
	);
}
