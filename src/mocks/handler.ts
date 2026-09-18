import { http, HttpResponse } from "msw";

// 모집글 생성 409 충돌(이미 진행 중인 모집글/신청 있음) 시뮬레이션용 — 새로고침하면 초기화됨
let hasActiveMatchRequest = false;
let hasPendingApplication = true;
let mockRequestStatus:
	| "SEARCHING"
	| "PENDING_CONFIRMATION"
	| "MATCHED" = "PENDING_CONFIRMATION";

export const handlers = [
	//모집글 작성 - 코스 전체 리스트
	http.get("*/api/run/courses", () => {
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
	http.post("*/api/auth/email-verifications", async ({ request }) => {
		const body = await request.json();
		console.log("클라이언트가 보낸 데이터 : ", body);
		return new HttpResponse(null, { status: 200 });
	}),

	//회원가입 - 이메일 인증번호 확인
	http.post("*/api/auth/email-verifications/confirm", async ({ request }) => {
		const body = await request.json();
		console.log("클라이언트가 보낸 데이터 : ", body);
		return new HttpResponse(null, { status: 200 });
	}),

	//회원 가입 - 회원 가입 요청
	http.post("*/api/auth/signup", async ({ request }) => {
		const body = await request.json();
		console.log("클라이언트가 보낸 데이터 : ", body);
		return HttpResponse.json({
			id: 1,
			email: "user@example.com",
			nickname: "닉네임 결과",
		});
	}),

	//로그인
	http.post("*/api/auth/login", async ({ request }) => {
		const body = await request.json();
		console.log("클라이언트가 보낸 데이터 : ", body);
		return HttpResponse.json({
			accessToken: "mock-access-token",
		});
	}),

	// 현재 로그인 사용자 조회
	http.get("*/api/users/me", () => {
		return HttpResponse.json({
			id: 1,
			email: "user@example.com",
			nickname: "담백한하루",
		});
	}),

	//모집 게시판 - 목록 조회
	http.get("*/api/matching/board", () => {
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
				author: {
					nickname: "조용한러너",
					rating: 4.8,
					completedCount: 31,
				},
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
				author: {
					nickname: "새벽공기",
					rating: 4.6,
					completedCount: 12,
				},
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
	http.get("*/api/matching/board/:id/host-profile", () => {
		return HttpResponse.json({
			averageRating: 4.8,
			reviewCount: 10,
			completedCount: 12,
			noShowReportCount: 0,
		});
	}),

	//모집 게시판 - 지원자 신뢰 프로필 조회
	http.get("*/api/matching/matches/:id/applicant-profile", () => {
		return HttpResponse.json({
			averageRating: 4.8,
			reviewCount: 10,
			completedCount: 12,
			noShowReportCount: 0,
		});
	}),

	//모집글 상세 조회
	// 실제 백엔드 status는 SEARCHING|PENDING_CONFIRMATION|MATCHED|CANCELLED|EXPIRED|CLOSED 6종 —
	// id별로 다른 상태를 내려주도록 매핑해서 mock으로도 전 상태를 재현 가능하게 함
	http.get("*/api/matching/requests/:id", ({ params }) => {
		const id = Number(params.id);
		const base = {
			courseName: "뚝섬 한강공원",
			distanceMinMeters: 5000,
			distanceMaxMeters: 12000,
			paceMinSec: 360,
			paceMaxSec: 400,
			meetingPoint: "뚝섬유원지역 3번 출구",
			scheduledAt: "2026-09-12T07:00:00+09:00",
			talkLevel: "SILENT" as const,
			author: {
				nickname: "조용한러너",
				rating: 4.8,
				completedCount: 31,
			},
		};

		const BY_ID: Record<
			number,
			{
				status:
					| "SEARCHING"
					| "PENDING_CONFIRMATION"
					| "MATCHED"
					| "CANCELLED"
					| "EXPIRED"
					| "CLOSED";
				isOwner: boolean;
				pendingApplicantCount: number;
			}
		> = {
			1: {
				status: "SEARCHING",
				isOwner: false,
				pendingApplicantCount: 0,
			},
			2: {
				status: mockRequestStatus,
				isOwner: true,
				pendingApplicantCount: hasPendingApplication ? 1 : 0,
			},
			3: { status: "MATCHED", isOwner: true, pendingApplicantCount: 0 },
			4: { status: "CANCELLED", isOwner: true, pendingApplicantCount: 0 },
			5: { status: "EXPIRED", isOwner: false, pendingApplicantCount: 0 },
			6: { status: "CLOSED", isOwner: true, pendingApplicantCount: 0 },
		};

		const variant = BY_ID[id] ?? BY_ID[1];

		return HttpResponse.json({
			id,
			...base,
			...variant,
		});
	}),

	//모집글 생성
	// 실제 백엔드는 이미 진행 중인 모집글/신청이 있으면 409로 거부함
	http.post("*/api/matching/requests", async ({ request }) => {
		const body = await request.json();
		console.log("클라이언트가 보낸 데이터 : ", body);

		if (hasActiveMatchRequest) {
			return HttpResponse.json(
				{ message: "이미 진행 중인 모집글 또는 신청이 있어요." },
				{ status: 409 },
			);
		}
		hasActiveMatchRequest = true;

		return new HttpResponse(null, {
			status: 201,
			headers: { Location: "/api/matching/requests/1" },
		});
	}),

	// 모집글 취소
	http.post("*/api/matching/requests/:id/cancel", () => {
		return new HttpResponse(null, { status: 204 });
	}),

	// 모집글 일정·대화 수준 수정
	http.patch("*/api/matching/requests/:id", async ({ request }) => {
		await request.json();
		return new HttpResponse(null, { status: 204 });
	}),

	//모집 게시판 - 신청
	http.post("*/api/matching/board/:id/apply", () => {
		return new HttpResponse(null, {
			status: 201,
			headers: { Location: "/api/matching/matches/1" },
		});
	}),

	//모집 게시판 - 신청 취소
	http.post("*/api/matching/board/:id/apply/cancel", () => {
		return new HttpResponse(null, { status: 204 });
	}),

	// 모집글 - 현재 대기 중인 신청 조회
	http.get("*/api/matching/requests/:id/pending-application", ({ params }) => {
		const recruitmentId = Number(params.id);

		if (recruitmentId !== 2 || !hasPendingApplication) {
			return new HttpResponse(null, { status: 404 });
		}

		return HttpResponse.json({
			activityMatchId: 101,
			decisionExpiresAt: "2026-09-18T20:00:00+09:00",
		});
	}),

	// 모집글 - 신청 수락
	http.post("*/api/matching/matches/:id/accept", ({ params }) => {
		const activityMatchId = Number(params.id);
		hasPendingApplication = false;
		mockRequestStatus = "MATCHED";

		return HttpResponse.json({
			activityMatchId,
			meetingCode: "123456",
			confirmedAt: new Date().toISOString(),
		});
	}),

	// 모집글 - 신청 거절
	http.post("*/api/matching/matches/:id/reject", () => {
		hasPendingApplication = false;
		mockRequestStatus = "SEARCHING";
		return new HttpResponse(null, { status: 204 });
	}),
];
