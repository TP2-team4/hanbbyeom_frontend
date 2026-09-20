import type { FormEvent } from "react";
import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import { ErrorText } from "../../../shared/ui/error-text";
import { useNicknameEdit } from "../model/useNicknameEdit";

type Props = {
	initialNickname: string;
	onSaved: () => void;
};

export function NicknameEditForm({ initialNickname, onSaved }: Props) {
	const { nickname, setNickname, isSubmitting, error, submit } =
		useNicknameEdit(initialNickname);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const saved = await submit();
		if (saved) onSaved();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-1 flex-col px-6 py-6"
		>
			<label htmlFor="nickname" className="text-sm font-bold text-title">
				닉네임
			</label>
			<Input
				id="nickname"
				value={nickname}
				onChange={(event) => setNickname(event.target.value)}
				maxLength={16}
				className="mt-2"
			/>
			{error && <ErrorText className="mt-2 text-sm">{error}</ErrorText>}
			<div className="flex-1" />
			<Button
				type="submit"
				variant="primary"
				className="h-14 w-full"
				isLoading={isSubmitting}
				loadingLabel="저장하는 중"
			>
				저장
			</Button>
		</form>
	);
}
