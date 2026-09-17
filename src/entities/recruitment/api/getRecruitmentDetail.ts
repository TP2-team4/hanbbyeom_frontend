import type { ConversationStyle, RecruitmentDetail } from "../model/types";
import { withUserIdHeader } from "../../../shared/lib/apiHeaders";
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
	status:
		| "SEARCHING"
		| "PENDING_CONFIRMATION"
		| "MATCHED"
		| "CANCELLED"
		| "EXPIRED"
		| "CLOSED";
	isOwner: boolean;
	pendingApplicantCount: number;
	author: {
		nickname: string;
		rating: number | null;
		completedCount: number | null;
	};
};

function formatPace(totalSeconds: number) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = String(totalSeconds % 60).padStart(2, "0");
	return `${minutes}'${seconds}"`;
}

function toRecruitmentDetail(response: MatchRequestResponse): RecruitmentDetail {
	return {
		id: response.id,
		authorId: response.id,
		location: response.courseName,
		minDistanceKm: response.distanceMinMeters / 1000,
		maxDistanceKm: response.distanceMaxMeters / 1000,
		conversationStyle: response.talkLevel,
		dateLabel: formatDate(response.scheduledAt),
		time: toTimeValue(new Date(response.scheduledAt)),
		pace: `${formatPace(response.paceMinSec)} ~ ${formatPace(response.paceMaxSec)}`,
		meetingPlace: response.meetingPoint,
		// TODO: 이 응답엔 "내가 이미 신청했는지" 필드가 없어 SEARCHING(모집중)만 open, 나머지는 전부 applied로 뭉뚱그림 (백엔드 API 갭)
		status: response.status === "SEARCHING" ? "open" : "applied",
		applicantCount: response.pendingApplicantCount,
		authorNickname: response.author.nickname,
		authorRating: response.author.rating ?? 0,
		authorCompletedCount: response.author.completedCount ?? 0,
	};
}

export async function getRecruitmentDetail(id: number) {
	const response = await fetch(`/api/matching/requests/${id}`, {
		headers: withUserIdHeader(),
	});

	if (!response.ok) {
		return null;
	}

	const body: MatchRequestResponse = await response.json();
	return toRecruitmentDetail(body);
}
