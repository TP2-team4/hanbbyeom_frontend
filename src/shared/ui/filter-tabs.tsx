type Tab<T extends string> = {
	value: T;
	label: string;
	count?: number;
};

type Props<T extends string> = {
	tabs: Tab<T>[];
	value: T;
	onChange: (value: T) => void;
};

export function FilterTabs<T extends string>({ tabs, value, onChange }: Props<T>) {
	return (
		<div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
			{tabs.map((tab) => (
				<button
					key={tab.value}
					type="button"
					role="tab"
					aria-selected={value === tab.value}
					onClick={() => onChange(tab.value)}
					className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
						value === tab.value
							? "bg-primary-400 text-title"
							: "bg-gray-50 text-body"
					}`}
				>
					{tab.label}
					{tab.count !== undefined ? ` ${tab.count}` : ""}
				</button>
			))}
		</div>
	);
}
