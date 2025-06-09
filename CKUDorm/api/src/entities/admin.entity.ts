import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum AdminRole {
  SUPER = 'super',
  MANAGER = 'manager'
}

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: AdminRole, default: AdminRole.MANAGER })
  role: AdminRole;

  @CreateDateColumn()
  created_at: Date;
} 