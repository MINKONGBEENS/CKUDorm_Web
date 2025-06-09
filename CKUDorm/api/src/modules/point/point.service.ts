import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from '../../entities/point.entity';
import { Kandorm } from '../../entities/kandorm.entity';
import { Admin } from '../../entities/admin.entity';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private pointRepository: Repository<Point>,
    @InjectRepository(Kandorm)
    private kandormRepository: Repository<Kandorm>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findAll(): Promise<Point[]> {
    return this.pointRepository.find({
      order: {
        created_at: 'DESC',
      },
      relations: ['student', 'creator'],
    });
  }

  async findByStudent(studentId: number): Promise<Point[]> {
    return this.pointRepository.find({
      where: { studentId },
      order: {
        created_at: 'DESC',
      },
      relations: ['student', 'creator'],
    });
  }

  async findOne(id: number): Promise<Point> {
    const point = await this.pointRepository.findOne({
      where: { id },
      relations: ['student', 'creator'],
    });
    if (!point) {
      throw new NotFoundException('상벌점 기록을 찾을 수 없습니다.');
    }
    return point;
  }

  async create(point: Partial<Point>): Promise<Point> {
    if (!point.point) {
      throw new BadRequestException('점수를 입력해주세요.');
    }

    // 학생 존재 여부 확인
    const student = await this.kandormRepository.findOne({
      where: { studentId: point.studentId?.toString() },
    });
    if (!student) {
      throw new NotFoundException('학생을 찾을 수 없습니다.');
    }

    // 관리자 존재 여부 확인
    const admin = await this.adminRepository.findOne({
      where: { id: point.createdBy },
    });
    if (!admin) {
      throw new NotFoundException('관리자를 찾을 수 없습니다.');
    }

    // 포인트 기록 생성
    const newPoint = this.pointRepository.create({
      ...point,
      studentId: parseInt(student.studentId),
    });
    return this.pointRepository.save(newPoint);
  }

  async update(id: number, point: Partial<Point>): Promise<Point> {
    const existingPoint = await this.findOne(id);
    
    await this.pointRepository.update(id, point);
    const updatedPoint = await this.pointRepository.findOne({
      where: { id },
      relations: ['student', 'creator'],
    });
    if (!updatedPoint) {
      throw new NotFoundException('상벌점 기록을 찾을 수 없습니다.');
    }
    return updatedPoint;
  }

  async delete(id: number): Promise<void> {
    const point = await this.findOne(id);
    await this.pointRepository.remove(point);
  }
} 