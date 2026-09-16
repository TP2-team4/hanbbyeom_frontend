import type { Recruitment } from "../../../entities/recruitment";
import { useAsync } from "../../../shared/lib/useAsync";
import { getRecruitments } from "../api/getRecruitments";

export function useRecruitments() {
	const {
		data: recruitments,
		setData: setRecruitments,
		isLoading,
		error,
	} = useAsync(getRecruitments, [] as Recruitment[], [], "모집글을 불러오지 못했어요.");

	const apply = (id: number) => {
		setRecruitments((current) =>
			current.map((item) => {
				if (item.id !== id) return item;
				return {
					...item,
					status: item.status === "applied" ? "open" : "applied",
				};
			}),
		);
	};

	return { recruitments, isLoading, error, apply };
}
