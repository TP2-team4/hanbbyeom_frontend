import { useState } from "react";
import { cancelActivity } from "../api/cancelActivity";
import type { CancelReasonCode } from "./types";

export function useActivityCancel(activityMatchId: number) {
	const [selectedReason, setSelectedReason] = useState<CancelReasonCode | null>(
		null,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isCompleted, setIsCompleted] = useState(false);

	const submit = async () => {
		if (!selectedReason) return;

		setIsSubmitting(true);
		setError(null);
		try {
			await cancelActivity(activityMatchId, selectedReason);
			setIsCompleted(true);
		} catch {
			setError("활동을 취소하지 못했어요. 다시 시도해 주세요.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		selectedReason,
		setSelectedReason,
		isSubmitting,
		error,
		isCompleted,
		submit,
	};
}
