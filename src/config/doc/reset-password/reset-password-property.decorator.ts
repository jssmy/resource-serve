import { ApiProperty } from '@nestjs/swagger';

/**
 * Decorador para propiedades de email en reset password
 */
export function ApiResetPasswordEmailProperty() {
  return ApiProperty({
    description: 'Email del usuario que solicita el reset de contraseña',
    example: 'user@example.com',
    minLength: 5,
    maxLength: 40,
    format: 'email',
  });
}

/**
 * Decorador para propiedades de contraseña en reset password
 */
export function ApiResetPasswordPasswordProperty() {
  return ApiProperty({
    description:
      'Nueva contraseña que debe contener al menos una letra minúscula, una mayúscula, un dígito y un carácter especial',
    example: 'NewPassword123!',
    minLength: 8,
    maxLength: 15,
    pattern:
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,15}$',
  });
}

/**
 * Decorador para propiedades de confirmación de contraseña
 */
export function ApiResetPasswordConfirmPasswordProperty() {
  return ApiProperty({
    description: 'Confirmación de la nueva contraseña',
    example: 'NewPassword123!',
    minLength: 8,
  });
}
