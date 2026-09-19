import { useAsync } from "../../../shared/lib/useAsync";
import { useNavigate, useParams } from "react-router-dom";
import {
	getRecruitmentAuthorProfile,
	type RecruitmentAuthorProfile,
} from "../../../entities/user-profile";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";

export default function RecruitmentAuthorProfilePage() {
	const navigate = useNavigate();
	const { recruitmentId } = useParams();
	const id = Number(recruitmentId);
	const isValidId = Number.isInteger(id);

	const {
		data: profile,
		isLoading,
		error: loadError,
	} = useAsync<RecruitmentAuthorProfile | null>(
		async () => {
			if (!isValidId) return null;
			return getRecruitmentAuthorProfile(id);
		},
		null,
		[id, isValidId],
		"정보를 불러오지 못했어요. 다시 시도해 주세요.",
	);

	return (
		<main className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-primary-50">
			<header className="flex h-20 items-center gap-2 bg-primary-50 px-6">
				<button
					type="button"
					aria-label="뒤로 가기"
					className="grid size-10 place-items-center text-title"
					onClick={() => navigate(-1)}
				>
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="size-7 fill-none stroke-current"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="m15 18-6-6 6-6" />
					</svg>
				</button>
				<h1 className="text-2xl font-bold text-title">작성자 프로필</h1>
			</header>

			<section className="flex-1 space-y-5 px-6 py-6" aria-live="polite">
				{isValidId && !loadError && isLoading && (
					<StatusText>정보를 불러오는 중...</StatusText>
				)}
				{loadError && (
					<ErrorText className="py-10 text-center text-sm">
						{loadError}
					</ErrorText>
				)}
				{!loadError && (!isValidId || (!isLoading && profile === null)) && (
					<StatusText>정보를 찾을 수 없어요.</StatusText>
				)}
				{isValidId && !isLoading && !loadError && profile && (
					<section
						className="rounded-2xl border border-border bg-surface p-6"
						aria-labelledby="author-profile-heading"
					>
						<div className="flex items-center gap-4">
							<span
								aria-hidden="true"
								className="grid size-14 shrink-0 place-items-center rounded-full bg-primary-100 text-secondary-300"
							>
								<svg
									viewBox="0 0 24 24"
									className="size-7 fill-current"
								>
									<circle
										cx="12"
										cy="8"
										r="3"
									/>
									<path d="M6 20c.4-4.2 2.4-6 6-6s5.6 1.8 6 6Z" />
								</svg>
							</span>
							<p
								id="author-profile-heading"
								className="text-base text-body"
							>
								{profile.averageRating !== null ? (
									<>
										★{" "}
										<strong className="text-lg text-title">
											{profile.averageRating.toFixed(1)}
										</strong>{" "}
										· 후기 {profile.reviewCount}개
									</>
								) : (
									"평가 없음"
								)}
							</p>
						</div>

						<dl className="mt-6 grid grid-cols-2 gap-2">
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
				)}
			</section>
		</main>
	);
}

function Stat({ value, label }: { value: string; label: string }) {
	return (
		<div className="flex flex-col rounded-lg bg-gray-50 px-3 py-5">
			<dt className="text-xs text-body">{label}</dt>
			<dd className="-order-1 mb-1 text-2xl font-bold text-title">
				{value}
			</dd>
		</div>
	);
}
