import { Kandorm } from './kandorm.entity';
import { Admin } from './admin.entity';
export declare enum QnaStatus {
    OPEN = "open",
    ANSWERED = "answered",
    CLOSED = "closed"
}
export declare class Qna {
    id: number;
    studentId: number;
    student: Kandorm;
    title: string;
    content: string;
    status: QnaStatus;
    answer: string;
    answeredBy: number;
    answerer: Admin;
    answeredAt: Date;
    created_at: Date;
}
