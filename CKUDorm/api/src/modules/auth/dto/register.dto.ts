import { IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  studentId: string;  // 학번

  @IsString()
  name: string;  // 이름

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: '비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
  })
  password: string;  // 비밀번호

  @IsString()
  roomNumber: string;  // 호실
} 