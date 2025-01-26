import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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

  @IsInt()
  roleId: number;
}
