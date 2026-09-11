import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

export function InitialRedirect() {
	const { isAuthenticated } = useAuth();

	return (
		<Navigate
			to={isAuthenticated ? '/home' : '/login'}
			replace
		/>
	);
}
