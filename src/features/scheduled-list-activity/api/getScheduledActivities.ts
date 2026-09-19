import type { ScheduledActivity } from "../../../entities/activity";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";
import { toTimeValue } from "../../../shared/lib/date";

type ChatListItemResponse = {
	activityMatchId: number;
	counterpartUserId: number;
	status: string;
	courseName: string;
	location: string;
	scheduledAt: string;
	scheduledEndAt: string;
	lastMessage: string | null;
	lastMessageAt: string | null;
};

export async function getScheduledActivities(
	limit?: number,
): Promise<ScheduledActivity[]> {
	const response = await authorizedFetch("/api/chats");

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(
				response,
				"예정된 활동을 불러오지 못했습니다.",
			),
		);
	}

	const body: ChatListItemResponse[] = await response.json();
	const now = Date.now();

	const upcoming = body
		.filter(
			(room) =>
				room.status === "CONFIRMED" &&
				new Date(room.scheduledEndAt).getTime() >= now,
		)
		.sort(
			(a, b) =>
				new Date(a.scheduledAt).getTime() -
				new Date(b.scheduledAt).getTime(),
		)
		.map((room): ScheduledActivity => {
			const date = new Date(room.scheduledAt);
			return {
				id: room.activityMatchId,
				month: date.getMonth() + 1,
				day: date.getDate(),
				title: room.courseName,
				time: toTimeValue(date),
				location: room.location,
			};
		});

	return limit === undefined ? upcoming : upcoming.slice(0, limit);
}
