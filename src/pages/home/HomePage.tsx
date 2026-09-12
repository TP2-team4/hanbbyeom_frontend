import { useAuth } from '../../app/provider/AuthProvider';
import Button from '../../shared/ui/button';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/user/login', { replace: true });
	};

	return (
		<main className="p-6">
			<Button type="button" variant="secondary" onClick={handleLogout}>
				로그아웃
			</Button>
		</main>
	);
}
