import { useState, type FormEvent } from "react";
import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";

type Props = {
	isSending: boolean;
	onSend: (content: string) => Promise<boolean>;
};

export function ChatMessageComposer({ isSending, onSend }: Props) {
	const [content, setContent] = useState("");

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (!content.trim() || isSending) return;
		const wasSent = await onSend(content);
		if (wasSent) setContent("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex shrink-0 items-center gap-2 border-t border-divider bg-surface p-4"
		>
			<Input
				value={content}
				onChange={(event) => setContent(event.target.value)}
					placeholder="메시지를 입력하세요"
					maxLength={100}
				disabled={isSending}
				className="flex-1"
			/>
			<Button
				type="submit"
				variant="primary"
				isLoading={isSending}
				loadingLabel="전송 중"
				disabled={!content.trim()}
				className="h-14 shrink-0 px-6"
			>
				전송
			</Button>
		</form>
	);
}
