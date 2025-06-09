import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum NoticeCategory {
  GENERAL = 'GENERAL',
  IMPORTANT = 'IMPORTANT',
  EVENT = 'EVENT'
}

@Entity('notices')
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: NoticeCategory, default: NoticeCategory.GENERAL })
  category: NoticeCategory;

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6 })
  updatedAt: Date;
} 