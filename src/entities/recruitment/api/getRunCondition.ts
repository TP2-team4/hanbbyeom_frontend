import { authorizedFetch } from "../../../shared/lib/authorizedFetch";

export type RunCondition = {
	matchRequestId: number;
	courseId: number;
	courseName: string;
	meetingPoint: string;
	distanceMinMeters: number;
	distanceMaxMeters: number;
	paceMinSec: number;
	paceMaxSec: number;
};

export async function getRunCondition(
	recruitmentId: number,
): Promise<RunCondition | null> {
	try {
		const response = await authorizedFetch(
			`/api/run/conditions/${recruitmentId}`,
		);

		if (!response.ok) {
			return null;
		}

		return (await response.json()) as RunCondition;
	} catch {
		// 네트워크 오류(CORS 차단 등)로 fetch 자체가 실패해도 로딩 상태에 멈추지 않도록 null 반환
		return null;
	}
}
