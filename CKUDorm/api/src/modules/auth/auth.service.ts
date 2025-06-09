import { Injectable, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kandorm } from '../../entities/kandorm.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

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

  async login(loginDto: LoginDto): Promise<{ success: boolean; data: { accessToken: string }; message: string }> {
    this.logger.debug(`Attempting login for studentId: ${loginDto.studentId}`);

    const admin = await this.kandormRepository.findOne({
      where: { studentId: loginDto.studentId },
    });

    if (!admin) {
      this.logger.warn(`Login failed: User not found for studentId: ${loginDto.studentId}`);
      throw new UnauthorizedException('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    this.logger.debug(`Found user: ${JSON.stringify(admin)}`);

    // 비밀번호 비교
    if (loginDto.password !== admin.password) {
      this.logger.warn(`Login failed: Invalid password for studentId: ${loginDto.studentId}`);
      throw new UnauthorizedException('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    // JWT 토큰 생성
    const payload = {
      sub: admin.id,
      studentId: admin.studentId,
      name: admin.name,
      role: 'ADMIN'  // 관리자 권한
    };

    this.logger.debug(`Generated JWT payload: ${JSON.stringify(payload)}`);

    const accessToken = this.jwtService.sign(payload);

    this.logger.debug('Login successful');

    return {
      success: true,
      data: {
        accessToken
      },
      message: '로그인이 완료되었습니다.'
    };
  }

  async validateUser(studentId: string): Promise<any> {
    const admin = await this.kandormRepository.findOne({
      where: { studentId },
    });

    if (!admin) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return {
      id: admin.id,
      studentId: admin.studentId,
      name: admin.name,
      role: 'ADMIN'
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