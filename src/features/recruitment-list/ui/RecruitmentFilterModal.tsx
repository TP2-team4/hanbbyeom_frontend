import Button from "../../../shared/ui/button";
import { RangeSlider } from "../../../shared/ui/range-slider";
import { SelectableChip } from "../../../shared/ui/selectable-chip";
import type {
    DateFilter,
    RecruitmentFilters,
} from "../model/filterTypes";
import type { ConversationStyle } from "../../../entities/recruitment";

type Props = {
    filters: RecruitmentFilters;
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

export function RecruitmentFilterModal({ filters, onChange, onReset, onClose, onApply }: Props) {
    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-gray-900/40 px-4" role="presentation">
            <section role="dialog" aria-modal="true" aria-labelledby="filter-modal-title" className="max-h-[calc(100dvh-2rem)] w-full max-w-[400px] overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl">
                <header className="flex items-center justify-between">
                    <h2 id="filter-modal-title" className="text-2xl font-bold text-title">필터</h2>
                    <button type="button" aria-label="필터 닫기" onClick={onClose} className="grid size-10 place-items-center text-3xl font-light text-body">×</button>
                </header>

                <FilterGroup title="지역">
                    {LOCATIONS.map((location) => (
                        <SelectableChip key={location} label={location} selected={filters.location === location} onClick={() => onChange({ ...filters, location: filters.location === location ? null : location })} />
                    ))}
                </FilterGroup>

                <FilterGroup title="날짜">
                    {DATES.map((date) => (
                        <SelectableChip key={date.value} label={date.label} selected={filters.date === date.value} onClick={() => onChange({ ...filters, date: filters.date === date.value ? null : date.value })} />
                    ))}
                </FilterGroup>

                <fieldset className="mt-5">
                    <div className="mb-4 flex items-center justify-between">
                        <legend className="text-base font-bold text-body">거리</legend>
                        <strong className="text-base text-secondary-400">
                            {filters.minDistanceKm} ~ {filters.maxDistanceKm}km
                        </strong>
                    </div>
                    <RangeSlider
                        min={1}
                        max={20}
                        value={[filters.minDistanceKm, filters.maxDistanceKm]}
                        minAriaLabel="최소 거리"
                        maxAriaLabel="최대 거리"
                        onChange={([minDistanceKm, maxDistanceKm]) =>
                            onChange({ ...filters, minDistanceKm, maxDistanceKm })
                        }
                    />
                    <div className="mt-1 flex justify-between text-sm text-body">
                        <span>1km</span><span>20km</span>
                    </div>
                </fieldset>

				<fieldset className="mt-5">
					<div className="mb-4 flex items-center justify-between">
						<legend className="text-base font-bold text-body">페이스</legend>
						<strong className="text-base text-secondary-400">
							{formatPace(filters.minPaceSeconds)} ~ {formatPace(filters.maxPaceSeconds)}
						</strong>
					</div>
					<RangeSlider
						min={300}
						max={480}
						step={10}
						value={[filters.minPaceSeconds, filters.maxPaceSeconds]}
						minAriaLabel="최소 페이스"
						maxAriaLabel="최대 페이스"
						onChange={([minPaceSeconds, maxPaceSeconds]) =>
							onChange({ ...filters, minPaceSeconds, maxPaceSeconds })
						}
					/>
					<div className="mt-1 flex justify-between text-sm text-body">
						<span>5'00\"/km</span><span>8'00\"/km</span>
					</div>
				</fieldset>

                <FilterGroup title="대화 수준">
                    {CONVERSATIONS.map((conversation) => (
                        <SelectableChip key={conversation.value} label={conversation.label} selected={filters.conversationStyle === conversation.value} onClick={() => onChange({ ...filters, conversationStyle: filters.conversationStyle === conversation.value ? null : conversation.value })} />
                    ))}
                </FilterGroup>

                <footer className="mt-6 grid grid-cols-[0.8fr_1.7fr] gap-3">
                    <Button type="button" variant="secondary" className="h-14 px-3 text-body" onClick={onReset}>초기화</Button>
                    <Button type="button" className="h-14 px-3" onClick={onApply}>모집글 보기</Button>
                </footer>
            </section>
        </div>
    );
}

function formatPace(totalSeconds: number) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = String(totalSeconds % 60).padStart(2, "0");
	return `${minutes}'${seconds}"`;
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <fieldset className="mt-5">
            <legend className="mb-3 text-base font-bold text-body">{title}</legend>
            <div className="flex flex-wrap gap-2">{children}</div>
        </fieldset>
    );
}
