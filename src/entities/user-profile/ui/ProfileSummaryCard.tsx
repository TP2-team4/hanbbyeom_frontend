import type { UserProfile } from "../model/types";

type Props = {
    profile: UserProfile;
    onEdit?: () => void;
};

export function ProfileSummaryCard({ profile, onEdit }: Props) {
    return (
        <section className="rounded-lg border border-border bg-surface p-6" aria-labelledby="profile-nickname">
            <div className="flex items-center gap-4">
                <span aria-hidden="true" className="grid size-16 shrink-0 place-items-center rounded-full bg-primary-100 text-secondary-300">
                    <svg viewBox="0 0 24 24" className="size-8 fill-current">
                        <circle cx="12" cy="8" r="3" />
                        <path d="M6 20c.4-4.2 2.4-6 6-6s5.6 1.8 6 6Z" />
                    </svg>
                </span>
                <div className="min-w-0 flex-1">
                    <h2 id="profile-nickname" className="truncate text-2xl font-bold text-title">{profile.nickname}</h2>
                    <p className="mt-1 text-sm text-body">
                        선호 대화 수준 · {profile.conversationPreference === "SILENT" ? "조용히" : "가벼운 대화"}
                    </p>
                </div>
                <button type="button" onClick={onEdit} className="shrink-0 px-2 py-2 text-sm font-medium text-body">수정</button>
            </div>

            <dl className="mt-6 grid grid-cols-3 gap-2">
                <Stat value={profile.averageRating.toFixed(1)} label="평균 별점" />
                <Stat value={String(profile.completedActivityCount)} label="완료한 활동" />
                <Stat value={String(profile.noShowReportCount)} label="노쇼 신고" />
            </dl>
        </section>
    );
}

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col rounded-lg bg-gray-50 px-3 py-5">
            <dt className="text-xs text-body">{label}</dt>
            <dd className="-order-1 mb-1 text-2xl font-bold text-title">{value}</dd>
        </div>
    );
}
