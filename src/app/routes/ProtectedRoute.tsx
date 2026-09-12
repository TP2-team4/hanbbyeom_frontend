import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

export function ProtectedRoute() {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return (
			<Navigate
				to="/user/login"
				replace
			/>
		);
	}

	return <Outlet />;
}
