import { useMemo, useState } from "react";
import {
    RecruitmentCard,
    type ConversationStyle,
} from "../../../entities/recruitment";
import { useRecruitments } from "../model/useRecruitments";

type Filter = "ALL" | "TUKSEOM" | "THIS_WEEK" | ConversationStyle;

const FILTERS: { value: Filter; label: string }[] = [
    { value: "ALL", label: "전체" },
    { value: "TUKSEOM", label: "뚝섬" },
    { value: "THIS_WEEK", label: "이번 주" },
    { value: "SILENT", label: "SILENT" },
];

export function RecruitmentList() {
    const { recruitments, isLoading, error, apply } = useRecruitments();
    const [filter, setFilter] = useState<Filter>("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRecruitments = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();
        const searchedRecruitments = normalizedQuery
            ? recruitments.filter((item) =>
                  `${item.location} ${item.conversationStyle}`
                      .toLowerCase()
                      .includes(normalizedQuery),
              )
            : recruitments;

        if (filter === "TUKSEOM") {
            return searchedRecruitments.filter((item) =>
                item.location.includes("뚝섬"),
            );
        }
        if (filter === "SILENT") {
            return searchedRecruitments.filter(
                (item) => item.conversationStyle === "SILENT",
            );
        }
        return searchedRecruitments;
    }, [filter, recruitments, searchQuery]);

    return (
        <>
            <div className="px-6">
                <label className="flex h-14 items-center gap-3 rounded-lg border border-border bg-surface px-4 focus-within:border-2 focus-within:border-focus">
                    <span className="sr-only">모집글 검색</span>
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="size-6 shrink-0 fill-none stroke-body"
                        strokeWidth="1.8"
                    >
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <path d="m15.5 15.5 5 5" />
                    </svg>
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="코스 이름 또는 지역 검색"
                        className="min-w-0 flex-1 bg-transparent text-base font-medium text-title outline-none placeholder:text-gray-400"
                    />
                </label>
            </div>

            <div
                className="mt-5 flex gap-2 overflow-x-auto px-6 pb-1"
                aria-label="모집글 필터"
            >
                {FILTERS.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        aria-pressed={filter === item.value}
                        onClick={() => setFilter(item.value)}
                        className={`h-11 shrink-0 rounded-full border px-5 text-sm font-bold ${
                            filter === item.value
                                ? "border-primary-400 bg-primary-400 text-title"
                                : "border-border bg-surface text-body"
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {!isLoading && !error && (
                <p className="px-6 pt-5 text-sm text-body">
                    내 조건과 맞는 모집글 {filteredRecruitments.length}건 ·
                    신청하면 작성자 수락 후 확정돼요
                </p>
            )}

            <div className="flex flex-col gap-3 px-6 pb-10 pt-5">
                {isLoading && (
                    <p className="py-10 text-center text-sm text-body">
                        모집글을 불러오는 중...
                    </p>
                )}
                {error && (
                    <p
                        role="alert"
                        className="py-10 text-center text-sm text-error-text"
                    >
                        {error}
                    </p>
                )}
                {!isLoading && !error && filteredRecruitments.length === 0 && (
                    <p className="py-10 text-center text-sm text-body">
                        조건에 맞는 모집글이 없어요.
                    </p>
                )}
                {filteredRecruitments.map((recruitment) => (
                    <RecruitmentCard
                        key={recruitment.id}
                        recruitment={recruitment}
                        onApply={apply}
                    />
                ))}
            </div>
        </>
    );
}
