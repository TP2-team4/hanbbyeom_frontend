import { useEffect, useState } from "react";
import type { MyRecruitmentSummary } from "../../../entities/recruitment";
import { getMyRecruitments } from "../api/getMyRecruitments";

export function useMyRecruitments(limit: number) {
	const [recruitments, setRecruitments] = useState<MyRecruitmentSummary[]>(
		[],
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isActive = true;

		const loadRecruitments = async () => {
			try {
				const response = await getMyRecruitments(limit);
				if (isActive) setRecruitments(response);
			} catch {
				if (isActive) setError("작성한 모집글을 불러오지 못했어요.");
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
