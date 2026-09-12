import type { Recruitment } from "../../../entities/recruitment";

const MOCK_RECRUITMENTS: Recruitment[] = [
    { id: 1, location: "뚝섬 한강공원", distanceKm: 8, conversationStyle: "SILENT", startsAt: "2026-09-12T07:00:00+09:00", dateLabel: "9월 12일 (토)", time: "07:00", pace: "6'00\"~6'40\"", authorNickname: "조용한러너", authorRating: 4.8, authorCompletedCount: 31, status: "open" },
    { id: 2, location: "여의도 한강공원", distanceKm: 10, conversationStyle: "LIGHT_CHAT", startsAt: "2026-09-13T06:30:00+09:00", dateLabel: "9월 13일 (일)", time: "06:30", pace: "5'40\"~6'10\"", authorNickname: "새벽공기", authorRating: 4.6, authorCompletedCount: 12, status: "open" },
    { id: 3, location: "반포 한강공원", distanceKm: 5, conversationStyle: "SILENT", startsAt: "2026-09-14T20:00:00+09:00", dateLabel: "9월 14일 (월)", time: "20:00", pace: "6'30\"~7'00\"", authorNickname: "밤산책", authorRating: 4.9, authorCompletedCount: 8, status: "applied" },
];

export async function getRecruitments() {
    // TODO: 모집 게시글 조회 API가 개발되면 실제 요청으로 교체
    await new Promise((resolve) => setTimeout(resolve, 350));
    return MOCK_RECRUITMENTS;
}
