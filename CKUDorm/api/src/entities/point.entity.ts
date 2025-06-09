import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Kandorm } from './kandorm.entity';
import { Admin } from './admin.entity';

export enum PointType {
  MERIT = 'merit',
  DEMERIT = 'demerit'
}

@Entity('points')
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @ManyToOne(() => Kandorm)
  @JoinColumn({ name: 'student_id', foreignKeyConstraintName: 'FK_point_student' })
  student: Kandorm;

  @Column()
  point: number;

  @Column({ type: 'enum', enum: PointType })
  type: PointType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reason: string;

  @Column({ name: 'created_by' })
  createdBy: number;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'created_by', foreignKeyConstraintName: 'FK_point_creator' })
  creator: Admin;

  @CreateDateColumn()
  created_at: Date;
} 