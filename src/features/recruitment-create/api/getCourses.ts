import type { Course } from "../model/types";

const MOCK_COURSES: Course[] = [
    { id: 1, name: "뚝섬 한강공원", description: "성수대교~영동대교 · 평지 · 야간 조명 밝음" },
    { id: 2, name: "여의도 한강공원", description: "마포대교~원효대교 · 넓은 산책로" },
    { id: 3, name: "잠실 한강공원", description: "잠실대교~올림픽대교 · 강변 직선 구간" },
    { id: 4, name: "반포 한강공원", description: "반포대교~동작대교 · 분수 구간 혼잡" },
    { id: 5, name: "안양천", description: "구로~금천 · 한강 대비 한적함" },
];

export async function getCourses() {
    // TODO: 코스 목록 조회 API가 개발되면 실제 요청으로 교체
    await new Promise((resolve) => setTimeout(resolve, 350));
    return MOCK_COURSES;
}
