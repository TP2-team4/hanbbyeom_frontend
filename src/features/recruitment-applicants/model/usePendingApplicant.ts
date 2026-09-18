import { getRecruitmentApplicantProfile } from "../../../entities/user-profile";
import { useAsync } from "../../../shared/lib/useAsync";
import { getPendingApplication } from "../api/getPendingApplication";
import type { PendingApplicant } from "./types";
import { useState } from "react";
import {
	acceptApplicant,
	type AcceptApplicantResponse,
} from "../api/acceptApplicant";
import { rejectApplicant } from "../api/rejectApplicant";

export function usePendingApplicant(recruitmentId: number) {
	const [isProcessing, setIsProcessing] = useState(false);
	const [actionError, setActionError] = useState<string | null>(null);
	const [confirmedMatch, setConfirmedMatch] =
		useState<AcceptApplicantResponse | null>(null);

	const {
		data: pendingApplicant,
		setData: setPendingApplicant,
		isLoading,
		error,
	} = useAsync<PendingApplicant | null>(
		async () => {
			const application = await getPendingApplication(recruitmentId);

			if (!application) {
				return null;
			}

			const profile = await getRecruitmentApplicantProfile(
				application.activityMatchId,
			);

			if (!profile) {
				throw new Error("신청자 프로필을 불러오지 못했습니다.");
			}

			return {
				activityMatchId: application.activityMatchId,
				decisionExpiresAt: application.decisionExpiresAt,
				profile,
			};
		},
		null,
		[recruitmentId],
		"신청자 정보를 불러오지 못했어요.",
	);

	const accept = async () => {
		if (!pendingApplicant) return;

		setIsProcessing(true);
		setActionError(null);

		try {
			const result = await acceptApplicant(
				pendingApplicant.activityMatchId,
			);
			setConfirmedMatch(result);
		} catch (error) {
			setActionError(
				error instanceof Error
					? error.message
					: "수락하지 못했어요. 다시 시도해 주세요.",
			);
		} finally {
			setIsProcessing(false);
		}
	};

	const reject = async () => {
		if (!pendingApplicant) return;

		setIsProcessing(true);
		setActionError(null);

		try {
			await rejectApplicant(pendingApplicant.activityMatchId);
			setPendingApplicant(null);
		} catch (error) {
			setActionError(
				error instanceof Error
					? error.message
					: "거절하지 못했어요. 다시 시도해 주세요.",
			);
		} finally {
			setIsProcessing(false);
		}
	};

	return {
		pendingApplicant,
		isLoading,
		error,
		isProcessing,
		actionError,
		confirmedMatch,
		accept,
		reject,
	};
}
