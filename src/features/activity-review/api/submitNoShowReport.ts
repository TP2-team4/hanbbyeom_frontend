import type { NoShowReasonCode } from "../model/types";

export type SubmitNoShowReportRequest = {
	activityMatchId: number;
	reasonCode: NoShowReasonCode;
	detail: string;
};

export async function submitNoShowReport(
	request: SubmitNoShowReportRequest,
): Promise<void> {
	// TODO: 노쇼 신고 API가 개발되면 실제 요청으로 교체
	await new Promise((resolve) => setTimeout(resolve, 400));
	console.log("노쇼 신고:", request);
}
