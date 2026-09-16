import { http, HttpResponse } from "msw";

export const handlers = [
	//모집글 작성 - 코스 전체 리스트
	http.get("/api/run/courses", () => {
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

	//회원가입 - 이메일 인증 요청
	http.post("/api/auth/email-verifications", async ({ request }) => {
		const body = await request.json();
		console.log("클라이언트가 보낸 데이터 : ", body);
		return new HttpResponse(null, { status: 200 });
	}),

	//회원가입 - 이메일 인증번호 확인
	http.post("/api/auth/email-verifications/confirm", async ({ request }) => {
		const body = await request.json();
		console.log("클라이언트가 보낸 데이터 : ", body);
		return new HttpResponse(null, { status: 200 });
	}),

	//회원 가입 - 회원 가입 요청
	http.post("/api/auth/signup", async ({ request }) => {
		const body = await request.json();
		console.log("클라이언트가 보낸 데이터 : ", body);
		return HttpResponse.json({
			id: 1,
			email: "user@example.com",
			nickname: "닉네임 결과",
		});
	}),

	//로그인
	http.post("/api/auth/login", async ({ request }) => {
		const body = await request.json();
		console.log("클라이언트가 보낸 데이터 : ", body);
		return HttpResponse.json({
			accessToken: "mock-access-token",
		});
	}),

	//모집 게시판 - 목록 조회
	http.get("/api/matching/board", () => {
		return HttpResponse.json([
			{
				id: 1,
				courseName: "뚝섬 한강공원",
				distanceMinMeters: 6000,
				distanceMaxMeters: 8000,
				talkLevel: "SILENT",
				scheduledAt: "2026-09-12T07:00:00+09:00",
				paceMinSec: 360,
				paceMaxSec: 400,
				author: { nickname: "조용한러너", rating: 4.8, completedCount: 31 },
			},
			{
				id: 2,
				courseName: "여의도 한강공원",
				distanceMinMeters: 8000,
				distanceMaxMeters: 10000,
				talkLevel: "LIGHT_CHAT",
				scheduledAt: "2026-09-13T06:30:00+09:00",
				paceMinSec: 340,
				paceMaxSec: 370,
				author: { nickname: "새벽공기", rating: 4.6, completedCount: 12 },
			},
			{
				id: 3,
				courseName: "반포 한강공원",
				distanceMinMeters: 3000,
				distanceMaxMeters: 5000,
				talkLevel: "SILENT",
				scheduledAt: "2026-09-14T20:00:00+09:00",
				paceMinSec: 390,
				paceMaxSec: 420,
				author: { nickname: "밤산책", rating: 4.9, completedCount: 8 },
			},
		]);
	}),

	//모집 게시판 - 호스트 신뢰 프로필 조회
	http.get("/api/matching/board/:id/host-profile", () => {
		return HttpResponse.json({
			averageRating: 4.8,
			reviewCount: 10,
			completedCount: 12,
			noShowReportCount: 0,
		});
	}),

	//모집 게시판 - 신청
	http.post("/api/matching/board/:id/apply", () => {
		return new HttpResponse(null, {
			status: 201,
			headers: { Location: "/api/matching/matches/1" },
		});
	}),

	//모집 게시판 - 신청 취소
	http.post("/api/matching/board/:id/apply/cancel", () => {
		return new HttpResponse(null, { status: 204 });
	}),
];
