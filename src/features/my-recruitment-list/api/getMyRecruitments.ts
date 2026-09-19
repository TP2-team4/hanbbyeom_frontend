import type {
	MyRecruitmentSummary,
	ConversationStyle,
	MatchRequestStatus,
} from "../../../entities/recruitment";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";
import { formatDate, toTimeValue } from "../../../shared/lib/date";

type MyRecruitmentResponse = {
	id: number;
	courseName: string;
	distanceMinMeters: number;
	distanceMaxMeters: number;
	scheduledAt: string;
	talkLevel: ConversationStyle;
	status: MatchRequestStatus;
};

function toMyRecruitment(
	item: MyRecruitmentResponse,
): MyRecruitmentSummary {
	return {
		id: item.id,
		location: item.courseName,
		minDistanceKm: item.distanceMinMeters / 1000,
		maxDistanceKm: item.distanceMaxMeters / 1000,
		conversationStyle: item.talkLevel,
		dateLabel: formatDate(item.scheduledAt),
		time: toTimeValue(new Date(item.scheduledAt)),
		status: item.status,
	};
}

/*const MOCK_MY_RECRUITMENTS: MyRecruitmentSummary[] = [
	{
		id: 1,
		location: "뚝섬 한강공원",
		minDistanceKm: 5,
		maxDistanceKm: 12,
		conversationStyle: "SILENT",
		dateLabel: "9월 12일 (금)",
		time: "07:00",
		applicantCount: 2,
		status: "RECRUITING",
	},
	{
		id: 2,
		location: "여의도 한강공원",
		minDistanceKm: 8,
		maxDistanceKm: 15,
		conversationStyle: "LIGHT_CHAT",
		dateLabel: "9월 14일 (일)",
		time: "06:30",
		applicantCount: 0,
		status: "RECRUITING",
	},
	{
		id: 3,
		location: "잠실 한강공원",
		minDistanceKm: 6,
		maxDistanceKm: 10,
		conversationStyle: "SILENT",
		dateLabel: "9월 10일 (수)",
		time: "07:00",
		applicantCount: 0,
		status: "CLOSED",
		matchedPartnerNickname: "조용한러너",
	},
	{
		id: 4,
		location: "반포 한강공원",
		minDistanceKm: 3,
		maxDistanceKm: 6,
		conversationStyle: "SILENT",
		dateLabel: "9월 3일 (수)",
		time: "20:00",
		applicantCount: 0,
		status: "CLOSED",
	},
	{
		id: 5,
		location: "안양천",
		minDistanceKm: 10,
		maxDistanceKm: 15,
		conversationStyle: "SILENT",
		dateLabel: "8월 30일 (토)",
		time: "06:00",
		applicantCount: 0,
		status: "CANCELLED",
	},
	{
		id: 6,
		location: "뚝섬 한강공원",
		minDistanceKm: 5,
		maxDistanceKm: 8,
		conversationStyle: "SILENT",
		dateLabel: "8월 24일 (일)",
		time: "19:00",
		applicantCount: 0,
		status: "CLOSED",
		matchedPartnerNickname: "새벽공기",
	},
	{
		id: 7,
		location: "여의도 한강공원",
		minDistanceKm: 8,
		maxDistanceKm: 12,
		conversationStyle: "LIGHT_CHAT",
		dateLabel: "8월 17일 (일)",
		time: "06:00",
		applicantCount: 0,
		status: "RECRUITING",
	},
];*/

export async function getMyRecruitments(
	limit?: number,
	onlyRecruiting = false,
) {
	const response = await authorizedFetch("/api/matching/requests");

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(
				response,
				"내 모집글을 불러오지 못했어요.",
			),
		);
	}

	const body: MyRecruitmentResponse[] = await response.json();
	const recruitments = body.map(toMyRecruitment);

	const filtered = onlyRecruiting
		? recruitments.filter(
			(item) =>
				item.status === "SEARCHING" ||
				item.status === "PENDING_CONFIRMATION",
		)
		: recruitments;

	return limit === undefined
		? filtered
		: filtered.slice(0, limit);
}