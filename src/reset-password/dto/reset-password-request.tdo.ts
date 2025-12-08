import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { ApiResetPasswordEmailProperty } from '@config/doc/reset-password/reset-password-property.decorator';

export class ResetPasswordRequestDto {
  @ApiResetPasswordEmailProperty()
  @MaxLength(40)
  @MinLength(5)
  @IsEmail()
  email: string;
}
