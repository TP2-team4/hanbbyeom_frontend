import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

export function InitialRedirect() {
	const { isAuthenticated, isOnboardingRequired } = useAuth();
	const destination = !isAuthenticated
		? '/user/login'
		: isOnboardingRequired
			? '/onboarding/conversation-preference'
			: '/home';

	return (
		<Navigate
			to={destination}
			replace
		/>
	);
}
