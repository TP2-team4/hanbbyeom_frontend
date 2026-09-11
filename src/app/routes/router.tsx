import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home/HomePage";
import LoginPage from "../../pages/login/ui/LoginPage";
import SignupPage from "../../pages/signup/ui/SignupPage";
import { InitialRedirect } from "./InitialRedirect";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRouter() {
	return (
		<Routes>
			{/* 접속 시 로그인 여부에 따라 첫 페이지 결정 */}
			<Route
				path="/"
				element={<InitialRedirect />}
			/>
			<Route
				path="/login"
				element={<LoginPage />}
			/>
			<Route
				path="/signup"
				element={<SignupPage />}
			/>

			{/* 로그인한 사용자만 접근 가능 */}
			<Route element={<ProtectedRoute />}>
				<Route
					path="/home"
					element={<HomePage />}
				/>
			</Route>

			<Route
				path="*"
				element={
					<Navigate
						to="/"
						replace
					/>
				}
			/>
		</Routes>
	);
}
