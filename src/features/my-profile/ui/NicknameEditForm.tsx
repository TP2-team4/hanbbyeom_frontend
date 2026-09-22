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
	const {
		nickname,
		changeNickname,
		touchNickname,
		nicknameError,
		submitError,
		canSubmit,
		isSubmitting,
		submit,
	} = useNicknameEdit(initialNickname);

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
			<div className="flex flex-col gap-2">
				<label htmlFor="nickname" className="text-sm font-bold text-body">
					닉네임
				</label>
				<Input
					id="nickname"
					name="nickname"
					type="text"
					placeholder="최대 16자로 입력해 주세요."
					autoComplete="nickname"
					maxLength={16}
					variant={nicknameError ? "error" : "default"}
					value={nickname}
					onChange={(event) => changeNickname(event.target.value)}
					onBlur={touchNickname}
					required
				/>
				{nicknameError && (
					<ErrorText className="text-xs">{nicknameError}</ErrorText>
				)}
			</div>
			<div className="flex-1" />
			{submitError && (
				<ErrorText className="mb-2 text-xs">{submitError}</ErrorText>
			)}
			<Button
				type="submit"
				variant="primary"
				className="h-14 w-full"
				disabled={!canSubmit || isSubmitting}
				isLoading={isSubmitting}
				loadingLabel="저장하는 중"
			>
				저장
			</Button>
		</form>
	);
}
