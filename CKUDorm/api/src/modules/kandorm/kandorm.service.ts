import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Kandorm } from '../../entities/kandorm.entity';

@Injectable()
export class KandormService {
  constructor(
    @InjectRepository(Kandorm)
    private kandormRepository: Repository<Kandorm>,
  ) {}

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const queryBuilder = this.kandormRepository.createQueryBuilder('kandorm')
      .leftJoinAndSelect('kandorm.department', 'department');

    if (search) {
      queryBuilder.where([
        { name: ILike(`%${search}%`) },
        { studentId: ILike(`%${search}%`) },
        { dormitory: ILike(`%${search}%`) },
        { roomNumber: ILike(`%${search}%`) },
      ]);
    }

    const [students, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { students, total };
  }

  async findOne(id: number): Promise<Kandorm> {
    const student = await this.kandormRepository.findOne({
      where: { id },
      relations: ['department'],
    });

    if (!student) {
      throw new NotFoundException('학생을 찾을 수 없습니다.');
    }

    return student;
  }

  async update(id: number, updateData: Partial<Kandorm>): Promise<Kandorm> {
    const student = await this.findOne(id);
    
    // password 필드가 있다면 제외
    const { password, ...safeUpdateData } = updateData;
    
    Object.assign(student, safeUpdateData);
    return this.kandormRepository.save(student);
  }

  async delete(id: number): Promise<void> {
    const result = await this.kandormRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('학생을 찾을 수 없습니다.');
    }
  }
} 