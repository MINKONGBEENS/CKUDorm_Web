import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kandorm } from '../../entities/kandorm.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Kandorm)
    private kandormRepository: Repository<Kandorm>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<Kandorm> {
    // 학번 중복 확인
    const existingStudent = await this.kandormRepository.findOne({
      where: { studentId: registerDto.studentId },
    });
    if (existingStudent) {
      throw new ConflictException('이미 등록된 학번입니다.');
    }

    // 학생 생성
    const student = this.kandormRepository.create(registerDto);

    return this.kandormRepository.save(student);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const student = await this.kandormRepository.findOne({
      where: { studentId: loginDto.studentId },
    });

    if (!student) {
      throw new UnauthorizedException('학번 또는 비밀번호가 일치하지 않습니다.');
    }

    // 평문 비밀번호 비교
    if (loginDto.password !== student.password) {
      throw new UnauthorizedException('학번 또는 비밀번호가 일치하지 않습니다.');
    }

    // JWT 토큰 생성
    const payload = {
      sub: student.studentId,
      name: student.name,
      dormitory: student.dormitory,
      roomNumber: student.roomNumber,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateStudent(studentId: string): Promise<Kandorm> {
    const student = await this.kandormRepository.findOne({
      where: { studentId },
    });

    if (!student) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return student;
  }

  async getProfile(studentId: string): Promise<Kandorm> {
    const student = await this.kandormRepository.findOne({
      where: { studentId },
      select: ['studentId', 'name', 'dormitory', 'roomNumber', 'grade', 'departmentId', 'phone'],
    });

    if (!student) {
      throw new UnauthorizedException('학생 정보를 찾을 수 없습니다.');
    }

    return student;
  }
} 