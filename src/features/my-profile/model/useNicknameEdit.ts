import { useState } from "react";
import { updateNickname } from "../api/updateNickname";

export function useNicknameEdit(initialNickname: string) {
	const [nickname, setNickname] = useState(initialNickname);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submit = async (): Promise<boolean> => {
		const trimmed = nickname.trim();
		if (!trimmed) {
			setError("닉네임을 입력해 주세요.");
			return false;
		}

		setIsSubmitting(true);
		setError(null);
		try {
			await updateNickname(trimmed);
			return true;
		} catch {
			setError("닉네임을 저장하지 못했어요. 다시 시도해 주세요.");
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	return { nickname, setNickname, isSubmitting, error, submit };
}
