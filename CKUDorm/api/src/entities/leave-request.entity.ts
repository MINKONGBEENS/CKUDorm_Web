import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Kandorm } from './kandorm.entity';
import { Admin } from './admin.entity';

export enum LeaveRequestDuration {
  ONE_TWO = '1박2일',
  TWO_THREE = '2박3일',
  THREE_FOUR = '3박4일'
}

export enum LeaveRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

@Entity('leave_requests')
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @ManyToOne(() => Kandorm)
  @JoinColumn({ name: 'student_id' })
  student: Kandorm;

  @Column({ type: 'date' })
  apply_date: Date;

  @Column({ type: 'enum', enum: LeaveRequestDuration })
  duration: LeaveRequestDuration;

  @Column({ type: 'text' })
  reason: string;

  @Column({ type: 'varchar', length: 20 })
  contact: string;

  @Column({ name: 'room_number', type: 'varchar', length: 10 })
  roomNumber: string;

  @Column({ type: 'enum', enum: LeaveRequestStatus, default: LeaveRequestStatus.PENDING })
  status: LeaveRequestStatus;

  @Column({ name: 'reviewed_by', nullable: true })
  reviewedBy: number;

  @ManyToOne(() => Admin, { nullable: true })
  @JoinColumn({ name: 'reviewed_by' })
  reviewer: Admin;

  @Column({ name: 'reviewed_at', type: 'datetime', nullable: true })
  reviewedAt: Date;

  @CreateDateColumn()
  created_at: Date;
} 