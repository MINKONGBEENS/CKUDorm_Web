import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from '../../entities/student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Student> {
    const student = await this.studentService.findOne(id);
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  @Post()
  async create(@Body() student: Partial<Student>): Promise<Student> {
    return this.studentService.create(student);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() student: Partial<Student>,
  ): Promise<Student> {
    const existingStudent = await this.studentService.findOne(id);
    if (!existingStudent) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return this.studentService.update(id, student);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const student = await this.studentService.findOne(id);
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    await this.studentService.delete(id);
  }
} 