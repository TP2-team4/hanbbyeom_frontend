import type { MyRecruitmentSummary } from "../../../entities/recruitment";
import { useAsync } from "../../../shared/lib/useAsync";
import { getMyRecruitments } from "../api/getMyRecruitments";

export function useMyRecruitments(limit?: number,  onlyRecruiting = false,) {
	const { data, isLoading, error, refetch } = useAsync(
		() => getMyRecruitments(limit, onlyRecruiting),
		[] as MyRecruitmentSummary[],
		[limit, onlyRecruiting],
		"작성한 모집글을 불러오지 못했어요.",
	);

	return {
		recruitments: data,
		isLoading,
		error,
		refetch,
	};
}
