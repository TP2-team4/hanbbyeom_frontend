export type ConversationPreference =
    | "SILENT"
    | "LIGHT_CHAT";

export type ConversationPreferenceOption = {
    value: ConversationPreference;
    label: string;
    description: string;
};
