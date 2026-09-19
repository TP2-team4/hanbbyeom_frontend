import type { AppliedRecruitmentSummary } from "../../../entities/recruitment";
import { useAsync } from "../../../shared/lib/useAsync";
import { getMyAppliedRecruitments } from "../api/getMyAppliedRecruitments";

export function useMyAppliedRecruitment(limit: number) {
	const { data, isLoading, error, refetch } = useAsync(
		() => getMyAppliedRecruitments(limit),
		[] as AppliedRecruitmentSummary[],
		[limit],
		"신청한 모집을 불러오지 못했어요.",
	);

	return {
		recruitments: data,
		isLoading,
		error,
		refetch,
	};
}
