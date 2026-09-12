import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from 'react';

const ACCESS_TOKEN_KEY = 'accessToken';	// 임시 , localStorage에서 사용할 키 이름
const ONBOARDING_REQUIRED_KEY = 'onboardingRequired';

//context를 통해 제공할 데이터의 타입 
type AuthContextValue = {
	accessToken: string | null;	//현재 저장된 토큰 
	isAuthenticated: boolean;	//로그인 여부 
	login: (accessToken: string) => void;	//로그인 상태 변경 함수 
	logout: () => void;	//로그아웃 상태 변경 함수 
	isOnboardingRequired: boolean;
	startOnboarding: () => void;
	completeOnboarding: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);	// 로그인 정보를 담아 전달할 context 생성 

type AuthProviderProps = {
	children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const [accessToken, setAccessToken] = useState<string | null>(() =>
		localStorage.getItem(ACCESS_TOKEN_KEY),
	);
	const [isOnboardingRequired, setIsOnboardingRequired] = useState(
		() => localStorage.getItem(ONBOARDING_REQUIRED_KEY) === 'true',
	);

	const login = useCallback((token: string) => {
		localStorage.setItem(ACCESS_TOKEN_KEY, token);
		localStorage.removeItem(ONBOARDING_REQUIRED_KEY);
		setAccessToken(token);
		setIsOnboardingRequired(false);
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(ONBOARDING_REQUIRED_KEY);
		setAccessToken(null);
		setIsOnboardingRequired(false);
	}, []);

	const startOnboarding = useCallback(() => {
		localStorage.setItem(ONBOARDING_REQUIRED_KEY, 'true');
		setIsOnboardingRequired(true);
	}, []);

	const completeOnboarding = useCallback(() => {
		localStorage.removeItem(ONBOARDING_REQUIRED_KEY);
		setIsOnboardingRequired(false);
	}, []);

	//하위 컴포넌트에 전달할 인증 관련 값을 객체로 만들기 
	const value = useMemo<AuthContextValue>(
		() => ({
			accessToken,
			isAuthenticated: accessToken !== null,
			login,
			logout,
			isOnboardingRequired,
			startOnboarding,
			completeOnboarding,
		}),
		[
			accessToken,
			login,
			logout,
			isOnboardingRequired,
			startOnboarding,
			completeOnboarding,
		],
	);

	//AuthProvider 내부에 들어 있느 모든 컴포넌트에서 인증 정보 사용 할 수 있음. 
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//각 컴포넌트에서 인증 컨텍스트를 간편하게 꺼내기 위한 커스텀 훅 
export function useAuth() {
	const context = useContext(AuthContext);

	if (context === null) {
		throw new Error('useAuth must be used within an AuthProvider.');
	}

	return context;
}
