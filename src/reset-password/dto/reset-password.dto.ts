import { Matches, MaxLength, MinLength } from 'class-validator';
import { passwordRegx } from 'src/commons/regx/password.regx';
import {
  ApiResetPasswordPasswordProperty,
  ApiResetPasswordConfirmPasswordProperty,
} from 'src/config/doc/reset-password/reset-password-property.decorator';

export class ResetPasswordDto {
  @ApiResetPasswordPasswordProperty()
  @MaxLength(255)
  @MinLength(8)
  @Matches(passwordRegx, {
    message:
      'Invalid password. Please include at least one lowercase letter, one uppercase letter, one digit, one special character, and ensure a minimum length of 8 characters.',
  })
  password: string;

  @ApiResetPasswordConfirmPasswordProperty()
  @MinLength(8)
  confirmPassword: string;
}
