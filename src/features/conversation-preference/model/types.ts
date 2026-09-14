export type ConversationPreference = "SILENT" | "LIGHT_CHAT";

export const OPTIONS: ConversationPreferenceOption[] = [
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

export type ConversationPreferenceOption = {
	value: ConversationPreference;
	label: string;
	description: string;
};
