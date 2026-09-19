import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";
import type { NoShowReasonCode } from "../model/types";

export type SubmitNoShowReportRequest = {
	activityMatchId: number;
	reasonCode: NoShowReasonCode;
	detail: string;
};

export async function submitNoShowReport(
	request: SubmitNoShowReportRequest,
): Promise<void> {
	const response = await authorizedFetch(
		`/api/matching/matches/${request.activityMatchId}/no-show-report`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				reason: request.reasonCode,
				detail: request.detail || null,
			}),
		},
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "신고를 접수하지 못했습니다."),
		);
	}
}