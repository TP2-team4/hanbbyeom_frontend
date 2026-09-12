export type ConversationPreference =
    | "SILENT"
    | "GREETING_ONLY"
    | "LIGHT_CHAT";

export type ConversationPreferenceOption = {
    value: ConversationPreference;
    description: string;
};
