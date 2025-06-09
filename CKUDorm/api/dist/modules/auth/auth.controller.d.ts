import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiResponse } from '../../types/common';
import { Kandorm } from '../../entities/kandorm.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<ApiResponse<Kandorm>>;
    login(loginDto: LoginDto): Promise<ApiResponse<{
        accessToken: string;
    }>>;
    getProfile(req: any): Promise<ApiResponse<Kandorm>>;
}
