export type SignupRequest = {
    email: string;
    nickname: string;
    password: string;
};

export async function signup(_request: SignupRequest) {
    // TODO: 회원가입 API가 개발되면 실제 요청으로 교체
    return { success: true };
}
