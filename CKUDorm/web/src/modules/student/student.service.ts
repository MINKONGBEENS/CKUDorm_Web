import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  async create(student: Partial<Student>): Promise<Student> {
    const newStudent = this.studentRepository.create(student);
    return this.studentRepository.save(newStudent);
  }

  async update(id: number, student: Partial<Student>): Promise<Student> {
    await this.studentRepository.update(id, student);
    return this.studentRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
} 