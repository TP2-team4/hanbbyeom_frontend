import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from 'react';

const ACCESS_TOKEN_KEY = 'accessToken';	// 임시 , localStorage에서 사용할 키 이름

//context를 통해 제공할 데이터의 타입 
type AuthContextValue = {
	accessToken: string | null;	//현재 저장된 토큰 
	isAuthenticated: boolean;	//로그인 여부 
	login: (accessToken: string) => void;	//로그인 상태 변경 함수 
	logout: () => void;	//로그아웃 상태 변경 함수 
};

const AuthContext = createContext<AuthContextValue | null>(null);	// 로그인 정보를 담아 전달할 context 생성 

type AuthProviderProps = {
	children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const [accessToken, setAccessToken] = useState<string | null>(() =>
		localStorage.getItem(ACCESS_TOKEN_KEY),
	);

	const login = useCallback((token: string) => {
		localStorage.setItem(ACCESS_TOKEN_KEY, token);
		setAccessToken(token);
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		setAccessToken(null);
	}, []);

	//하위 컴포넌트에 전달할 인증 관련 값을 객체로 만들기 
	const value = useMemo<AuthContextValue>(
		() => ({
			accessToken,
			isAuthenticated: accessToken !== null,
			login,
			logout,
		}),
		[accessToken, login, logout],
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
