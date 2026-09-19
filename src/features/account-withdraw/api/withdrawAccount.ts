import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export async function withdrawAccount(password: string): Promise<void> {
    const response = await authorizedFetch("/api/users/me/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
    });

    if (!response.ok) {
        throw new Error(
            await extractErrorMessage(response, "회원 탈퇴에 실패했습니다."),
        );
    }
}