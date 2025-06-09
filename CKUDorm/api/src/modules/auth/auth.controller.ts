import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiResponse } from '../../types/common';
import { Kandorm } from '../../entities/kandorm.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ApiResponse<Kandorm>> {
    const student = await this.authService.register(registerDto);
    return {
      success: true,
      data: student,
      message: '회원가입이 완료되었습니다.',
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse<{ accessToken: string }>> {
    const result = await this.authService.login(loginDto);
    return {
      success: true,
      data: result,
      message: '로그인이 완료되었습니다.',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<ApiResponse<Kandorm>> {
    const student = await this.authService.getProfile(req.user.studentId);
    return {
      success: true,
      data: student,
    };
  }
} 