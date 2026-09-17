type Props = {
	value: number;
	onChange: (value: number) => void;
};

export function StarRating({ value, onChange }: Props) {
	return (
		<div className="flex gap-2" role="radiogroup" aria-label="평점">
			{[1, 2, 3, 4, 5].map((star) => (
				<button
					key={star}
					type="button"
					aria-label={`${star}점`}
					aria-pressed={value >= star}
					onClick={() => onChange(star)}
					className="p-1"
				>
					<svg
						viewBox="0 0 24 24"
						className={`size-9 ${
							value >= star
								? "fill-primary-400 stroke-primary-400"
								: "fill-none stroke-gray-300"
						}`}
						strokeWidth="1.5"
					>
						<path
							strokeLinejoin="round"
							d="m12 3 2.7 5.9 6.3.7-4.7 4.4 1.2 6.3L12 17l-5.5 3.3 1.2-6.3-4.7-4.4 6.3-.7Z"
						/>
					</svg>
				</button>
			))}
		</div>
	);
}
