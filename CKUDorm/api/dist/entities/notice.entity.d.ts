import { User } from './user.entity';
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
    author?: User;
    authorId?: number;
    createdAt: Date;
    updatedAt: Date;
}
