import { useState } from "react";

type DropdownOption<T extends string> = {
	value: T;
	label: string;
};

type DropdownProps<T extends string> = {
	options: DropdownOption<T>[];
	value: T;
	onChange: (value: T) => void;
	label?: string;
};

export function Dropdown<T extends string>({
	options,
	value,
	onChange,
	label,
}: DropdownProps<T>) {
	const [isOpen, setIsOpen] = useState(false);
	const selected = options.find((option) => option.value === value);

	const handleSelect = (optionValue: T) => {
		onChange(optionValue);
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				aria-label={label}
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex items-center gap-1 text-sm font-bold text-body"
			>
				<span>{selected?.label}</span>
				<svg
					aria-hidden="true"
					viewBox="0 0 24 24"
					className={`size-4 fill-none stroke-current transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</button>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 z-30"
						onClick={() => setIsOpen(false)}
					/>
					<ul
						role="listbox"
						className="absolute right-0 top-[calc(100%+8px)] z-40 min-w-[140px] overflow-hidden rounded-md border border-border bg-surface py-1 shadow-lg"
					>
						{options.map((option) => (
							<li
								key={option.value}
								role="option"
								aria-selected={option.value === value}
							>
								<button
									type="button"
									onClick={() => handleSelect(option.value)}
									className={`block w-full whitespace-nowrap px-4 py-2.5 text-left text-sm font-medium ${
										option.value === value
											? "bg-primary-100 text-secondary-400"
											: "text-title hover:bg-primary-50"
									}`}
								>
									{option.label}
								</button>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
