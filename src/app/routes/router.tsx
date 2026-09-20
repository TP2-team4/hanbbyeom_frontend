import { Navigate, Route, Routes } from "react-router-dom";
import ActivityPage from "../../pages/activity/ui/ActivityPage";
import HomePage from "../../pages/home/ui/HomePage";
import ChatPage from "../../pages/chat/ui/ChatPage";
import LoginPage from "../../pages/login/ui/LoginPage";
import MyPage from "../../pages/my-page/ui/MyPage";
import ConversationPreferencePage from "../../pages/onboarding/conversation-preference/ui/ConversationPreferencePage";
import PasswordResetPage from "../../pages/password-reset/ui/passwordResetPage";
import RecruitmentCreatePage from "../../pages/recruitment-create/ui/RecruitmentCreatePage";
import RecruitmentDetailPage from "../../pages/recruitment-detail/ui/RecruitmentDetailPage";
import RecruitmentPage from "../../pages/recruitment/ui/RecruitmentPage";
import SignupPage from "../../pages/signup/ui/SignupPage";
import { TabLayout } from "../../widgets/tab-layout";
import { InitialRedirect } from "./InitialRedirect";
import { OnboardingRoute } from "./OnboardingRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicOnlyRoute } from "./PublicOnlyRoute";
import MyRecruitmentDetailPage from "../../pages/my-recruitment-detail/ui/MyRecruitmentDetailPage";
import ChatRoomDetailPage from "../../pages/chat-room-detail/ui/ChatRoomDetailPage";
import ActivityCancelPage from "../../pages/activity-cancel/ui/ActivityCancelPage";
import ActivityReviewPage from "../../pages/activity-review/ui/ActivityReviewPage";
import MyRecruitmentListPage from "../../pages/my-recruitment-list/ui/MyRecruitmentListPage";
import ActivityHistoryPage from "../../pages/activity-history/ui/ActivityHistoryPage";
import SettingsPage from "../../pages/settings/ui/SettingsPage";
import NicknameEditPage from "../../pages/settings/ui/NicknameEditPage";
import ConversationPreferenceEditPage from "../../pages/settings/ui/ConversationPreferenceEditPage";
import RecruitmentCreateSuccessPage from "../../pages/recruitment-create/ui/RecruitmentCreateSuccessPage";
import RecruitmentEditPage from "../../pages/recruitment-edit/ui/RecruitmentEditPage";
import AppliedRecruitmentListPage from "../../pages/applied-recruitment-list/ui/AppliedRecruitmentListPage";
import WithdrawPage from "../../pages/settings/ui/WithdrawPage";

export function AppRouter() {
	return (
		<Routes>
			{/* 접속 시 로그인 여부에 따라 첫 페이지 결정 */}
			<Route
				path="/"
				element={<InitialRedirect />}
			/>
			<Route element={<PublicOnlyRoute />}>
				<Route
					path="/user/login"
					element={<LoginPage />}
				/>
				<Route
					path="/user/password/reset"
					element={<PasswordResetPage />}
				/>
				<Route
					path="/user/signup"
					element={<SignupPage />}
				/>
			</Route>

			{/* 로그인한 사용자만 접근 가능 */}
			<Route element={<ProtectedRoute />}>
				<Route element={<OnboardingRoute required />}>
					<Route
						path="/onboarding/conversation-preference"
						element={<ConversationPreferencePage />}
					/>
				</Route>
				<Route element={<OnboardingRoute required={false} />}>
					<Route element={<TabLayout />}>
						<Route
							path="/home"
							element={<HomePage />}
						/>
						<Route
							path="/recruitments"
							element={<RecruitmentPage />}
						/>
						<Route
							path="/chats"
							element={<ChatPage />}
						/>
						<Route
							path="/my-page"
							element={<MyPage />}
						/>
					</Route>
				</Route>
				<Route
					path="/activities"
					element={<ActivityPage />}
				/>
				<Route
					path="/recruitments/new"
					element={<RecruitmentCreatePage />}
				/>
				<Route
					path="/recruitments/new/success"
					element={<RecruitmentCreateSuccessPage />}
				/>
				<Route
					path="/recruitments/:recruitmentId"
					element={<RecruitmentDetailPage />}
				/>
				<Route
					path="/recruitments/:recruitmentId/applicants"
					element={<MyRecruitmentDetailPage />}
				/>
				<Route
					path="/recruitments/:recruitmentId/edit"
					element={<RecruitmentEditPage />}
				/>
				<Route
					path="/chats/:activityMatchId"
					element={<ChatRoomDetailPage />}
				/>
				<Route
					path="/activities/:activityMatchId/cancel"
					element={<ActivityCancelPage />}
				/>
				<Route
					path="/activities/:activityMatchId/review"
					element={<ActivityReviewPage />}
				/>
				<Route
					path="/recruitments/mine"
					element={<MyRecruitmentListPage />}
				/>
				<Route
					path="/recruitments/applied"
					element={<AppliedRecruitmentListPage />}
				/>
				<Route
					path="/my-page/activity-history"
					element={<ActivityHistoryPage />}
				/>
				<Route
					path="/my-page/settings"
					element={<SettingsPage />}
				/>
				<Route
					path="/my-page/settings/nickname"
					element={<NicknameEditPage />}
				/>
				<Route
					path="/my-page/settings/conversation-preference"
					element={<ConversationPreferenceEditPage />}
				/>
				<Route
					path="/my-page/settings/withdraw"
					element={<WithdrawPage />}
				/>
			</Route>

			{/* 존재 하지 않는 경로 이동 시 홈으로 보내기 */}
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
