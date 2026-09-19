import type {
	AppliedRecruitmentSummary,
	AppliedRecruitmentStatus,
	ConversationStyle,
} from "../../../entities/recruitment";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";
import { formatDate, toTimeValue } from "../../../shared/lib/date";

type MyAppliedRecruitmentResponse = {
	activityMatchId: number;
	hostMatchRequestId: number;
	status: AppliedRecruitmentStatus;
	courseName: string;
	distanceMinMeters: number;
	distanceMaxMeters: number;
	scheduledAt: string;
	talkLevel: ConversationStyle;
	host: {
		nickname: string;
		rating: number | null;
		completedCount: number;
	};
};

function toMyAppliedRecruitment(
	item: MyAppliedRecruitmentResponse,
): AppliedRecruitmentSummary {
	return {
		id: item.activityMatchId,
		activityMatchId: item.activityMatchId,
		hostMatchRequestId: item.hostMatchRequestId,
		location: item.courseName,
		minDistanceKm: item.distanceMinMeters / 1000,
		maxDistanceKm: item.distanceMaxMeters / 1000,
		dateLabel: formatDate(item.scheduledAt),
		time: toTimeValue(new Date(item.scheduledAt)),
		authorNickname: item.host.nickname,
		status: item.status,
	};
}

/*const MOCK_APPLIED_RECRUITMENTS: AppliedRecruitmentSummary[] = [
	{
		id: 1,
		location: "잠실 한강공원",
		minDistanceKm: 6,
		maxDistanceKm: 10,
		dateLabel: "9월 13일 (토)",
		time: "06:30",
		authorNickname: "새벽공기",
		status: "WAITING",
	},
	{
		id: 2,
		location: "반포 한강공원",
		minDistanceKm: 3,
		maxDistanceKm: 6,
		dateLabel: "9월 15일 (월)",
		time: "20:00",
		authorNickname: "밤산책",
		status: "ACCEPTED",
	},
];*/

export async function getMyAppliedRecruitments(limit?: number) {
	const response = await authorizedFetch(
		"/api/matching/board/applications",
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(
				response,
				"내 신청 내역을 불러오지 못했어요.",
			),
		);
	}

	const body: MyAppliedRecruitmentResponse[] = await response.json();
	const recruitments = body.map(toMyAppliedRecruitment);

	return limit === undefined
		? recruitments
		: recruitments.slice(0, limit);
}