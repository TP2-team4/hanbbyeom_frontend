import { useState } from "react";
import {
	applyToRecruitment,
	cancelApplication,
	type RecruitmentStatus,
} from "../../../entities/recruitment";

export function useApplication(recruitmentId: number) {
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [feedback, setFeedback] = useState<string | null>(null);

	const apply = async (): Promise<RecruitmentStatus | null> => {
		setIsProcessing(true);
		setError(null);
		try {
			await applyToRecruitment(recruitmentId);
			setFeedback("모집에 신청했어요.");
			return "applied";
		} catch {
			setError("신청하지 못했어요. 다시 시도해 주세요.");
			return null;
		} finally {
			setIsProcessing(false);
		}
	};

	const cancel = async (): Promise<RecruitmentStatus | null> => {
		setIsProcessing(true);
		setError(null);
		try {
			await cancelApplication(recruitmentId);
			setFeedback("신청을 취소했어요.");
			return "open";
		} catch {
			setError("신청을 취소하지 못했어요. 다시 시도해 주세요.");
			return null;
		} finally {
			setIsProcessing(false);
		}
	};

	return { apply, cancel, isProcessing, error, feedback };
}
