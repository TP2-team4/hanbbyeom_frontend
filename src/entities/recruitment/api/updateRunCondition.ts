import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export type UpdateRunConditionRequest = {
	courseId: number;
	meetingPoint: string;
	distanceMinMeters: number;
	distanceMaxMeters: number;
	paceMinSec: number;
	paceMaxSec: number;
};

export async function updateRunCondition(
	recruitmentId: number,
	request: UpdateRunConditionRequest,
): Promise<void> {
	const response = await authorizedFetch(
		`/api/run/conditions/${recruitmentId}`,
		{
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(request),
		},
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "러닝 조건 수정에 실패했습니다."),
		);
	}
}
