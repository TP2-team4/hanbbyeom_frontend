import type { RecruitmentDetail } from "../model/types";

const CONVERSATION_STYLE_LABEL = {
	SILENT: "조용히",
	LIGHT_CHAT: "가벼운 대화",
} as const;

export function RecruitmentInfoCard({ recruitment }: { recruitment: RecruitmentDetail }) {
	return (
		<section className="rounded-2xl border border-border bg-surface p-6" aria-labelledby="recruitment-location">
			<div className="flex flex-wrap items-center gap-3">
				<h2 id="recruitment-location" className="text-2xl font-bold text-title">
					{recruitment.location}
				</h2>
				<span className="rounded-full bg-primary-100 px-3 py-1.5 text-sm text-secondary-400">
					{CONVERSATION_STYLE_LABEL[recruitment.conversationStyle]}
				</span>
			</div>

			<dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm">
				<Detail label="거리" value={`${recruitment.minDistanceKm} ~ ${recruitment.maxDistanceKm}km`} />
				<Detail label="일시" value={`${recruitment.dateLabel} ${recruitment.time}`} />
				<Detail label="페이스" value={`${recruitment.pace}/km`} />
				<Detail label="만나는 곳" value={recruitment.meetingPlace} />
			</dl>
		</section>
	);
}

function Detail({ label, value }: { label: string; value: string }) {
	return (
		<>
			<dt className="text-body">{label}</dt>
			<dd className="text-right font-medium text-title">{value}</dd>
		</>
	);
}
