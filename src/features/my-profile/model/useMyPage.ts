import { useAsync } from "../../../shared/lib/useAsync";
import { getMyPage } from "../api/getMyPage";

export function useMyPage() {
	const { data, isLoading, error, refetch } = useAsync<Awaited<ReturnType<typeof getMyPage>> | null>(
		getMyPage,
		null,
		[],
		"마이페이지를 불러오지 못했어요.",
	);

	return {
		profile: data?.profile ?? null,
		activityHistory: data?.activityHistory ?? [],
		isLoading,
		error,
		refetch,
	};
}
