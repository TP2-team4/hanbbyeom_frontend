import type { ConversationStyle, Recruitment } from "../../../entities/recruitment";
import { withUserIdHeader } from "../../../shared/lib/apiHeaders";
import { formatDate, toTimeValue } from "../../../shared/lib/date";

type BoardItemResponse = {
	id: number;
	courseName: string;
	distanceMinMeters: number;
	distanceMaxMeters: number;
	talkLevel: ConversationStyle;
	scheduledAt: string;
	paceMinSec: number;
	paceMaxSec: number;
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

function toRecruitment(item: BoardItemResponse): Recruitment {
	return {
		id: item.id,
		location: item.courseName,
		minDistanceKm: item.distanceMinMeters / 1000,
		maxDistanceKm: item.distanceMaxMeters / 1000,
		conversationStyle: item.talkLevel,
		startsAt: item.scheduledAt,
		dateLabel: formatDate(item.scheduledAt),
		time: toTimeValue(new Date(item.scheduledAt)),
		pace: `${formatPace(item.paceMinSec)}~${formatPace(item.paceMaxSec)}`,
		minPaceSeconds: item.paceMinSec,
		maxPaceSeconds: item.paceMaxSec,
		authorNickname: item.author.nickname,
		authorRating: item.author.rating ?? 0,
		authorCompletedCount: item.author.completedCount ?? 0,
		// TODO: board 응답에 "이미 신청했는지" 필드가 없어 항상 open으로 고정 (백엔드 API 갭, 추후 필드 추가되면 매핑 필요)
		status: "open",
	};
}

export async function getRecruitments() {
	const response = await fetch("/api/matching/board", {
		headers: withUserIdHeader(),
	});

	if (!response.ok) {
		throw new Error("모집글을 불러오지 못했습니다.");
	}

	const body: BoardItemResponse[] = await response.json();
	return body.map(toRecruitment);
}
