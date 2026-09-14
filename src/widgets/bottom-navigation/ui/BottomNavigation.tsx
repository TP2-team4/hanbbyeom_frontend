export type NavigationItemId = "home" | "recruit" | "chat" | "profile";

type NavigationItem = {
	label: string;
	icon: NavigationItemId;
};

const ITEMS: NavigationItem[] = [
	{ label: "홈", icon: "home" },
	{ label: "모집", icon: "recruit" },
	{ label: "채팅", icon: "chat" },
	{ label: "마이페이지", icon: "profile" },
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
					const active = item.icon === activeItem;
					return (
						<li key={item.icon}>
							<button
								type="button"
								aria-current={active ? "page" : undefined}
								onClick={() => onSelect?.(item.icon)}
								className={`flex w-full flex-col items-center gap-1 text-xs font-medium ${active ? "text-secondary-500" : "text-gray-500"}`}
							>
								<NavigationIcon
									type={item.icon}
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

function NavigationIcon({
	type,
	active,
}: {
	type: NavigationItem["icon"];
	active: boolean;
}) {
	const className = `size-7 ${active ? "fill-primary-400 stroke-primary-400" : "fill-none stroke-gray-400"}`;

	if (type === "home") {
		return (
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				className={className}
				strokeWidth="1.8"
			>
				<path
					d="m3.5 10 8.5-7 8.5 7v10H15v-6H9v6H3.5Z"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}
	if (type === "recruit") {
		return (
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				className={className}
				strokeWidth="1.8"
			>
				<path
					d="M6 21V3m0 2h11l-2 3 2 3H6"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}
	if (type === "chat") {
		return (
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				className={className}
				strokeWidth="1.8"
			>
				<path
					d="M4 5.5h16v11H9l-5 4Z"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className={className}
			strokeWidth="1.8"
		>
			<circle
				cx="12"
				cy="7"
				r="3"
			/>
			<path d="M5 21c.5-4.5 2.8-6.5 7-6.5s6.5 2 7 6.5" />
		</svg>
	);
}
