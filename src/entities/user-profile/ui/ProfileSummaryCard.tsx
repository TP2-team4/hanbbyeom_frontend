import { useNavigate } from "react-router-dom";
import type { UserProfile } from "../model/types";
import logoHb from "../../../shared/assets/images/logo_hb_2.png";

type Props = {
	profile: UserProfile;
};

export function ProfileSummaryCard({ profile }: Props) {
	const navigate = useNavigate();
	return (
		<section
			className="relative rounded-lg border border-border bg-surface p-6"
			aria-labelledby="profile-nickname"
		>
			<button
				type="button"
				aria-label="설정"
				onClick={() => navigate("/my-page/settings")}
				className="absolute right-3 top-3 grid size-10 place-items-center text-title"
			>
				<svg
					aria-hidden="true"
					viewBox="0 0 24 24"
					className="size-6 fill-none stroke-current"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="3" />
					<path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.35a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.65 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.65 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.65a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.65a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.35 9a1.7 1.7 0 0 0 1.56 1.04H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
				</svg>
			</button>
			<div className="flex items-center gap-4 pr-8">
				<span
					aria-hidden="true"
					className="grid size-16 shrink-0 place-items-center rounded-full bg-primary-100"
				>
					<img
						src={logoHb}
						alt=""
						className="size-10 shrink-0 object-contain"
					/>
				</span>
				<div className="min-w-0 flex-1">
					<h2
						id="profile-nickname"
						className="truncate text-2xl font-bold text-title"
					>
						{profile.nickname}
					</h2>
					<p className="mt-1 truncate text-sm text-body">
						{profile.email}
					</p>
					<p className="mt-1 text-sm text-body">
						선호 대화 수준 ·{" "}
						{profile.conversationPreference === "SILENT"
							? "조용히"
							: "가벼운 대화"}
					</p>
				</div>
			</div>

			<dl className="mt-6 grid grid-cols-3 gap-2">
				<Stat
					value={
						profile.averageRating !== null
							? profile.averageRating.toFixed(1)
							: "평가 없음"
					}
					compact={profile.averageRating === null}
					label="평균 별점"
				/>
				<Stat
					value={String(profile.completedActivityCount)}
					label="완료한 활동"
				/>
				<Stat
					value={String(profile.noShowReportCount)}
					label="노쇼 신고"
				/>
			</dl>
		</section>
	);
}

function Stat({
	value,
	label,
	compact,
}: {
	value: string;
	label: string;
	compact?: boolean;
}) {
	return (
		<div className="flex flex-col rounded-lg bg-gray-50 px-3 py-5">
			<dt className="text-xs text-body">{label}</dt>
			<dd className="-order-1 mb-1 flex h-8 items-center">
				<span
					className={`whitespace-nowrap font-bold text-title ${compact ? "text-base" : "text-2xl"}`}
				>
					{value}
				</span>
			</dd>
		</div>
	);
}
