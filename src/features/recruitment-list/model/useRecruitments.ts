import { useState } from "react";
import {
	applyToRecruitment,
	cancelApplication,
	type Recruitment,
} from "../../../entities/recruitment";
import { useAsync } from "../../../shared/lib/useAsync";
import { getRecruitments } from "../api/getRecruitments";

export function useRecruitments() {
	const {
		data: recruitments,
		setData: setRecruitments,
		isLoading,
		error,
	} = useAsync(getRecruitments, [] as Recruitment[], [], "모집글을 불러오지 못했어요.");
	const [processingId, setProcessingId] = useState<number | null>(null);
	const [actionError, setActionError] = useState<string | null>(null);

	const apply = async (id: number) => {
		const target = recruitments.find((item) => item.id === id);
		if (!target) return;

		setProcessingId(id);
		setActionError(null);
		try {
			if (target.status === "applied") {
				await cancelApplication(id);
			} else {
				await applyToRecruitment(id);
			}
			setRecruitments((current) =>
				current.map((item) => {
					if (item.id !== id) return item;
					return {
						...item,
						status: item.status === "applied" ? "open" : "applied",
					};
				}),
			);
		} catch (error) {
			setActionError(
				error instanceof Error
					? error.message
					: target.status === "applied"
						? "신청을 취소하지 못했어요. 다시 시도해 주세요."
						: "신청하지 못했어요. 다시 시도해 주세요.",
			);
		} finally {
			setProcessingId(null);
		}
	};

	return { recruitments, isLoading, error, processingId, actionError, apply };
}
