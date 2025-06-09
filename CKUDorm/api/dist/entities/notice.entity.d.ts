export declare enum NoticeCategory {
    GENERAL = "GENERAL",
    IMPORTANT = "IMPORTANT",
    EVENT = "EVENT"
}
export declare class Notice {
    id: number;
    title: string;
    content: string;
    category: NoticeCategory;
    createdAt: Date;
    updatedAt: Date;
}
