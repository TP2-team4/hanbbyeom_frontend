import { useEffect } from "react";

type Props = {
	message: string;
	onDismiss: () => void;
	durationMs?: number;
};

export function Toast({ message, onDismiss, durationMs = 3000 }: Props) {
	useEffect(() => {
		const timer = setTimeout(onDismiss, durationMs);
		return () => clearTimeout(timer);
	}, [message, durationMs, onDismiss]);

	return (
		<div
			role="alert"
			className="fixed inset-x-0 bottom-24 z-50 mx-auto w-fit max-w-[calc(100%-3rem)] rounded-lg bg-title px-4 py-3 text-center text-sm font-medium text-surface shadow-lg"
		>
			{message}
		</div>
	);
}
