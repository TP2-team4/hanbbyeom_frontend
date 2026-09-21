import type { ConversationStyle, Recruitment } from "../../../entities/recruitment";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";
import { formatDate, toTimeValue } from "../../../shared/lib/date";
import {
	EMPTY_FILTERS,
	type RecruitmentFilters,
	type RecruitmentSort,
} from "../model/filterTypes";

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
		nickname: string | null;
		rating: number | null;
		completedCount: number | null;
	};
};

// PR #104: 목록 응답이 배열 -> { items, nextCursor, hasNext } 커서 페이지네이션으로 변경됨
type BoardResponse = {
	items: BoardItemResponse[];
	nextCursor: number | null;
	hasNext: boolean;
};

export type RecruitmentsPage = {
	recruitments: Recruitment[];
	nextCursor: number | null;
	hasNext: boolean;
};

type GetRecruitmentsPage = {
	cursor?: number;
	size?: number;
	sort?: RecruitmentSort;
};

// distanceMin/maxMeters, paceMin/maxSec 등 미터/초 단위 — 백엔드와 합의된 단위
function buildFilterQuery(filters: RecruitmentFilters): URLSearchParams {
	const query = new URLSearchParams();
	if (filters.location) query.set("course", filters.location);
	if (filters.conversationStyle) query.set("talkLevel", filters.conversationStyle);
	if (filters.minDistanceKm !== EMPTY_FILTERS.minDistanceKm) {
		query.set("minDistance", String(Math.round(filters.minDistanceKm * 1000)));
	}
	if (filters.maxDistanceKm !== EMPTY_FILTERS.maxDistanceKm) {
		query.set("maxDistance", String(Math.round(filters.maxDistanceKm * 1000)));
	}
	if (filters.minPaceSeconds !== EMPTY_FILTERS.minPaceSeconds) {
		query.set("minPace", String(filters.minPaceSeconds));
	}
	if (filters.maxPaceSeconds !== EMPTY_FILTERS.maxPaceSeconds) {
		query.set("maxPace", String(filters.maxPaceSeconds));
	}
	if (filters.date) query.set("datePreset", filters.date);
	return query;
}

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
		authorNickname: item.author.nickname ?? "탈퇴한 사용자",
		authorRating: item.author.rating,
		authorCompletedCount: item.author.completedCount ?? 0,
		// TODO: board 응답에 "이미 신청했는지" 필드가 없어 항상 open으로 고정 (백엔드 API 갭, 추후 필드 추가되면 매핑 필요)
		status: "open",
	};
}

export async function getRecruitments(
	filters: RecruitmentFilters = EMPTY_FILTERS,
	page: GetRecruitmentsPage = {},
): Promise<RecruitmentsPage> {
	const query = buildFilterQuery(filters);
	if (page.cursor !== undefined) query.set("cursor", String(page.cursor));
	if (page.size !== undefined) query.set("size", String(page.size));
	if (page.sort !== undefined) query.set("sort", page.sort);

	const queryString = query.toString();
	const response = await authorizedFetch(
		`/api/matching/board${queryString ? `?${queryString}` : ""}`,
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "모집글을 불러오지 못했습니다."),
		);
	}

	const body: BoardResponse = await response.json();
	return {
		recruitments: body.items.map(toRecruitment),
		nextCursor: body.nextCursor,
		hasNext: body.hasNext,
	};
}
