import { Admin } from './admin.entity';
export declare enum MealType {
    BREAKFAST = "breakfast",
    LUNCH = "lunch",
    DINNER = "dinner"
}
export declare class Menu {
    id: number;
    menu_date: Date;
    meal_type: MealType;
    menu: string;
    createdBy: number;
    creator: Admin;
    created_at: Date;
}
