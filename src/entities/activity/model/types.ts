export type FeaturedActivity = {
    title: string;
    description: string;
    tags: string[];
};

export type ScheduledActivity = {
    month: number;
    day: number;
    title: string;
    time: string;
    distance: string;
    conversationStyle: string;
};
