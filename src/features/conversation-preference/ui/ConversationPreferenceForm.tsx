import Button from "../../../shared/ui/button";
import { useConversationPreference } from "../model/useConversationPreference";
import type {
    ConversationPreference,
    ConversationPreferenceOption,
} from "../model/types";

const OPTIONS: ConversationPreferenceOption[] = [
    {
        value: "SILENT",
        label: "조용히",
        description: "인사만 나누고 활동은 조용히 이어가요.",
    },
    {
        value: "LIGHT_CHAT",
        label: "가벼운 대화",
        description: "활동 중에도 가벼운 대화를 이어가요.",
    },
];

type Props = {
    onSuccess: () => void;
};

export function ConversationPreferenceForm({ onSuccess }: Props) {
    const form = useConversationPreference({ onSuccess });

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        void form.submit();
    };

    return (
        <form
            className="flex min-h-[calc(100dvh-4rem)] flex-col"
            onSubmit={handleSubmit}
        >
            <div className="flex-1 px-6 pb-8 pt-12">
                <h2 className="text-3xl font-bold leading-tight text-title">
                    활동 중 대화는
                    <br />
                    어디까지 괜찮으세요?
                </h2>
                <p className="mt-4 text-base leading-6 text-body">
                    이 값이 매칭 조건의 기본값이 되고, 내 프로필에 표시돼요.
                </p>

                <div
                    className="mt-8 flex flex-col gap-3"
                    role="radiogroup"
                    aria-label="선호 대화 수준"
                >
                    {OPTIONS.map((option) => (
                        <PreferenceOption
                            key={option.value}
                            option={option}
                            selected={form.selectedPreference === option.value}
                            onSelect={form.selectPreference}
                        />
                    ))}
                </div>

                <p className="mt-7 rounded-lg bg-gray-50 px-4 py-4 text-sm leading-6 text-body">
                    언제든 마이페이지에서 바꿀 수 있어요.
                </p>

                {form.submitError && (
                    <p role="alert" className="mt-3 text-xs text-error-text">
                        {form.submitError}
                    </p>
                )}
            </div>

            <footer className="border-t border-divider bg-surface p-4">
                <Button
                    type="submit"
                    className="h-14 w-full"
                    disabled={form.isSubmitting}
                >
                    {form.isSubmitting ? "저장 중..." : "시작하기"}
                </Button>
            </footer>
        </form>
    );
}

type PreferenceOptionProps = {
    option: ConversationPreferenceOption;
    selected: boolean;
    onSelect: (preference: ConversationPreference) => void;
};

function PreferenceOption({
    option,
    selected,
    onSelect,
}: PreferenceOptionProps) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(option.value)}
            className={`flex min-h-28 w-full items-center justify-between rounded-lg border px-5 py-4 text-left transition-colors ${
                selected
                    ? "border-primary-400 bg-primary-100"
                    : "border-border bg-surface"
            }`}
        >
            <span>
                <strong className="block text-xl font-bold text-title">
                    {option.label}
                </strong>
                <span className="mt-1 block text-sm text-body">
                    {option.description}
                </span>
            </span>
            {selected && (
                <span
                    aria-hidden="true"
                    className="text-3xl leading-none text-secondary-400"
                >
                    ✓
                </span>
            )}
        </button>
    );
}
