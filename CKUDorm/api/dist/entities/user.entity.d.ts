export declare enum UserRole {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT"
}
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
