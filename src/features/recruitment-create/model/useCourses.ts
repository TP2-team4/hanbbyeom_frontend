import { useEffect, useState } from "react";
import { getCourses } from "../api/getCourses";
import type { Course } from "./types";

export function useCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;
        const loadCourses = async () => {
            try {
                const response = await getCourses();
                if (isActive) setCourses(response);
            } catch {
                if (isActive) setError("코스 목록을 불러오지 못했어요.");
            } finally {
                if (isActive) setIsLoading(false);
            }
        };
        void loadCourses();
        return () => { isActive = false; };
    }, []);

    return { courses, isLoading, error };
}
