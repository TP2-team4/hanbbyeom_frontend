import type { MyRecruitmentSummary } from "../../../entities/recruitment";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";
import {
	toMyRecruitment,
	type MyRecruitmentResponse,
} from "./getMyRecruitments";

export async function getActiveRecruitment(): Promise<MyRecruitmentSummary | null> {
	const response = await authorizedFetch("/api/matching/requests/me");

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(
				response,
				"모집 중인 내 글을 불러오지 못했어요.",
			),
		);
	}

	const body: MyRecruitmentResponse = await response.json();
	return toMyRecruitment(body);
}
