import type { RecentReview } from "../model/types";

const TALK_LEVEL_LABEL: Record<"SILENT" | "LIGHT_CHAT", string> = {
	SILENT: "조용히",
	LIGHT_CHAT: "가벼운 대화",
};

type Props = {
	reviews: RecentReview[];
};

export function RecentReviewList({ reviews }: Props) {
	if (reviews.length === 0) {
		return <p className="text-sm text-body">아직 받은 후기가 없어요.</p>;
	}

	return (
		<ul className="flex flex-col gap-3">
			{reviews.map((review, index) => (
				<li
					key={index}
					className="rounded-lg border border-border bg-surface px-4 py-3"
				>
					<div className="flex items-center justify-between">
						<span className="text-sm font-bold text-title">
							★ {review.rating}
						</span>
						<span className="text-xs text-body">
							{TALK_LEVEL_LABEL[review.perceivedTalkLevel]}
						</span>
					</div>
					<p className="mt-1 text-xs text-body">
						{review.courseName} · {review.minDistanceKm}~
						{review.maxDistanceKm}km
					</p>
					{review.comment && (
						<p className="mt-2 text-sm text-title">{review.comment}</p>
					)}
				</li>
			))}
		</ul>
	);
}
