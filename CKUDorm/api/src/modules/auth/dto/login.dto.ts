import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  studentId: string;  // 학번

  @IsString()
  password: string;  // 비밀번호
} 