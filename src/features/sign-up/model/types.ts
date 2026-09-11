export type EmailVerificationStatus =
	// 아직 인증번호를 요청하지 않았거나 이메일이 변경되어 인증이 초기화된 상태
	| "idle"
	// 인증번호 요청 API의 응답을 기다리는 상태
	| "requesting"
	// 인증번호 요청이 완료되어 사용자의 인증번호 입력을 기다리는 상태
	| "sent"
	// 입력한 인증번호가 올바른지 확인하고 있는 상태
	| "verifying"
	// 이메일 인증이 정상적으로 완료된 상태
	| "verified"
	// 인증번호 요청 과정에서 오류가 발생한 상태
	| "error";
