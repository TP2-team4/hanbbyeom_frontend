export const TEMP_VERIFICATION_CODE = "123456";

//실제 api 개발 전 임시 모듈 (데이터 가져오는 척)
export async function requestEmailVerification(email: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { email, success: true };
}

export async function verifyEmail(code: string) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { verified: code === TEMP_VERIFICATION_CODE };
}
