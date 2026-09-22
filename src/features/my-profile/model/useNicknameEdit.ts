import { useState } from "react";
import { updateNickname } from "../api/updateNickname";
import {
	getNicknameError,
	isValidNickname,
} from "../../../shared/lib/validation";

export function useNicknameEdit(initialNickname: string) {
	const [nickname, setNickname] = useState(initialNickname);
	const [nicknameTouched, setNicknameTouched] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const nicknameError = nicknameTouched ? getNicknameError(nickname) : null;
	const canSubmit =
		isValidNickname(nickname) && nickname.trim() !== initialNickname.trim();

	const changeNickname = (value: string) => {
		setNickname(value);
		setSubmitError(null);
	};

	const touchNickname = () => setNicknameTouched(true);

	const submit = async (): Promise<boolean> => {
		setNicknameTouched(true);
		const trimmed = nickname.trim();
		if (!isValidNickname(trimmed)) {
			return false;
		}

		setIsSubmitting(true);
		setSubmitError(null);
		try {
			await updateNickname(trimmed);
			return true;
		} catch (e) {
			setSubmitError(
				e instanceof Error
					? e.message
					: "닉네임을 저장하지 못했어요. 다시 시도해 주세요.",
			);
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		nickname,
		changeNickname,
		touchNickname,
		nicknameError,
		submitError,
		canSubmit,
		isSubmitting,
		submit,
	};
}
