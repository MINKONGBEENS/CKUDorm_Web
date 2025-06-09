import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Admin } from './admin.entity';

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner'
}

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  menu_date: Date;

  @Column({ type: 'enum', enum: MealType })
  meal_type: MealType;

  @Column({ type: 'text' })
  menu: string;

  @Column({ name: 'created_by' })
  createdBy: number;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'created_by' })
  creator: Admin;

  @CreateDateColumn()
  created_at: Date;
} 