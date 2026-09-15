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
];
