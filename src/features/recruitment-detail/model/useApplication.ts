import { useState } from "react";
import {
	applyToRecruitment,
	cancelApplication,
} from "../../../entities/recruitment";

export function useApplication(recruitmentId: number) {
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [feedback, setFeedback] = useState<string | null>(null);

	const apply = async (): Promise<boolean> => {
		setIsProcessing(true);
		setError(null);
		try {
			await applyToRecruitment(recruitmentId);
			setFeedback("모집에 신청했어요.");
			return true;
		} catch {
			setError("신청하지 못했어요. 다시 시도해 주세요.");
			return false;
		} finally {
			setIsProcessing(false);
		}
	};

	const cancel = async (): Promise<boolean> => {
		setIsProcessing(true);
		setError(null);
		try {
			await cancelApplication(recruitmentId);
			setFeedback("신청을 취소했어요.");
			return true;
		} catch {
			setError("신청을 취소하지 못했어요. 다시 시도해 주세요.");
			return false;
		} finally {
			setIsProcessing(false);
		}
	};

	return { apply, cancel, isProcessing, error, feedback };
}
