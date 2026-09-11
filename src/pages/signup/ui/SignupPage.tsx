export default function SignupPage() {
	return (
		<main>
			<section aria-labelledby="signup-title">
				<header>
					<button type="button" aria-label="이전 화면으로 이동">
						←
					</button>
					<h1 id="signup-title">회원가입</h1>
				</header>

				<form>
					<div>
						<label htmlFor="email">이메일</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
						/>
					</div>

					<div>
						<label htmlFor="nickname">닉네임</label>
						<div>
							<input
								id="nickname"
								name="nickname"
								type="text"
								autoComplete="nickname"
								aria-describedby="nickname-description"
								required
							/>
							<button type="button">중복확인</button>
						</div>
						<p id="nickname-description">
							활동에서 이 이름으로만 보여요. 실명은 공개되지 않아요.
						</p>
					</div>

					<div>
						<label htmlFor="password">비밀번호</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="new-password"
							minLength={8}
							required
						/>
					</div>

					<div>
						<label htmlFor="password-confirm">비밀번호 확인</label>
						<input
							id="password-confirm"
							name="passwordConfirm"
							type="password"
							autoComplete="new-password"
							aria-describedby="password-confirm-error"
							required
						/>
						<p id="password-confirm-error" role="alert">
							비밀번호가 일치하지 않아요.
						</p>
					</div>

					<fieldset>
						<legend>선호 대화 수준</legend>

						<label>
							<input
								type="radio"
								name="conversationLevel"
								value="SILENT"
								defaultChecked
							/>
							<span>SILENT</span>
						</label>

						<label>
							<input
								type="radio"
								name="conversationLevel"
								value="GREETING_ONLY"
							/>
							<span>GREETING_ONLY</span>
						</label>

						<label>
							<input
								type="radio"
								name="conversationLevel"
								value="LIGHT_CHAT"
							/>
							<span>LIGHT_CHAT</span>
						</label>

						<p>나중에 마이페이지에서 바꿀 수 있어요.</p>
					</fieldset>

					<fieldset>
						<legend>약관 동의</legend>

						<label>
							<input type="checkbox" name="agreeAll" />
							<span>약관 전체 동의</span>
						</label>

						<label>
							<input type="checkbox" name="agreeTerms" required />
							<span>(필수) 서비스 이용약관 · 개인정보 처리방침</span>
						</label>

						<label>
							<input type="checkbox" name="agreeNotifications" />
							<span>(선택) 활동 알림 받기</span>
						</label>
					</fieldset>

					<footer>
						<button type="submit">가입하기</button>
					</footer>
				</form>
			</section>
		</main>
	);
}
