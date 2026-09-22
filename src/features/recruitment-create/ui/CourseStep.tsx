// 1. 코스

import { useEffect } from "react";
import { SelectableCard } from "../../../shared/ui/selectable-card";
import { useCourses } from "../model/useCourses";
import Input from "../../../shared/ui/input";
import { StatusText } from "../../../shared/ui/status-text";
import { ErrorText } from "../../../shared/ui/error-text";
import { RetryButton } from "../../../shared/ui/retry-button";
import type { RecruitmentCreateForm } from "../model/useRecruitmentCreateForm";

type Props = {
	form: RecruitmentCreateForm;
	showSubmitError?: boolean;
};

export function CourseStep({ form, showSubmitError = false }: Props) {
	const { courses, isLoading, error, refetch } = useCourses();

	// 코스 목록이 로드되면 기본 선택된 코스의 이름도 채워 넣기
	useEffect(() => {
		if (form.selectedCourseName) return;
		const defaultCourse = courses.find(
			(course) => course.id === form.selectedCourseId,
		);
		if (defaultCourse) {
			form.selectCourse(defaultCourse.id, defaultCourse.name);
		}
	}, [courses]);

	return (
		<div>
			<h2
				id="home-recommendation-title"
				className="text-3xl font-bold leading-tight text-title"
			>
				어디서 <br />
				달릴까요?
			</h2>
			<section>
				<h3 className="text-[20px] font-bold leading-tight text-title pt-4">
					코스
				</h3>

				{isLoading && <StatusText>코스를 불러오는 중...</StatusText>}
				{error && (
					<div className="flex flex-col items-center gap-3 py-10">
						<ErrorText className="text-center text-sm">{error}</ErrorText>
						<RetryButton onClick={refetch} />
					</div>
				)}
				{!isLoading && !error && (
					<div className="mt-2 flex flex-col gap-3">
						{courses.map((course) => (
							<SelectableCard
								key={course.id}
								label={course.name}
								description={course.routeDescription}
								selected={form.selectedCourseId === course.id}
								onClick={() =>
									form.selectCourse(course.id, course.name)
								}
							/>
						))}
					</div>
				)}
			</section>

			<section className="mt-8">
				<h3
					id="meeting-place-title"
					className="text-[20px] font-bold leading-tight text-title pt-4"
				>
					만나는 곳
				</h3>

				<Input
					id="meetingPlace"
					name="meetingPlace"
					type="text"
					placeholder="예) 뚝섬유원지 3번 출구"
					aria-labelledby="meeting-place-title"
					className="mt-2"
					maxLength={30}
					value={form.meetingPlace}
						onChange={(event) =>
							form.setMeetingPlace(event.target.value)
						}
					/>
					{showSubmitError && form.submitError && (
						<ErrorText className="mt-2 text-xs">
							{form.submitError}
						</ErrorText>
					)}
				</section>
		</div>
	);
}
