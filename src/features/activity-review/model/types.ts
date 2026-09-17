import type { TalkLevel } from "../../../entities/activity-history";

export type { TalkLevel };

export const TALK_LEVEL_LABEL: Record<TalkLevel, string> = {
	SILENT: "조용히",
	LIGHT_CHAT: "가벼운 대화",
};

export type NoShowReasonCode =
	| "NOT_SHOWED_UP"
	| "LEFT_WITHOUT_NOTICE"
	| "OTHER";

export const NO_SHOW_REASONS: { code: NoShowReasonCode; label: string }[] = [
	{ code: "NOT_SHOWED_UP", label: "약속 시간에 나타나지 않았어요" },
	{ code: "LEFT_WITHOUT_NOTICE", label: "연락 없이 자리를 떠났어요" },
	{ code: "OTHER", label: "기타" },
];
