import { API_BASE_URL } from "../../../shared/lib/apiConfig";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export const VERIFICATION_CODE_EXPIRY_SECONDS = 5 * 60;
export const VERIFICATION_RESEND_COOLDOWN_SECONDS = 60;
export const MAX_VERIFICATION_ATTEMPTS = 5;
export const PASSWORD_RESET_WINDOW_SECONDS = 10 * 60;
export const MAX_PASSWORD_RESET_ATTEMPTS = 3;

type VerificationSession = {
	expiresAt: number;
	resendAvailableAt: number;
	failedAttempts: number;
	verified: boolean;
	verifiedAt: number | null;
	resetAttempts: number;
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

	const expiresAt = now + VERIFICATION_CODE_EXPIRY_SECONDS * 1000;
	const resendAvailableAt = now + VERIFICATION_RESEND_COOLDOWN_SECONDS * 1000;

	verificationSessions.set(email, {
		expiresAt,
		resendAvailableAt,
		failedAttempts: 0,
		verified: false,
		verifiedAt: null,
		resetAttempts: 0,
	});

	return { email, success: true, expiresAt, resendAvailableAt };
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
		if (session.failedAttempts >= MAX_VERIFICATION_ATTEMPTS) {
			throw new PasswordResetError(
				"시도 횟수를 초과했어요. 인증번호를 재전송해주세요.",
			);
		}
		throw new PasswordResetError("인증번호가 일치하지 않아요.");
	}

	session.verified = true;
	session.verifiedAt = Date.now();
	session.resetAttempts = 0;
	return { verified: true };
}

export async function resetPassword(
	email: string,
	code: string,
	newPassword: string,
): Promise<void> {
	const session = verificationSessions.get(email);
	if (!session || !session.verified || session.verifiedAt === null) {
		throw new PasswordResetError("인증을 먼저 완료해주세요.");
	}
	if (Date.now() - session.verifiedAt >= PASSWORD_RESET_WINDOW_SECONDS * 1000) {
		throw new PasswordResetError(
			"인증 시간이 만료됐어요. 처음부터 다시 시도해주세요.",
		);
	}
	if (session.resetAttempts >= MAX_PASSWORD_RESET_ATTEMPTS) {
		throw new PasswordResetError(
			"시도 횟수를 초과했어요. 처음부터 다시 시도해주세요.",
		);
	}

	session.resetAttempts += 1;

	const response = await fetch(`${API_BASE_URL}/api/auth/password-reset`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, code, newPassword }),
	});

	if (!response.ok) {
		throw new PasswordResetError(
			await extractErrorMessage(response, "비밀번호를 변경하지 못했어요."),
		);
	}

	verificationSessions.delete(email);
}
