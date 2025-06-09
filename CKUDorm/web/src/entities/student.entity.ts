import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  studentId: string;

  @Column()
  departmentId: number;

  @Column()
  grade: number;

  @Column()
  phone: string;

  @Column()
  dormitory: string;

  @Column()
  roomNumber: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE';

  @Column({ default: 0 })
  points: number;
} 