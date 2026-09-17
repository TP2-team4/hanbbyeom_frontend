// AuthProvider(React 트리 안)와 api/*.ts(React 밖의 순수 함수) 사이를 잇는 최소한의 이벤트 통로.
// api 함수가 401을 받으면 이걸 통해 AuthProvider의 triggerSessionExpired()를 호출한다.
type Listener = () => void;

let listener: Listener | null = null;

export function setSessionExpiredListener(fn: Listener | null) {
	listener = fn;
}

export function notifySessionExpired() {
	listener?.();
}
