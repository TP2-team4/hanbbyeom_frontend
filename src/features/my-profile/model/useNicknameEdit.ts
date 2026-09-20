import { useState } from "react";
import { updateNickname } from "../api/updateNickname";
import {
	isValidNickname,
	NICKNAME_MAX_LENGTH,
	NICKNAME_MIN_LENGTH,
} from "../../../shared/lib/validation";

export function useNicknameEdit(initialNickname: string) {
	const [nickname, setNickname] = useState(initialNickname);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submit = async (): Promise<boolean> => {
		const trimmed = nickname.trim();
		if (!isValidNickname(trimmed)) {
			setError(
				`닉네임은 ${NICKNAME_MIN_LENGTH}자 이상 ${NICKNAME_MAX_LENGTH}자 이하로 입력해주세요.`,
			);
			return false;
		}

		setIsSubmitting(true);
		setError(null);
		try {
			await updateNickname(trimmed);
			return true;
		} catch (e) {
			setError(
				e instanceof Error
					? e.message
					: "닉네임을 저장하지 못했어요. 다시 시도해 주세요.",
			);
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	return { nickname, setNickname, isSubmitting, error, submit };
}