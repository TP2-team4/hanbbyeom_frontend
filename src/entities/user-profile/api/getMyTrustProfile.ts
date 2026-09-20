import type { RecruitmentAuthorProfile } from "../model/types";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";

export type TrustProfile = RecruitmentAuthorProfile;

export async function getMyTrustProfile(): Promise<TrustProfile> {
    const response = await authorizedFetch("/api/users/me/trust-profile");

    if (!response.ok) {
        throw new Error("신뢰도 정보를 불러오지 못했습니다.");
    }

    return response.json() as Promise<TrustProfile>;
}