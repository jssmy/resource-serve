import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Apellidos del usuario',
    example: 'Pérez García',
    minLength: 8,
    maxLength: 155,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(155)
  surnames: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@example.com',
    format: 'email',
    minLength: 5,
    maxLength: 40,
  })
  @MaxLength(40)
  @MinLength(5)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'URLs de avatares del usuario',
    example: [
      'https://example.com/avatar1.jpg',
      'https://example.com/avatar2.jpg',
    ],
    required: false,
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  avatars?: string[];

  @ApiProperty({
    description: 'ID del rol asignado al usuario',
    example: 1,
    type: 'integer',
  })
  @IsInt()
  roleId: number;
}
