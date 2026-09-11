import { Link } from "react-router-dom";

export default function LoginPage() {
	return (
		<main>
			{/* <h1>01 로그인 / 회원가입</h1> */}

			<section aria-labelledby="login-title">
				<div>
					<header>
						<h2 id="login-title">한뼘</h2>
						<p>필요한 활동만, 조용히 함께</p>
					</header>

					<form>
						<div>
							<label htmlFor="email">이메일</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								placeholder="이메일을 입력해 주세요"
								required
							/>
						</div>

						<div>
							<label htmlFor="password">비밀번호</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								placeholder="8자 이상 입력해 주세요"
								minLength={8}
								required
							/>
						</div>

						<div>
							<button type="submit">
								로그인
							</button>

							<Link to="/signup">
								회원가입
							</Link>
						</div>
					</form>

					<nav aria-label="로그인 도움말">
						<a href="/password-reset">비밀번호 찾기</a>
						<span aria-hidden="true" />
						<a href="/terms">이용약관</a>
					</nav>
				</div>

				<p>
					한뼘은 상대를 직접 고르지 않아요. 조건이 맞으면 랜덤으로
					연결됩니다.
				</p>
			</section>
		</main>
	);
}
