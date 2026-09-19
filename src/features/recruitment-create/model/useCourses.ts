import { useAsync } from "../../../shared/lib/useAsync";
import { getCourses } from "../api/getCourses";
import type { Course } from "./types";

export function useCourses() {
	const { data, isLoading, error, refetch } = useAsync(
		getCourses,
		[] as Course[],
		[],
		"코스 목록을 불러오지 못했어요.",
	);

	return { courses: data, isLoading, error, refetch };
}
