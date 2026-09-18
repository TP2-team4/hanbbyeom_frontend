import { API_BASE_URL } from "../../../shared/lib/apiConfig";

export const TEMP_PASSWORD_RESET_CODE = "123456";

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

export class PasswordResetError extends Error {}

export async function requestPasswordResetCode(email: string) {
	const now = Date.now();
	const currentSession = verificationSessions.get(email);
	if (currentSession && now < currentSession.resendAvailableAt) {
		throw new PasswordResetError("1분 후 다시 요청해주세요.");
	}

	const response = await fetch(`${API_BASE_URL}/api/auth/email-verifications`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, purpose: "PASSWORD_RESET" }),
	});

	if (!response.ok) {
		throw new PasswordResetError("인증번호 요청에 실패했어요.");
	}

	verificationSessions.set(email, {
		expiresAt: now + VERIFICATION_CODE_EXPIRY_SECONDS * 1000,
		resendAvailableAt: now + VERIFICATION_RESEND_COOLDOWN_SECONDS * 1000,
		failedAttempts: 0,
		verified: false,
	});

	return { email, success: true };
}

export async function verifyPasswordResetCode(email: string, code: string) {
	const session = verificationSessions.get(email);
	if (!session) {
		throw new PasswordResetError("인증번호를 먼저 요청해주세요.");
	}
	if (Date.now() >= session.expiresAt) {
		throw new PasswordResetError(
			"인증번호가 만료됐어요. 재전송 버튼을 눌러주세요.",
		);
	}
	if (session.failedAttempts >= MAX_VERIFICATION_ATTEMPTS) {
		throw new PasswordResetError(
			"시도 횟수를 초과했어요. 인증번호를 재전송해주세요.",
		);
	}

	const response = await fetch(
		`${API_BASE_URL}/api/auth/email-verifications/confirm`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, purpose: "PASSWORD_RESET", code }),
		},
	);

	if (!response.ok) {
		session.failedAttempts += 1;
		return { verified: false };
	}

	session.verified = true;
	return { verified: true };
}

export async function resetPassword(_email: string, _password: string) {
	// TODO: 비밀번호 변경 API 연동 필요 (백엔드 명세에 이 엔드포인트 자체가 아직 없음)
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true };
}
