import { updateMockProfile } from "./getMyPage";

export async function updateNickname(nickname: string): Promise<void> {
	// TODO: 닉네임 수정 API가 개발되면 실제 요청으로 교체
	await new Promise((resolve) => setTimeout(resolve, 300));
	updateMockProfile({ nickname });
}
