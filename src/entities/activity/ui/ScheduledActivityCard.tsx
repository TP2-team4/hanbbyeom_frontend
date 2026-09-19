import type { ScheduledActivity } from "../model/types";

type Props = {
    activity: ScheduledActivity;
    onClick?: () => void;
};

export function ScheduledActivityCard({ activity, onClick }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center gap-4 rounded-lg border border-border bg-surface px-4 py-5 text-left"
        >
            <span className="flex size-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary-100 text-secondary-400">
                <span className="text-xs font-medium">{activity.month}월</span>
                <strong className="mt-1 text-xl font-bold text-title">
                    {activity.day}
                </strong>
            </span>
            <span className="min-w-0 flex-1">
                <strong className="block truncate text-lg font-bold text-title">
                    {activity.title}
                </strong>
                <span className="mt-1 block truncate text-sm text-body">
                    {activity.time} · {activity.location}
                </span>
            </span>
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-6 shrink-0 fill-none stroke-gray-400"
                strokeWidth="2"
            >
                <path d="m9 5 7 7-7 7" />
            </svg>
        </button>
    );
}
