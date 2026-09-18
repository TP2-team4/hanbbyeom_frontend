import { useState } from "react";
import {
	updateRecruitment,
	updateRunCondition,
	type ConversationStyle,
} from "../../../entities/recruitment";
import { createRecruitment } from "../api/createRecruitment";

const TOTAL_STEPS = 3;

// 백엔드 MatchRequestCommandService.MIN_LEAD_HOURS와 동일한 값
// (활동 시작 시각은 지금부터 최소 이만큼 이후여야 함)
const MIN_LEAD_HOURS = 3;

export type RecruitmentInitialValues = {
	courseId: number;
	courseName: string;
	meetingPlace: string;
	date: string;
	time: string;
	minDistanceKm: number;
	maxDistanceKm: number;
	minPaceSeconds: number;
	maxPaceSeconds: number;
	conversationStyle: ConversationStyle;
	conversationStyleLabel: string;
};

type Options = {
	onSuccess: (recruitment: CreatedRecruitment) => void;
	// 수정 모드로 쓸 때만 전달 — 있으면 작성 대신 기존 모집글을 수정함
	editingRecruitmentId?: number;
	initialValues?: RecruitmentInitialValues;
};

export type CreatedRecruitment = {
	id: number | null;
	courseName: string;
	meetingPlace: string;
	date: string;
	time: string;
	minDistanceKm: number;
	maxDistanceKm: number;
	conversationStyleLabel: string;
};

// 최소 리드타임을 넘기는 가장 이른 시각으로 기본값을 잡음 (30분 단위로 올림)
function getDefaultScheduledAt() {
	const target = new Date(Date.now() + MIN_LEAD_HOURS * 60 * 60 * 1000);
	if (target.getMinutes() > 30) {
		target.setHours(target.getHours() + 1, 0, 0, 0);
	} else if (target.getMinutes() > 0) {
		target.setMinutes(30, 0, 0);
	}
	return target;
}

function getDefaultDate() {
	const target = getDefaultScheduledAt();
	const year = target.getFullYear();
	const month = String(target.getMonth() + 1).padStart(2, "0");
	const day = String(target.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function getDefaultTime() {
	const target = getDefaultScheduledAt();
	return `${String(target.getHours()).padStart(2, "0")}:${String(target.getMinutes()).padStart(2, "0")}`;
}

function parseScheduledAt(date: string, time: string) {
	const [year, month, day] = date.split("-").map(Number);
	const [hours, minutes] = time.split(":").map(Number);
	return new Date(year, month - 1, day, hours, minutes);
}

export function useRecruitmentCreateForm({
	onSuccess,
	editingRecruitmentId,
	initialValues,
}: Options) {
	const [step, setStep] = useState(1);

	// 1단계: 코스
	const [selectedCourseId, setSelectedCourseId] = useState<number>(
		initialValues?.courseId ?? 1,
	);
	const [selectedCourseName, setSelectedCourseName] = useState(
		initialValues?.courseName ?? "",
	);
	const [meetingPlace, setMeetingPlace] = useState(
		initialValues?.meetingPlace ?? "",
	);

	const selectCourse = (id: number, name: string) => {
		setSelectedCourseId(id);
		setSelectedCourseName(name);
	};

	// 2단계: 날짜, 시간, 거리 범위, 페이스 범위
	const [date, setDate] = useState(initialValues?.date ?? getDefaultDate);
	const [time, setTime] = useState(initialValues?.time ?? getDefaultTime);
	const [minDistanceKm, setMinDistanceKm] = useState(
		initialValues?.minDistanceKm ?? 1,
	);
	const [maxDistanceKm, setMaxDistanceKm] = useState(
		initialValues?.maxDistanceKm ?? 20,
	);
	const [minPaceSeconds, setMinPaceSeconds] = useState(
		initialValues?.minPaceSeconds ?? 300,
	);
	const [maxPaceSeconds, setMaxPaceSeconds] = useState(
		initialValues?.maxPaceSeconds ?? 450,
	);

	// 3단계: 대화 선호도
	const [conversationStyle, setConversationStyle] =
		useState<ConversationStyle>(initialValues?.conversationStyle ?? "SILENT");
	const [conversationStyleLabel, setConversationStyleLabel] = useState(
		initialValues?.conversationStyleLabel ?? "조용히",
	);

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
		if (step === 1 && meetingPlace === "") {
			setSubmitError("만나는 곳이 비어있습니다. 입력 해주세요.");
			return;
		}

		if (step === 2) {
			const minAllowed = Date.now() + MIN_LEAD_HOURS * 60 * 60 * 1000;
			if (parseScheduledAt(date, time).getTime() < minAllowed) {
				setSubmitError(
					`활동 시작 시각은 지금부터 최소 ${MIN_LEAD_HOURS}시간 이후여야 해요.`,
				);
				return;
			}
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
			let id: number | null;

			if (editingRecruitmentId !== undefined) {
				await Promise.all([
					updateRunCondition(editingRecruitmentId, {
						courseId: selectedCourseId,
						meetingPoint: meetingPlace,
						distanceMinMeters: Math.round(minDistanceKm * 1000),
						distanceMaxMeters: Math.round(maxDistanceKm * 1000),
						paceMinSec: minPaceSeconds,
						paceMaxSec: maxPaceSeconds,
					}),
					updateRecruitment(editingRecruitmentId, {
						scheduledAt: parseScheduledAt(date, time).toISOString(),
						talkLevel: conversationStyle,
					}),
				]);
				id = editingRecruitmentId;
			} else {
				id = await createRecruitment({
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
			}

			onSuccess({
				id,
				courseName: selectedCourseName,
				meetingPlace,
				date,
				time,
				minDistanceKm,
				maxDistanceKm,
				conversationStyleLabel,
			});
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: editingRecruitmentId !== undefined
						? "모집글 수정에 실패했어요. 다시 시도해 주세요."
						: "모집글 작성에 실패했어요. 다시 시도해 주세요.",
			);
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
