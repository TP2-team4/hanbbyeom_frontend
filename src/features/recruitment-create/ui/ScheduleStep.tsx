//2. 날짜 , 시간 , 거리 , 속도
import { forwardRef, type ReactNode } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { RangeSlider } from "../../../shared/ui/range-slider";
import type { RecruitmentCreateForm } from "../model/useRecruitmentCreateForm";
import { formatPace } from "../model/format";
import {
	parseDateValue,
	toDateValue,
	parseTimeValue,
	toTimeValue,
} from "../../../shared/lib/date";

type Props = {
	form: RecruitmentCreateForm;
};

type PickerTriggerProps = {
	value?: string;
	onClick?: () => void;
	placeholder: string;
	icon: ReactNode;
};

const PickerTrigger = forwardRef<HTMLButtonElement, PickerTriggerProps>(
	({ value, onClick, placeholder, icon }, ref) => (
		<button
			ref={ref}
			type="button"
			onClick={onClick}
			className="flex h-14 w-full items-center rounded-md border border-border px-4"
		>
			<span className="flex-1 text-left text-base font-medium text-title">
				{value || placeholder}
			</span>
			{icon}
		</button>
	),
);

function CalendarIcon() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className="size-5 fill-none stroke-current text-body"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect
				x="3"
				y="5"
				width="18"
				height="16"
				rx="2"
			/>
			<path d="M3 10h18M8 3v4M16 3v4" />
		</svg>
	);
}

function ClockIcon() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className="size-5 fill-none stroke-current text-body"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle
				cx="12"
				cy="12"
				r="9"
			/>
			<path d="M12 7v5l3 3" />
		</svg>
	);
}

export function ScheduleStep({ form }: Props) {
	return (
		<div>
			<h2
				id="home-recommendation-title"
				className="text-3xl font-bold leading-tight text-title"
			>
				언제, 얼마나 <br />
				달릴까요?
			</h2>
			<fieldset className="mt-5">
				<div className="mb-4 flex items-center justify-between">
					<legend className="text-base font-bold text-body">
						날짜·시간
					</legend>
				</div>
				<div className="mt-3 flex gap-4">
					<div className="flex-1">
						<DatePicker
							selected={parseDateValue(form.date)}
							onChange={(date: Date | null) =>
								date && form.setDate(toDateValue(date))
							}
							locale={ko}
							dateFormat="M월 d일 (EEE)"
							popperClassName="z-40"
							wrapperClassName="block w-full"
							minDate={new Date()}
							customInput={
								<PickerTrigger
									placeholder="날짜 선택"
									icon={<CalendarIcon />}
								/>
							}
						/>
					</div>

					<div className="flex-1">
						<DatePicker
							selected={parseTimeValue(form.time)}
							onChange={(date: Date | null) =>
								date && form.setTime(toTimeValue(date))
							}
							locale={ko}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={30}
							timeCaption="시간"
							dateFormat="HH:mm"
							popperClassName="z-40"
							wrapperClassName="block w-full"
							customInput={
								<PickerTrigger
									placeholder="시간 선택"
									icon={<ClockIcon />}
								/>
							}
						/>
					</div>
				</div>
			</fieldset>

			<fieldset className="mt-5">
				<div className="mb-4 flex items-center justify-between">
					<legend className="text-base font-bold text-body">
						거리
					</legend>
					<strong className="text-base text-secondary-400">
						{form.minDistanceKm} ~ {form.maxDistanceKm}km
					</strong>
				</div>
				<RangeSlider
					min={1}
					max={20}
					value={[form.minDistanceKm, form.maxDistanceKm]}
					minAriaLabel="최소 거리"
					maxAriaLabel="최대 거리"
					onChange={([minDistanceKm, maxDistanceKm]) => {
						form.setMinDistanceKm(minDistanceKm);
						form.setMaxDistanceKm(maxDistanceKm);
					}}
				/>
				<div className="mt-1 flex justify-between text-sm text-body">
					<span>1km</span>
					<span>20km</span>
				</div>
			</fieldset>

			<fieldset className="mt-5">
				<div className="mb-4 flex items-center justify-between">
					<legend className="text-base font-bold text-body">
						페이스 범위
					</legend>
					<strong className="text-base text-secondary-400">
						{formatPace(form.minPaceSeconds)} ~{" "}
						{formatPace(form.maxPaceSeconds)}/km
					</strong>
				</div>
				<RangeSlider
					step={10}
					minGap={10}
					min={300}
					max={450}
					value={[form.minPaceSeconds, form.maxPaceSeconds]}
					minAriaLabel="최소 페이스"
					maxAriaLabel="최대 페이스"
					onChange={([minPaceSeconds, maxPaceSeconds]) => {
						form.setMinPaceSeconds(minPaceSeconds);
						form.setMaxPaceSeconds(maxPaceSeconds);
					}}
				/>
				<div className="mt-1 flex justify-between text-sm text-body">
					<span>{formatPace(300)}/km</span>
					<span>{formatPace(450)}/km</span>
				</div>
			</fieldset>
		</div>
	);
}
