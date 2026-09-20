import type {
	ConversationStyle,
	MatchRequestStatus,
	RecruitmentDetail,
} from "../model/types";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
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
		authorId: response.id,
		location: response.courseName,
		minDistanceKm: response.distanceMinMeters / 1000,
		maxDistanceKm: response.distanceMaxMeters / 1000,
		conversationStyle: response.talkLevel,
		scheduledAt: response.scheduledAt,
		dateLabel: formatDate(response.scheduledAt),
		time: toTimeValue(new Date(response.scheduledAt)),
		pace: `${formatPace(response.paceMinSec)} ~ ${formatPace(response.paceMaxSec)}`,
		meetingPlace: response.meetingPoint,
		// TODO: 이 응답엔 "내가 이미 신청했는지" 필드가 없어 SEARCHING(모집중)만 open, 나머지는 전부 applied로 뭉뚱그림 (백엔드 API 갭)
		status: response.status === "SEARCHING" ? "open" : "applied",
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

	if (!response.ok) {
		return null;
	}

	const body: MatchRequestResponse = await response.json();
	return toRecruitmentDetail(body);
}
