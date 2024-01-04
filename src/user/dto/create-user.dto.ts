import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserGrant } from 'src/commons/types/user-grant';

export class CreateUserDto {
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  name: string;

  @MaxLength(40)
  @MinLength(5)
  @IsEmail()
  email: string;

  @IsString({ each: true })
  @IsOptional()
  avatars?: string[];

  @MaxLength(15)
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
    {
      message:
        'Invalid password. Please include at least one lowercase letter, one uppercase letter, one digit, one special character, and ensure a minimum length of 8 characters.',
    },
  )
  password: string;

  @MaxLength(15)
  @MinLength(8)
  confirmPassword: string;

  @IsEnum(UserGrant)
  userGrant: UserGrant;
}
