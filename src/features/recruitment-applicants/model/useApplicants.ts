import type { Applicant } from "../../../entities/recruitment";
import { useAsync } from "../../../shared/lib/useAsync";
import { getApplicants } from "../api/getApplicants";

export function useApplicants(recruitmentId: number) {
	const { data, isLoading, error } = useAsync(
		() => getApplicants(recruitmentId),
		[] as Applicant[],
		[recruitmentId],
		"신청자 목록을 불러오지 못했어요.",
	);

	return {
		applicants: data,
		isLoading,
		error,
	};
}
