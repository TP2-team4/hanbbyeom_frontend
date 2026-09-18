import type { Course } from "../model/types";
import { API_BASE_URL } from "../../../shared/lib/apiConfig";

export async function getCourses(): Promise<Course[]> {
	const response = await fetch(`${API_BASE_URL}/api/run/courses`);
	return response.json();
}
