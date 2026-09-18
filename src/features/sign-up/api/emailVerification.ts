import { API_BASE_URL } from "../../../shared/lib/apiConfig";

// 인증 번호 유효시간 및 재전송 제한 추가
export const VERIFICATION_CODE_EXPIRY_SECONDS = 5 * 60;
export const VERIFICATION_RESEND_COOLDOWN_SECONDS = 60;
export const MAX_VERIFICATION_ATTEMPTS = 5;

type VerificationSession = {
	expiresAt: number;
	resendAvailableAt: number;
	failedAttempts: number;
	verified: boolean;
};

const verificationSessions = new Map<string, VerificationSession>();

export class EmailVerificationError extends Error {}

// 인증 번호 요청 및 재전송 상태 검증 추가
export async function requestEmailVerification(email: string) {
	const response = await fetch(`${API_BASE_URL}/api/auth/email-verifications`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, purpose: "SIGNUP" }),
	});

	if (!response.ok) {
		throw new EmailVerificationError("인증 코드 요청에 실패했습니다.");
	}

	//타이머
	const now = Date.now();
	const currentSession = verificationSessions.get(email);

	if (currentSession?.verified) {
		throw new EmailVerificationError("이미 인증이 완료되었습니다");
	}

	if (currentSession && now < currentSession.resendAvailableAt) {
		throw new EmailVerificationError("1분 후 다시 요청해주세요");
	}

	const expiresAt = now + VERIFICATION_CODE_EXPIRY_SECONDS * 1000;
	const resendAvailableAt = now + VERIFICATION_RESEND_COOLDOWN_SECONDS * 1000;

	// 재전송 시 기존 인증 번호 및 시도 횟수 초기화
	verificationSessions.set(email, {
		expiresAt,
		resendAvailableAt,
		failedAttempts: 0,
		verified: false,
	});

	return { email, success: true, expiresAt, resendAvailableAt };
}

// 인증 번호 만료 및 최대 입력 시도 검증 추가
export async function verifyEmail(email: string, code: string) {
	const session = verificationSessions.get(email);
	if (!session) {
		throw new EmailVerificationError("인증 코드를 먼저 요청해주세요");
	}
	if (session.verified) {
		throw new EmailVerificationError("이미 인증이 완료되었습니다");
	}
	if (Date.now() >= session.expiresAt) {
		throw new EmailVerificationError(
			"인증 코드가 만료되었습니다. 재전송 버튼을 눌러주세요",
		);
	}
	if (session.failedAttempts >= MAX_VERIFICATION_ATTEMPTS) {
		throw new EmailVerificationError(
			"시도 횟수를 초과했습니다. 인증 코드를 재전송해주세요",
		);
	}

	// 코드가 실제로 맞는지는 서버만 알 수 있으니 서버에 확인 요청
	const response = await fetch(
		`${API_BASE_URL}/api/auth/email-verifications/confirm`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, purpose: "SIGNUP", code }),
		},
	);

	if (!response.ok) {
		session.failedAttempts += 1;
		if (session.failedAttempts >= MAX_VERIFICATION_ATTEMPTS) {
			throw new EmailVerificationError(
				"시도 횟수를 초과했습니다. 인증 코드를 재전송해주세요",
			);
		}
		throw new EmailVerificationError("인증 코드가 일치하지 않습니다");
	}

	session.verified = true;
	return { verified: true };
}
