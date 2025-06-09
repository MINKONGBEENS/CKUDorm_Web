import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Department } from './department.entity';

@Entity('kandorm')
export class Kandorm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'department_id' })
  departmentId: number;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column()
  grade: number;

  @Column({ name: 'student_id', type: 'varchar', length: 20 })
  studentId: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  dormitory: string;

  @Column({ name: 'room_number', type: 'varchar', length: 10 })
  roomNumber: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
} 