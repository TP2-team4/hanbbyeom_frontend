import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEMP_VERIFICATION_CODE = "123456";

type EmailVerificationStatus =
	| "idle"
	| "requesting"
	| "sent"
	| "verified"
	| "error";

export default function SignupPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [emailState, setEmailState] = useState(false);
	const [emailVerificationStatus, setEmailVerificationStatus] =
		useState<EmailVerificationStatus>("idle");
	const [verificationCode, setVerificationCode] = useState("");
	const [verificationError, setVerificationError] = useState<string | null>(null);
	const [nicknameState, setNicknameState] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const isNicknameValid = nicknameState.trim().length > 0;
	const isPasswordMatch = passwordConfirm.length > 0 && passwordConfirm === password;
	const isFormValid =
		emailState &&
		emailVerificationStatus === "verified" &&
		isNicknameValid &&
		password.length >= 8 &&
		isPasswordMatch;

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setEmailState(EMAIL_REGEX.test(value));
		// 이메일을 다시 수정하면 이전 인증 결과는 무효화
		setEmailVerificationStatus("idle");
		setVerificationCode("");
		setVerificationError(null);
	};

	const handleRequestVerificationCode = async () => {
		if (!emailState || emailVerificationStatus === "requesting") return;

		setEmailVerificationStatus("requesting");
		setVerificationCode("");
		setVerificationError(null);

		try {
			// await requestEmailVerificationApi({ email });

			// TODO: 실제 API 연결되면 아래 임시 딜레이는 제거
			await new Promise((resolve) => setTimeout(resolve, 500));
			setEmailVerificationStatus("sent");
		} catch {
			setEmailVerificationStatus("error");
		}
	};

	const handleVerifyEmail = () => {
		if (verificationCode === TEMP_VERIFICATION_CODE) {
			setEmailVerificationStatus("verified");
			setVerificationError(null);
			return;
		}

		setVerificationError("인증번호가 올바르지 않아요.");
	};

	const handleSignup = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isFormValid || isSubmitting) return;

		setIsSubmitting(true);
		setSubmitError(null);

		try {
			// const response = await signupApi({
			// 	email,
			// 	nickname: nicknameState,
			// 	password,
			// });

			navigate("/login", { replace: true });
		} catch {
			setSubmitError("회원가입에 실패했어요. 다시 시도해 주세요.");
		} finally {
			setIsSubmitting(false);
		}
	};

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

				<form
					className="flex flex-col gap-4 px-4 pt-5"
					onSubmit={handleSignup}
				>
					<div className="flex flex-col gap-2">
						<label
							htmlFor="email"
							className="text-sm font-bold text-body"
						>
							이메일
						</label>
						<div className="flex gap-2">
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="이메일을 입력해 주세요"
								autoComplete="email"
								className="min-w-0 flex-1 bg-gray-50"
								value={email}
								onChange={handleEmailChange}
								required
							/>
							<Button
								type="button"
								variant="secondary"
								className="h-14 shrink-0 px-4"
								disabled={!emailState || emailVerificationStatus === "requesting"}
								onClick={handleRequestVerificationCode}
							>
								{emailVerificationStatus === "requesting"
									? "요청 중"
									: emailVerificationStatus === "sent"
										? "재요청"
										: "인증요청"}
							</Button>
						</div>
						{(emailVerificationStatus === "sent" ||
							emailVerificationStatus === "verified") && (
							<div className="flex gap-2">
								<Input
									id="email-verification-code"
									name="emailVerificationCode"
									type="text"
									inputMode="numeric"
									autoComplete="one-time-code"
									placeholder="인증번호 6자리"
									className="min-w-0 flex-1"
									maxLength={6}
									value={verificationCode}
									disabled={emailVerificationStatus === "verified"}
									onChange={(e) => {
										setVerificationCode(e.target.value.replace(/\D/g, ""));
										setVerificationError(null);
									}}
								/>
								<Button
									type="button"
									variant="secondary"
									className="h-14 shrink-0 px-4"
									disabled={
										verificationCode.length !== 6 ||
										emailVerificationStatus === "verified"
									}
									onClick={handleVerifyEmail}
								>
									{emailVerificationStatus === "verified" ? "인증완료" : "확인"}
								</Button>
							</div>
						)}
						{emailVerificationStatus === "sent" && !verificationError && (
							<p className="text-xs text-body">
								임시 인증번호는 {TEMP_VERIFICATION_CODE}입니다.
							</p>
						)}
						{emailVerificationStatus === "verified" && (
							<p className="text-xs text-body">이메일 인증이 완료됐어요.</p>
						)}
						{verificationError && (
							<p role="alert" className="text-xs text-error-text">
								{verificationError}
							</p>
						)}
						{emailVerificationStatus === "error" && (
							<p role="alert" className="text-xs text-error-text">
								인증번호 요청에 실패했어요. 다시 시도해 주세요.
							</p>
						)}
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
								value={nicknameState}
								onChange={(e) => setNicknameState(e.target.value)}
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
							aria-invalid={passwordConfirm.length > 0 && !isPasswordMatch}
							variant={passwordConfirm.length > 0 && !isPasswordMatch ? "error" : "default"}
							required
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
						/>
						{passwordConfirm.length > 0 &&
							(isPasswordMatch ? (
								<p className="text-xs text-body">비밀번호가 일치해요.</p>
							) : (
								<p
									id="password-confirm-error"
									role="alert"
									className="text-xs text-error-text"
								>
									비밀번호가 일치하지 않아요.
								</p>
							))}
					</div>

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
						{submitError && (
							<p role="alert" className="mb-2 text-xs text-error-text">
								{submitError}
							</p>
						)}
						<Button
							type="submit"
							variant="primary"
							className="h-14 w-full"
							disabled={!isFormValid || isSubmitting}
						>
							{isSubmitting ? "가입 중..." : "가입하기"}
						</Button>
					</footer>
				</form>
			</section>
		</main>
	);
}
