import type {
	ConversationStyle,
	MatchRequestStatus,
	RecruitmentDetail,
} from "../model/types";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";
import { formatDate, toTimeValue } from "../../../shared/lib/date";

type MatchRequestResponse = {
	id: number;
	courseName: string;
	distanceMinMeters: number;
	distanceMaxMeters: number;
	paceMinSec: number;
	paceMaxSec: number;
	meetingPoint: string;
	scheduledAt: string;
	talkLevel: ConversationStyle;
	status: MatchRequestStatus;
	isOwner: boolean;
	pendingApplicantCount: number;
	author: {
		nickname: string | null;
		rating: number | null;
		completedCount: number | null;
	};
};

function formatPace(totalSeconds: number) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = String(totalSeconds % 60).padStart(2, "0");
	return `${minutes}'${seconds}"`;
}

function toRecruitmentDetail(
	response: MatchRequestResponse,
): RecruitmentDetail {
	return {
		id: response.id,
		location: response.courseName,
		minDistanceKm: response.distanceMinMeters / 1000,
		maxDistanceKm: response.distanceMaxMeters / 1000,
		conversationStyle: response.talkLevel,
		scheduledAt: response.scheduledAt,
		dateLabel: formatDate(response.scheduledAt),
		time: toTimeValue(new Date(response.scheduledAt)),
		pace: `${formatPace(response.paceMinSec)} ~ ${formatPace(response.paceMaxSec)}`,
		meetingPlace: response.meetingPoint,
		applicantCount: response.pendingApplicantCount,
		authorNickname: response.author.nickname ?? "탈퇴한 사용자",
		authorRating: response.author.rating,
		authorCompletedCount: response.author.completedCount ?? 0,
		requestStatus: response.status,
		isOwner: response.isOwner,
	};
}

export async function getRecruitmentDetail(id: number) {
	const response = await authorizedFetch(`/api/matching/requests/${id}`);

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "모집글 정보를 불러오지 못했습니다."),
		);
	}

	const body: MatchRequestResponse = await response.json();
	return toRecruitmentDetail(body);
}
