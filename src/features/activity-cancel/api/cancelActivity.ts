import type { CancelReasonCode } from "../model/types";

export async function cancelActivity(
	activityMatchId: number,
	reasonCode: CancelReasonCode,
): Promise<void> {
	// TODO: 활동 취소 API가 개발되면 실제 요청으로 교체 (백엔드에 아직 해당 엔드포인트 없음)
	await new Promise((resolve) => setTimeout(resolve, 400));
	console.log("활동 취소:", { activityMatchId, reasonCode });
}
