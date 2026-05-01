import { Matches, MaxLength, MinLength } from 'class-validator';
import { passwordRegx } from '@commons/regx/password.regx';
import {
  ApiResetPasswordPasswordProperty,
  ApiResetPasswordConfirmPasswordProperty,
} from '@config/doc/reset-password/reset-password-property.decorator';

export class ResetPasswordDto {
  @ApiResetPasswordPasswordProperty()
  @MaxLength(255)
  @MinLength(8)
  @Matches(passwordRegx, {
    message:
      'Contraseña inválida. Por favor incluya al menos una letra minúscula, una letra mayúscula, un dígito, un carácter especial y asegúrese de que tenga una longitud mínima de 8 caracteres.',
  })
  password: string;

  @ApiResetPasswordConfirmPasswordProperty()
  @MinLength(8)
  confirmPassword: string;
}
