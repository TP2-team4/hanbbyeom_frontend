import type { ChatMatchSummary } from "../../../entities/chat-room";

const dateTimeFormatter = new Intl.DateTimeFormat("ko-KR", {
	month: "long",
	day: "numeric",
	weekday: "short",
	hour: "numeric",
	minute: "2-digit",
	timeZone: "Asia/Seoul",
});

type Props = {
	match: ChatMatchSummary;
};

export function ChatMatchSummaryCard({ match }: Props) {
	return (
		<section
			className="mx-4 mb-2 shrink-0 rounded-lg border border-border bg-surface px-4 py-3"
			aria-label="예정된 활동 정보"
		>
			<div className="flex items-center justify-between gap-3">
				<h2 className="font-bold text-title">{match.courseName}</h2>
				<span className="shrink-0 rounded-full bg-primary-100 px-2.5 py-1 text-xs font-medium text-secondary-400">
					예정된 활동
				</span>
			</div>
			<p className="mt-2 text-sm text-body">
				{dateTimeFormatter.format(new Date(match.scheduledAt))}
			</p>
			<p className="mt-1 text-sm text-body">
				<span className="font-medium text-title">만나는 곳</span>
				<span className="mx-1.5 text-gray-400">·</span>
				{match.location}
			</p>
		</section>
	);
}
