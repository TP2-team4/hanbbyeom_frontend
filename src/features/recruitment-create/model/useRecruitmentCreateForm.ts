import { useState } from "react";
import type { ConversationStyle } from "../../../entities/recruitment";
import { createRecruitment } from "../api/createRecruitment";

const TOTAL_STEPS = 3;

type Options = {
	onSuccess: () => void;
};

function getDefaultDate() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function getDefaultTime() {
	const now = new Date();
	const roundedMinutes = now.getMinutes() < 30 ? 30 : 0;
	const hours =
		now.getMinutes() < 30 ? now.getHours() : (now.getHours() + 1) % 24;
	return `${String(hours).padStart(2, "0")}:${String(roundedMinutes).padStart(2, "0")}`;
}

function parseScheduledAt(date: string, time: string) {
	const [year, month, day] = date.split("-").map(Number);
	const [hours, minutes] = time.split(":").map(Number);
	return new Date(year, month - 1, day, hours, minutes);
}

export function useRecruitmentCreateForm({ onSuccess }: Options) {
	const [step, setStep] = useState(1);

	// 1단계: 코스
	const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
	const [selectedCourseName, setSelectedCourseName] = useState("");
	const [meetingPlace, setMeetingPlace] = useState("");

	const selectCourse = (id: number, name: string) => {
		setSelectedCourseId(id);
		setSelectedCourseName(name);
	};

	// 2단계: 날짜, 시간, 거리 범위, 페이스 범위
	const [date, setDate] = useState(getDefaultDate);
	const [time, setTime] = useState(getDefaultTime);
	const [minDistanceKm, setMinDistanceKm] = useState(1);
	const [maxDistanceKm, setMaxDistanceKm] = useState(20);
	const [minPaceSeconds, setMinPaceSeconds] = useState(300);
	const [maxPaceSeconds, setMaxPaceSeconds] = useState(450);

	// 3단계: 대화 선호도
	const [conversationStyle, setConversationStyle] =
		useState<ConversationStyle>("SILENT");
	const [conversationStyleLabel, setConversationStyleLabel] =
		useState("조용히");

	const selectConversationStyle = (
		value: ConversationStyle,
		label: string,
	) => {
		setConversationStyle(value);
		setConversationStyleLabel(label);
	};

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const goNext = () => {
		if (step === 2 && parseScheduledAt(date, time).getTime() < Date.now()) {
			setSubmitError(
				"선택한 날짜·시간이 이미 지났어요. 다시 선택해 주세요.",
			);
			return;
		}
		setSubmitError(null);
		setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
	};
	const goPrev = () => setStep((prev) => Math.max(prev - 1, 1));

	const submit = async () => {
		if (isSubmitting) return;

		if (parseScheduledAt(date, time).getTime() < Date.now()) {
			setSubmitError(
				"선택한 날짜·시간이 이미 지났어요. 다시 선택해 주세요.",
			);
			setStep(2);
			return;
		}

		setIsSubmitting(true);
		setSubmitError(null);

		try {
			await createRecruitment({
				courseId: selectedCourseId,
				meetingPlace,
				date,
				time,
				minDistanceKm,
				maxDistanceKm,
				minPaceSeconds,
				maxPaceSeconds,
				conversationStyle,
			});
			onSuccess();
		} catch {
			setSubmitError("모집글 작성에 실패했어요. 다시 시도해 주세요.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		step,
		totalSteps: TOTAL_STEPS,
		goNext,
		goPrev,
		selectedCourseId,
		selectedCourseName,
		selectCourse,
		meetingPlace,
		setMeetingPlace,
		date,
		setDate,
		time,
		setTime,
		minDistanceKm,
		setMinDistanceKm,
		maxDistanceKm,
		setMaxDistanceKm,
		minPaceSeconds,
		setMinPaceSeconds,
		maxPaceSeconds,
		setMaxPaceSeconds,
		conversationStyle,
		conversationStyleLabel,
		selectConversationStyle,
		isSubmitting,
		submitError,
		submit,
	};
}

export type RecruitmentCreateForm = ReturnType<typeof useRecruitmentCreateForm>;
