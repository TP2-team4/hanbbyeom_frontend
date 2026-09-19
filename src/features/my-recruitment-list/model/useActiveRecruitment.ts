import type { MyRecruitmentSummary } from "../../../entities/recruitment";
import { useAsync } from "../../../shared/lib/useAsync";
import { getActiveRecruitment } from "../api/getActiveRecruitment";

export function useActiveRecruitment() {
	const { data, isLoading, error, refetch } = useAsync<MyRecruitmentSummary | null>(
		getActiveRecruitment,
		null,
		[],
		"모집 중인 내 글을 불러오지 못했어요.",
	);

	return { recruitment: data, isLoading, error, refetch };
}
