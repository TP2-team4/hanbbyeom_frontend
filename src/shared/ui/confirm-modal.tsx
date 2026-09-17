import { useId } from "react";
import Button from "./button";

type Props = {
	title: string;
	description: string;
	cancelLabel: string;
	confirmLabel: string;
	confirmVariant?: "primary" | "destructive";
	onCancel: () => void;
	onConfirm: () => void;
};

export function ConfirmModal({
	title,
	description,
	cancelLabel,
	confirmLabel,
	confirmVariant = "primary",
	onCancel,
	onConfirm,
}: Props) {
	const titleId = useId();

	return (
		<div
			className="fixed inset-0 z-50 grid place-items-center bg-gray-900/40 px-4"
			role="presentation"
		>
			<section
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				className="w-full max-w-[360px] rounded-2xl bg-surface p-6 shadow-xl"
			>
				<p id={titleId} className="text-base font-bold text-title">
					{title}
				</p>
				<p className="mt-2 text-sm text-body">{description}</p>
				<div className="mt-6 flex gap-2">
					<Button
						type="button"
						variant="secondary"
						className="h-12 flex-1 text-sm"
						onClick={onCancel}
					>
						{cancelLabel}
					</Button>
					<Button
						type="button"
						variant={confirmVariant}
						className="h-12 flex-1 text-sm"
						onClick={onConfirm}
					>
						{confirmLabel}
					</Button>
				</div>
			</section>
		</div>
	);
}
