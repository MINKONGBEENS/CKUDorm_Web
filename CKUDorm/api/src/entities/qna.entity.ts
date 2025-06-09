import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Kandorm } from './kandorm.entity';
import { Admin } from './admin.entity';

export enum QnaStatus {
  OPEN = 'open',
  ANSWERED = 'answered',
  CLOSED = 'closed'
}

@Entity('qna')
export class Qna {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @ManyToOne(() => Kandorm)
  @JoinColumn({ name: 'student_id' })
  student: Kandorm;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: QnaStatus, default: QnaStatus.OPEN })
  status: QnaStatus;

  @Column({ type: 'text', nullable: true })
  answer: string;

  @Column({ name: 'answered_by', nullable: true })
  answeredBy: number;

  @ManyToOne(() => Admin, { nullable: true })
  @JoinColumn({ name: 'answered_by' })
  answerer: Admin;

  @Column({ name: 'answered_at', type: 'datetime', nullable: true })
  answeredAt: Date;

  @CreateDateColumn()
  created_at: Date;
} 