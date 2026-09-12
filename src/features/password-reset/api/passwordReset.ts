export const TEMP_PASSWORD_RESET_CODE = "123456";

export async function requestPasswordResetCode(email: string) {
    // TODO: 비밀번호 재설정 API가 개발되면 실제 요청으로 교체
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { email, success: true };
}

export async function verifyPasswordResetCode(code: string) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { verified: code === TEMP_PASSWORD_RESET_CODE };
}

export async function resetPassword(_email: string, _password: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
}
