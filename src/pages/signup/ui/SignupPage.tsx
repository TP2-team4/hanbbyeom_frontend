import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";

export default function SignupPage() {
	const navigate = useNavigate();

	return (
		<main className="mx-auto min-h-full w-full max-w-[430px] bg-secondary-50">
			<section
				aria-labelledby="signup-title"
				className="overflow-hidden bg-surface"
			>
				<header className="flex h-16 items-center gap-3  px-4">
					<button
						type="button"
						aria-label="이전 화면으로 이동"
						onClick={() => navigate(-1)}
						className="grid size-10 place-items-center text-2xl text-title"
					>
						←
					</button>
					<h1
						id="signup-title"
						className="text-lg font-bold text-title"
					>
						회원가입
					</h1>
				</header>

				<form className="flex flex-col gap-4 px-4 pt-5">
					<div className="flex flex-col gap-2">
						<label
							htmlFor="email"
							className="text-sm font-bold text-body"
						>
							이메일
						</label>
						<Input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							className="bg-gray-50"
							required
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label
							htmlFor="nickname"
							className="text-sm font-bold text-body"
						>
							닉네임
						</label>
						<div className="flex gap-2">
							<Input
								id="nickname"
								name="nickname"
								type="text"
								autoComplete="nickname"
								aria-describedby="nickname-description"
								className="min-w-0 flex-1"
								required
							/>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<label
							htmlFor="password"
							className="text-sm font-bold text-body"
						>
							비밀번호
						</label>
						<Input
							id="password"
							name="password"
							type="password"
							autoComplete="new-password"
							minLength={8}
							required
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label
							htmlFor="password-confirm"
							className="text-sm font-bold text-body"
						>
							비밀번호 확인
						</label>
						<Input
							id="password-confirm"
							name="passwordConfirm"
							type="password"
							autoComplete="new-password"
							aria-describedby="password-confirm-error"
							aria-invalid="true"
							variant="default"
							required
						/>
						{/* 비밀번호 입력 확인 상태에 따라 조건부 렌더링 추가  */}
						{/* <p
							id="password-confirm-error"
							role="alert"
							className="text-xs text-error-text"
						>
							비밀번호가 일치하지 않아요.
						</p> */}
					</div>

					{/* 여기는 로컬에만 저장해서 사용자가 매칭 시도할 때 자동으로 선택해주는 용도  */}
					<fieldset className="flex flex-wrap gap-2">
						<legend className="mb-2 text-sm font-bold text-body">
							선호 대화 수준
						</legend>

						<label className="cursor-pointer">
							<input
								type="radio"
								name="conversationLevel"
								value="SILENT"
								defaultChecked
								className="peer sr-only"
							/>
							<span className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-bold text-body peer-checked:border-primary-400 peer-checked:bg-primary-400 peer-checked:text-title">
								SILENT
							</span>
						</label>

						<label className="cursor-pointer">
							<input
								type="radio"
								name="conversationLevel"
								value="GREETING_ONLY"
								className="peer sr-only"
							/>
							<span className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-bold text-body peer-checked:border-primary-400 peer-checked:bg-primary-400 peer-checked:text-title">
								GREETING_ONLY
							</span>
						</label>

						<label className="cursor-pointer">
							<input
								type="radio"
								name="conversationLevel"
								value="LIGHT_CHAT"
								className="peer sr-only"
							/>
							<span className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-bold text-body peer-checked:border-primary-400 peer-checked:bg-primary-400 peer-checked:text-title">
								LIGHT_CHAT
							</span>
						</label>

						<p className="w-full text-xs leading-5 text-body">
							나중에 마이페이지에서 바꿀 수 있어요.
						</p>
					</fieldset>

					{/* <fieldset className="flex flex-col gap-2 text-sm text-body">
						<legend className="sr-only">약관 동의</legend>

						<label className="flex items-center gap-2 font-bold text-title">
							<input
								type="checkbox"
								name="agreeAll"
								className="size-5 accent-primary-400"
							/>
							<span>약관 전체 동의</span>
						</label>

						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								name="agreeTerms"
								required
								className="size-5 accent-primary-400"
							/>
							<span>
								(필수) 서비스 이용약관 · 개인정보 처리방침
							</span>
						</label>

					</fieldset> */}

					<footer className="-mx-4 mt-2 border-t border-divider p-4">
						<Button
							type="submit"
							variant="primary"
							className="h-14 w-full"
						>
							가입하기
						</Button>
					</footer>
				</form>
			</section>
		</main>
	);
}
