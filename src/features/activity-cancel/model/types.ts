export type CancelReasonCode =
	| "SUDDEN_SCHEDULE"
	| "NOT_FEELING_WELL"
	| "LOCATION_TIME_MISMATCH"
	| "OTHER";

export const CANCEL_REASONS: { code: CancelReasonCode; label: string }[] = [
	{ code: "SUDDEN_SCHEDULE", label: "갑작스러운 일정이 생겼어요" },
	{ code: "NOT_FEELING_WELL", label: "몸 상태가 좋지 않아요" },
	{ code: "LOCATION_TIME_MISMATCH", label: "장소나 시간이 맞지 않아요" },
	{ code: "OTHER", label: "기타" },
];
