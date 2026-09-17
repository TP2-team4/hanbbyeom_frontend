import chatIcon from "../../../shared/assets/images/navi/chat.svg";
import homeIcon from "../../../shared/assets/images/navi/home.svg";
import profileIcon from "../../../shared/assets/images/navi/person.svg";
import recruitIcon from "../../../shared/assets/images/navi/recruitment.svg";

export type NavigationItemId = "home" | "recruit" | "chat" | "profile";

type NavigationItem = {
	label: string;
	id: NavigationItemId;
	icon: string;
};

const ITEMS: NavigationItem[] = [
	{ id: "home", label: "홈", icon: homeIcon },
	{ id: "recruit", label: "모집", icon: recruitIcon },
	{ id: "chat", label: "채팅", icon: chatIcon },
	{ id: "profile", label: "마이페이지", icon: profileIcon },
];

type Props = {
	activeItem: NavigationItemId;
	onSelect?: (item: NavigationItemId) => void;
};

export function BottomNavigation({ activeItem, onSelect }: Props) {
	return (
		<nav
			aria-label="주요 메뉴"
			className="sticky bottom-0 z-20 border-t border-divider bg-surface px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.05)]"
		>
			<ul className="grid grid-cols-4">
				{ITEMS.map((item) => {
					const active = item.id === activeItem;
					return (
						<li key={item.id}>
							<button
								type="button"
								aria-current={active ? "page" : undefined}
								onClick={() => onSelect?.(item.id)}
								className={`flex w-full flex-col items-center gap-1 text-xs font-medium ${active ? "text-secondary-500" : "text-gray-500"}`}
							>
								<NavigationIcon
									src={item.icon}
									active={active}
								/>
								{item.label}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

function NavigationIcon({ src, active }: { src: string; active: boolean }) {
	return (
		<span
			aria-hidden="true"
			className={`block size-7 ${active ? "bg-action-primary" : "bg-gray-400"}`}
			style={{
				WebkitMaskImage: `url("${src}")`,
				maskImage: `url("${src}")`,
				WebkitMaskRepeat: "no-repeat",
				maskRepeat: "no-repeat",
				WebkitMaskSize: "contain",
				maskSize: "contain",
				WebkitMaskPosition: "center",
				maskPosition: "center",
			}}
		/>
	);
}
