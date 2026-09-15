import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "../../app-header";
import {
	BottomNavigation,
	type NavigationItemId,
} from "../../bottom-navigation";

const PATH_BY_ITEM: Record<NavigationItemId, string> = {
	home: "/home",
	recruit: "/recruitments",
	chat: "/chats",
	profile: "/my-page",
};

const ITEM_BY_PATH: Record<string, NavigationItemId> = {
	"/home": "home",
	"/recruitments": "recruit",
	"/chats": "chat",
	"/my-page": "profile",
};

export function TabLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const activeItem = ITEM_BY_PATH[location.pathname] ?? "home";

	return (
		<main className="mx-auto grid min-h-full w-full max-w-[430px] grid-rows-[auto_1fr_auto] bg-primary-50">
			<AppHeader />
			<Outlet />
			<BottomNavigation
				activeItem={activeItem}
				onSelect={(item) => navigate(PATH_BY_ITEM[item])}
			/>
		</main>
	);
}
