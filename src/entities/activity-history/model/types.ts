export type ActivityReviewStatus = "completed" | "required";

export type ActivityHistory = {
    id: number;
    title: string;
    dateLabel: string;
    distanceKm: number;
    reviewStatus: ActivityReviewStatus;
};
