import type { ConversationStyle } from "../../../entities/recruitment";
import { withUserIdHeader } from "../../../shared/lib/apiHeaders";

export type RecruitmentCreateRequest = {
	courseId: number;
	meetingPlace: string;
	date: string;
	time: string;
	minDistanceKm: number;
	maxDistanceKm: number;
	minPaceSeconds: number;
	maxPaceSeconds: number;
	conversationStyle: ConversationStyle;
};

function toScheduledAt(date: string, time: string) {
	const [year, month, day] = date.split("-").map(Number);
	const [hours, minutes] = time.split(":").map(Number);
	return new Date(year, month - 1, day, hours, minutes).toISOString();
}

export async function createRecruitment(request: RecruitmentCreateRequest) {
	const response = await fetch("/api/matching/requests", {
		method: "POST",
		headers: withUserIdHeader({ "Content-Type": "application/json" }),
		body: JSON.stringify({
			courseId: request.courseId,
			meetingPoint: request.meetingPlace,
			distanceMinMeters: Math.round(request.minDistanceKm * 1000),
			distanceMaxMeters: Math.round(request.maxDistanceKm * 1000),
			paceMinSec: request.minPaceSeconds,
			paceMaxSec: request.maxPaceSeconds,
			scheduledAt: toScheduledAt(request.date, request.time),
			talkLevel: request.conversationStyle,
		}),
	});

	if (!response.ok) {
		const body: { message?: string } | null = await response
			.json()
			.catch(() => null);
		throw new Error(body?.message ?? "모집글 작성에 실패했습니다.");
	}
}
