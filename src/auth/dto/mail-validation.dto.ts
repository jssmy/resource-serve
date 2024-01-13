import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class MailValidationDto {
  @MaxLength(40)
  @MinLength(5)
  @IsEmail()
  email: string;
}
