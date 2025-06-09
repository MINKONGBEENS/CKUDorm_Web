import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Kandorm } from '../../entities/kandorm.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private kandormRepository;
    private jwtService;
    constructor(kandormRepository: Repository<Kandorm>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<Kandorm>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    validateStudent(studentId: string): Promise<Kandorm>;
    getProfile(studentId: string): Promise<Kandorm>;
}
