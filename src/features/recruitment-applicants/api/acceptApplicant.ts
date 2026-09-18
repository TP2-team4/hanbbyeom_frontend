import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export type AcceptApplicantResponse = {
	activityMatchId: number;
	meetingCode: string;
	confirmedAt: string;
};

export async function acceptApplicant(activityMatchId: number) {
	const response = await authorizedFetch(
		`/api/matching/matches/${activityMatchId}/accept`,
		{ method: "POST" },
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "신청자 수락에 실패했습니다."),
		);
	}

	return response.json() as Promise<AcceptApplicantResponse>;
}
