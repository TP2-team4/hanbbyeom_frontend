import { useState } from "react";
import { cancelRecruitment } from "../../../entities/recruitment";

export function useCancelRecruitment(recruitmentId: number) {
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const cancel = async (): Promise<boolean> => {
		setIsProcessing(true);
		setError(null);

		try {
			await cancelRecruitment(recruitmentId);
			return true;
		} catch {
			setError("모집을 취소하지 못했어요. 다시 시도해 주세요.");
			return false;
		} finally {
			setIsProcessing(false);
		}
	};

	return {
		cancel,
		isProcessing,
		error,
	};
}
