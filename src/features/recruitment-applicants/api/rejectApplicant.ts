export async function rejectApplicant(recruitmentId: number, applicantId: number) {
	// TODO: 신청자 거절 API 연동 필요 (호스트 수락/거절 API가 백엔드에 아직 없음)
	await new Promise((resolve) => setTimeout(resolve, 400));
	return { recruitmentId, applicantId, success: true };
}
