export declare enum AdminRole {
    SUPER = "super",
    MANAGER = "manager"
}
export declare class Admin {
    id: number;
    username: string;
    password: string;
    role: AdminRole;
    created_at: Date;
}
