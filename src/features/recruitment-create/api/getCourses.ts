import type { Course } from "../model/types";
import { extractErrorMessage } from "../../../shared/lib/apiError";
import { API_BASE_URL } from "../../../shared/lib/apiConfig";

export async function getCourses(): Promise<Course[]> {
	const response = await fetch(`${API_BASE_URL}/api/run/courses`);
	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "코스 목록을 불러오지 못했어요."),
		);
	}

	return response.json();
}
