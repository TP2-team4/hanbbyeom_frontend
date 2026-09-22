import { useState } from "react";
import { submitActivityReview } from "../api/submitActivityReview";
import { submitNoShowReport } from "../api/submitNoShowReport";
import type { NoShowReasonCode, TalkLevel } from "./types";

export type ReviewStep = "confirm" | "review" | "noshow" | "done";

export function useActivityReview(activityMatchId: number) {
	const [step, setStep] = useState<ReviewStep>("confirm");
	const [met, setMet] = useState<boolean | null>(null);

	const [rating, setRating] = useState(0);
	const [talkLevel, setTalkLevel] = useState<TalkLevel>("SILENT");
	const [comment, setComment] = useState("");

	const [reasonCode, setReasonCode] = useState<NoShowReasonCode | null>(null);
	const [detail, setDetail] = useState("");

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const proceedFromConfirm = () => {
		if (met === null) return;
		setStep(met ? "review" : "noshow");
	};

	const submitReview = async () => {
		if (rating === 0) return;

		setIsSubmitting(true);
		setError(null);
		try {
			await submitActivityReview({
				activityMatchId,
				rating,
				talkLevel,
				comment,
			});
			setStep("done");
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "후기를 등록하지 못했어요. 다시 시도해 주세요.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const submitReport = async () => {
		if (!reasonCode) return;

		setIsSubmitting(true);
		setError(null);
		try {
			await submitNoShowReport({ activityMatchId, reasonCode, detail });
			setStep("done");
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "신고를 접수하지 못했어요. 다시 시도해 주세요.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		step,
		setStep,
		met,
		setMet,
		proceedFromConfirm,
		rating,
		setRating,
		talkLevel,
		setTalkLevel,
		comment,
		setComment,
		submitReview,
		reasonCode,
		setReasonCode,
		detail,
		setDetail,
		submitReport,
		isSubmitting,
		error,
	};
}
