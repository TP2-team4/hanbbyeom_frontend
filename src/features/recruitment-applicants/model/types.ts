import type { RecruitmentAuthorProfile } from "../../../entities/user-profile";

export type PendingApplicant = {
	activityMatchId: number;
	decisionExpiresAt: string;
	profile: RecruitmentAuthorProfile;
};
