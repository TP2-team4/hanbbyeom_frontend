import { http, HttpResponse } from "msw";

export const handlers = [
	http.get("/api/courses", () => {
		return HttpResponse.json([
			{
				id: 1,
				name: "뚝섬 한강공원",
				routeDescription: "성수대교~영동대교·평지·야간 조명 좋음",
			},
			{
				id: 2,
				name: "여의도 한강공원",
				routeDescription: "마포대교~원효대교·넓은 산책로",
			},
			{
				id: 3,
				name: "잠실 한강공원",
				routeDescription: "잠실대교~올림픽대교·강변 직선 구간",
			},
			{
				id: 4,
				name: "반포 한강공원",
				routeDescription: "반포대교~동작대교·분수 구간 초점",
			},
			{
				id: 5,
				name: "안양천",
				routeDescription: "구로~금천 한강 대비 한적",
			},
		]);
	}),
];
