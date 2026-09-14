type RangeSliderProps = {
    min: number;
    max: number;
    value: readonly [number, number];
    onChange: (value: [number, number]) => void;
    minAriaLabel: string;
    maxAriaLabel: string;
    step?: number;
    minGap?: number;
};

export function RangeSlider({
    min,
    max,
    value,
    onChange,
    minAriaLabel,
    maxAriaLabel,
    step = 1,
    minGap = step,
}: RangeSliderProps) {
    const [lowerValue, upperValue] = value;
    const range = max - min;
    const lowerPosition = range === 0 ? 0 : ((lowerValue - min) / range) * 100;
    const upperPosition = range === 0 ? 100 : ((upperValue - min) / range) * 100;

    return (
        <div className="relative h-6">
            <div className="absolute left-0 right-0 top-2.5 h-1.5 rounded-full bg-gray-200" />
            <div
                className="absolute top-2.5 h-1.5 rounded-full bg-primary-300"
                style={{
                    left: `${lowerPosition}%`,
                    right: `${100 - upperPosition}%`,
                }}
            />
            <input
                aria-label={minAriaLabel}
                type="range"
                min={min}
                max={max}
                step={step}
                value={lowerValue}
                onChange={(event) =>
                    onChange([
                        Math.min(Number(event.target.value), upperValue - minGap),
                        upperValue,
                    ])
                }
                className="range-slider-input absolute inset-0 w-full"
            />
            <input
                aria-label={maxAriaLabel}
                type="range"
                min={min}
                max={max}
                step={step}
                value={upperValue}
                onChange={(event) =>
                    onChange([
                        lowerValue,
                        Math.max(Number(event.target.value), lowerValue + minGap),
                    ])
                }
                className="range-slider-input absolute inset-0 w-full"
            />
        </div>
    );
}
