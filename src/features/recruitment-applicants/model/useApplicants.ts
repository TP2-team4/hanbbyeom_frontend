import { useState } from "react";
import type { Applicant } from "../../../entities/recruitment";
import { useAsync } from "../../../shared/lib/useAsync";
import { acceptApplicant } from "../api/acceptApplicant";
import { getApplicants } from "../api/getApplicants";
import { rejectApplicant } from "../api/rejectApplicant";

export function useApplicants(recruitmentId: number) {
	const { data, setData, isLoading, error } = useAsync(
		() => getApplicants(recruitmentId),
		[] as Applicant[],
		[recruitmentId],
		"신청자 목록을 불러오지 못했어요.",
	);
	const [processingId, setProcessingId] = useState<number | null>(null);
	const [matchedApplicant, setMatchedApplicant] = useState<Applicant | null>(
		null,
	);
	const [actionError, setActionError] = useState<string | null>(null);

	const accept = async (applicant: Applicant) => {
		setProcessingId(applicant.id);
		setActionError(null);
		try {
			await acceptApplicant(recruitmentId, applicant.id);
			setMatchedApplicant(applicant);
		} catch {
			setActionError("수락하지 못했어요. 다시 시도해 주세요.");
		} finally {
			setProcessingId(null);
		}
	};

	const reject = async (applicant: Applicant) => {
		setProcessingId(applicant.id);
		setActionError(null);
		try {
			await rejectApplicant(recruitmentId, applicant.id);
			setData((current) => current.filter((item) => item.id !== applicant.id));
		} catch {
			setActionError("거절하지 못했어요. 다시 시도해 주세요.");
		} finally {
			setProcessingId(null);
		}
	};

	return {
		applicants: data,
		isLoading,
		error,
		processingId,
		matchedApplicant,
		actionError,
		accept,
		reject,
	};
}
