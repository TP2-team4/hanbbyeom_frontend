import { useEffect, useState } from "react";
import type { Recruitment } from "../../../entities/recruitment";
import { getRecruitments } from "../api/getRecruitments";

export function useRecruitments() {
    const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;
        const loadRecruitments = async () => {
            try {
                const response = await getRecruitments();
                if (isActive) setRecruitments(response);
            } catch {
                if (isActive) setError("모집글을 불러오지 못했어요.");
            } finally {
                if (isActive) setIsLoading(false);
            }
        };
        void loadRecruitments();
        return () => { isActive = false; };
    }, []);

    const apply = (id: number) => {
        setRecruitments((current) =>
            current.map((item) => {
                if (item.id !== id) return item;
                return {
                    ...item,
                    status: item.status === "applied" ? "open" : "applied",
                };
            }),
        );
    };

    return { recruitments, isLoading, error, apply };
}
