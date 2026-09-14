import Button from "../../../shared/ui/button";

type Props = {
	onCreate?: () => void;
};

export function CreateRecruitmentBanner({ onCreate }: Props) {
	return (
		<article className="rounded-lg border border-border bg-surface px-5 py-6">
			<div className="flex items-center gap-3">
				<span
					aria-hidden="true"
					className="size-2.5 rounded-full bg-primary-400"
				/>
				<h2 className="text-2xl font-bold text-title">Silent Run</h2>
			</div>
			<p className="mt-3 text-base leading-6 text-body">
				서로 말 없이 페이스만 맞춰 달려요.
			</p>
			<Button
				type="button"
				className="mt-5 h-14 w-full"
				onClick={onCreate}
			>
				모집글 올리기
			</Button>
		</article>
	);
}
