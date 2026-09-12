import Button from "../../../shared/ui/button";
import type { FeaturedActivity } from "../model/types";

type Props = {
    activity: FeaturedActivity;
    onCreateRecruitment?: () => void;
};

export function FeaturedActivityCard({ activity, onCreateRecruitment }: Props) {
    return (
        <article className="rounded-lg border border-border bg-surface px-5 py-6">
            <div className="flex items-center gap-3">
                <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full bg-primary-400"
                />
                <h2 className="text-2xl font-bold text-title">
                    {activity.title}
                </h2>
            </div>
            <p className="mt-3 text-base leading-6 text-body">
                {activity.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="활동 조건">
                {activity.tags.map((tag) => (
                    <li
                        key={tag}
                        className="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-secondary-400"
                    >
                        {tag}
                    </li>
                ))}
            </ul>
            <Button
                type="button"
                className="mt-5 h-14 w-full"
                onClick={onCreateRecruitment}
            >
                모집글 올리기
            </Button>
        </article>
    );
}
