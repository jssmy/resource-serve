import { Matches, MaxLength, MinLength } from 'class-validator';
import { PasswordRegx } from 'src/commons/regx/password.regx';

export class PassordResetDto {
  @MaxLength(15)
  @MinLength(8)
  @Matches(PasswordRegx, {
    message:
      'Invalid password. Please include at least one lowercase letter, one uppercase letter, one digit, one special character, and ensure a minimum length of 8 characters.',
  })
  password: string;
}
