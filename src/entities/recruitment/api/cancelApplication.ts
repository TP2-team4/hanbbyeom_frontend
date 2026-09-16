export async function cancelApplication(recruitmentId: number) {
	// TODO: 모집 신청 취소 API 연동 필요
	await new Promise((resolve) => setTimeout(resolve, 300));
	return { recruitmentId, success: true };
}
