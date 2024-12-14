import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PasswordRegx } from 'src/commons/regx/password.regx';

export class RegisterUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(155)
  surnames: string;

  @MaxLength(40)
  @MinLength(5)
  @IsEmail()
  email: string;

  @IsString({ each: true })
  @IsOptional()
  avatars?: string[];

  @MaxLength(15)
  @MinLength(8)
  @Matches(PasswordRegx, {
    message:
      'Invalid password. Please include at least one lowercase letter, one uppercase letter, one digit, one special character, and ensure a minimum length of 8 characters.',
  })
  password: string;

  @MaxLength(15)
  @MinLength(8)
  confirmPassword: string;

  @IsInt()
  roleId: number;
}
