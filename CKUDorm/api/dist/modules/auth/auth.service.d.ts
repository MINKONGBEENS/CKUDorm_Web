import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Kandorm } from '../../entities/kandorm.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private kandormRepository;
    private jwtService;
    private readonly logger;
    constructor(kandormRepository: Repository<Kandorm>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<Kandorm>;
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        data: {
            accessToken: string;
        };
        message: string;
    }>;
    validateUser(studentId: string): Promise<any>;
    validateStudent(studentId: string): Promise<Kandorm>;
    getProfile(studentId: string): Promise<Kandorm>;
}
