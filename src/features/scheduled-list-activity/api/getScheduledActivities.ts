// api/getScheduledActivities.ts
import type { ScheduledActivity } from "../../../entities/activity";

const MOCK_ACTIVITIES: ScheduledActivity[] = [
	{
		id: 1,
		month: 9,
		day: 12,
		title: "Silent Run · 뚝섬",
		time: "금 07:00",
		distance: "5~12km",
		conversationStyle: "조용한러너",
	},
	{
		id: 2,
		month: 9,
		day: 14,
		title: "Light Chat Run · 반포",
		time: "일 08:00",
		distance: "3~6km",
		conversationStyle: "가벼운 대화",
	},
	{
		id: 3,
		month: 9,
		day: 18,
		title: "Silent Run · 여의도",
		time: "화 19:30",
		distance: "6~10km",
		conversationStyle: "조용한러너",
	},
	{
		id: 4,
		month: 9,
		day: 20,
		title: "Silent Run · 잠실",
		time: "목 07:00",
		distance: "5~8km",
		conversationStyle: "조용한러너",
	},
];

export async function getScheduledActivities(limit: number) {
	// TODO: 예정된 활동 조회 API 연동 필요
	await new Promise((resolve) => setTimeout(resolve, 300));
	return MOCK_ACTIVITIES.slice(0, limit);
}
