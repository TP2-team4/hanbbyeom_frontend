import type { Course } from "../model/types";

export async function getCourses(): Promise<Course[]> {
	const response = await fetch("/api/run/courses");
	return response.json();
}
