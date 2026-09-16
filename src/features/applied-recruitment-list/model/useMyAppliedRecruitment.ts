import { useEffect, useState } from "react";
import type { AppliedRecruitmentSummary } from "../../../entities/recruitment";
import { getMyAppliedRecruitments } from "../api/getMyAppliedRecruitments";

export function useMyAppliedRecruitment(limit: number) {
	const [recruitments, setRecruitments] = useState<
		AppliedRecruitmentSummary[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isActive = true;

		const loadRecruitments = async () => {
			try {
				const response = await getMyAppliedRecruitments(limit);
				if (isActive) setRecruitments(response);
			} catch {
				if (isActive) setError("신청한 모집을 불러오지 못했어요.");
			} finally {
				if (isActive) setIsLoading(false);
			}
		};

		void loadRecruitments();

		return () => {
			isActive = false;
		};
	}, [limit]);

	return {
		recruitments,
		isLoading,
		error,
	};
}
