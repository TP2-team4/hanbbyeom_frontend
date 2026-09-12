import type { ActivityHistory } from "../model/types";

type Props = {
    activity: ActivityHistory;
    onReview?: (id: number) => void;
};

export function ActivityHistoryItem({ activity, onReview }: Props) {
    const reviewRequired = activity.reviewStatus === "required";

    return (
        <li className="flex min-h-24 items-center gap-4 border-b border-divider px-5 py-4 last:border-b-0">
            <span aria-hidden="true" className="size-12 shrink-0 rounded-md bg-primary-100" />
            <div className="min-w-0 flex-1">
                <strong className="block truncate text-base font-bold text-title">{activity.title}</strong>
                <p className="mt-1 truncate text-sm text-body">
                    {activity.dateLabel} · {activity.distanceKm}km · 후기 작성 {reviewRequired ? "필요" : "완료"}
                </p>
            </div>
            {reviewRequired && (
                <button type="button" onClick={() => onReview?.(activity.id)} className="shrink-0 rounded-full bg-secondary-100 px-4 py-2 text-sm font-bold text-secondary-400">후기</button>
            )}
        </li>
    );
}
