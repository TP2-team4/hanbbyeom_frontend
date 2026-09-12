import Button from "../../../shared/ui/button";
import type {
    DateFilter,
    RecruitmentFilters,
} from "../model/filterTypes";
import type { ConversationStyle } from "../../../entities/recruitment";

type Props = {
    filters: RecruitmentFilters;
    resultCount: number;
    onChange: (filters: RecruitmentFilters) => void;
    onReset: () => void;
    onClose: () => void;
    onApply: () => void;
};

const LOCATIONS = ["뚝섬 한강공원", "여의도 한강공원", "잠실 한강공원", "반포 한강공원", "안양천"];
const DATES: { value: DateFilter; label: string }[] = [
    { value: "TODAY", label: "오늘" },
    { value: "TOMORROW", label: "내일" },
    { value: "THIS_WEEKEND", label: "이번 주말" },
];
const CONVERSATIONS: { value: ConversationStyle; label: string }[] = [
    { value: "SILENT", label: "조용히" },
    { value: "LIGHT_CHAT", label: "가벼운 대화" },
];

export function RecruitmentFilterModal({ filters, resultCount, onChange, onReset, onClose, onApply }: Props) {
    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-gray-900/40 px-4" role="presentation">
            <section role="dialog" aria-modal="true" aria-labelledby="filter-modal-title" className="max-h-[calc(100dvh-2rem)] w-full max-w-[400px] overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl">
                <header className="flex items-center justify-between">
                    <h2 id="filter-modal-title" className="text-2xl font-bold text-title">필터</h2>
                    <button type="button" aria-label="필터 닫기" onClick={onClose} className="grid size-10 place-items-center text-3xl font-light text-body">×</button>
                </header>

                <FilterGroup title="지역">
                    {LOCATIONS.map((location) => (
                        <FilterChip key={location} label={location} selected={filters.location === location} onClick={() => onChange({ ...filters, location: filters.location === location ? null : location })} />
                    ))}
                </FilterGroup>

                <FilterGroup title="날짜">
                    {DATES.map((date) => (
                        <FilterChip key={date.value} label={date.label} selected={filters.date === date.value} onClick={() => onChange({ ...filters, date: filters.date === date.value ? null : date.value })} />
                    ))}
                </FilterGroup>

                <fieldset className="mt-5">
                    <div className="mb-4 flex items-center justify-between">
                        <legend className="text-base font-bold text-body">거리</legend>
                        <strong className="text-base text-secondary-400">
                            {filters.minDistanceKm} ~ {filters.maxDistanceKm}km
                        </strong>
                    </div>
                    <div className="relative h-6">
                        <div className="absolute left-0 right-0 top-2.5 h-1.5 rounded-full bg-gray-200" />
                        <div
                            className="absolute top-2.5 h-1.5 rounded-full bg-primary-300"
                            style={{
                                left: `${((filters.minDistanceKm - 1) / 19) * 100}%`,
                                right: `${100 - ((filters.maxDistanceKm - 1) / 19) * 100}%`,
                            }}
                        />
                        <input
                            aria-label="최소 거리"
                            type="range"
                            min="1"
                            max="20"
                            value={filters.minDistanceKm}
                            onChange={(event) => onChange({ ...filters, minDistanceKm: Math.min(Number(event.target.value), filters.maxDistanceKm - 1) })}
                            className="filter-range absolute inset-0 w-full"
                        />
                        <input
                            aria-label="최대 거리"
                            type="range"
                            min="1"
                            max="20"
                            value={filters.maxDistanceKm}
                            onChange={(event) => onChange({ ...filters, maxDistanceKm: Math.max(Number(event.target.value), filters.minDistanceKm + 1) })}
                            className="filter-range absolute inset-0 w-full"
                        />
                    </div>
                    <div className="mt-1 flex justify-between text-sm text-body">
                        <span>1km</span><span>20km</span>
                    </div>
                </fieldset>

                <FilterGroup title="대화 수준">
                    {CONVERSATIONS.map((conversation) => (
                        <FilterChip key={conversation.value} label={conversation.label} selected={filters.conversationStyle === conversation.value} onClick={() => onChange({ ...filters, conversationStyle: filters.conversationStyle === conversation.value ? null : conversation.value })} />
                    ))}
                </FilterGroup>

                <footer className="mt-6 grid grid-cols-[0.8fr_1.7fr] gap-3">
                    <Button type="button" variant="secondary" className="h-14 px-3 text-body" onClick={onReset}>초기화</Button>
                    <Button type="button" className="h-14 px-3" onClick={onApply}>모집글 {resultCount}건 보기</Button>
                </footer>
            </section>
        </div>
    );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <fieldset className="mt-5">
            <legend className="mb-3 text-base font-bold text-body">{title}</legend>
            <div className="flex flex-wrap gap-2">{children}</div>
        </fieldset>
    );
}

function FilterChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
    return (
        <button type="button" aria-pressed={selected} onClick={onClick} className={`rounded-full border px-4 py-2 text-sm font-bold ${selected ? "border-primary-400 bg-primary-400 text-title" : "border-border bg-surface text-body"}`}>
            {label}
        </button>
    );
}
