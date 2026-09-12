import { useAuth } from '../../app/provider/AuthProvider';
import Button from '../../shared/ui/button';

export default function HomePage() {
	const { logout } = useAuth();

	return (
		<main className="p-6">
			<Button type="button" variant="secondary" onClick={logout}>
				로그아웃
			</Button>
		</main>
	);
}
