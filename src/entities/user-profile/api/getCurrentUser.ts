import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export type CurrentUser = {
	id: number;
	email: string;
	nickname: string;
	defaultTalkLevel: "SILENT" | "LIGHT_CHAT";
};

export async function getCurrentUser(): Promise<CurrentUser> {
	const response = await authorizedFetch("/api/users/me");

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "사용자 정보를 불러오지 못했습니다."),
		);
	}

	return response.json() as Promise<CurrentUser>;
}
