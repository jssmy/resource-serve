import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ApiErrorResponses, ApiAuthResponses } from '../common/base-api.decorator';
import { ApiSuccessResponse } from '../common/success-responses.decorator';

/**
 * Decorador para endpoints de reset password
 */
export function ApiResetPasswordTag() {
  return ApiTags('reset-password');
}

/**
 * Esquema de solicitud de reset password
 */
const resetPasswordRequestSchema = {
  type: 'object',
  properties: {
    email: { 
      type: 'string', 
      format: 'email',
      example: 'user@example.com',
      description: 'Email del usuario que solicita el reset de contraseña'
    }
  },
  required: ['email']
};

/**
 * Esquema de reset password
 */
const resetPasswordSchema = {
  type: 'object',
  properties: {
    password: { 
      type: 'string', 
      minLength: 8,
      maxLength: 15,
      example: 'NewPassword123!',
      description: 'Nueva contraseña que debe contener al menos una letra minúscula, una mayúscula, un dígito y un carácter especial'
    },
    confirmPassword: { 
      type: 'string', 
      minLength: 8,
      example: 'NewPassword123!',
      description: 'Confirmación de la nueva contraseña'
    }
  },
  required: ['password', 'confirmPassword']
};

/**
 * Esquema de respuesta exitosa
 */
const successResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: true },
    message: { type: 'string', example: 'Operación exitosa' }
  }
};

/**
 * Decorador para enviar email de reset password
 */
export function ApiSendResetPasswordMail() {
  return applyDecorators(
    ApiResetPasswordTag(),
    ApiOperation({ 
      summary: 'Solicitar reset de contraseña',
      description: 'Solicita un reset de contraseña enviando un email con un token al usuario'
    }),
    ApiBody({
      type: 'object',
      schema: resetPasswordRequestSchema,
      description: 'Datos para solicitar el reset de contraseña'
    }),
    ApiSuccessResponse('Solicitud de reset enviada exitosamente', {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Mail reset password was send to user@example.com, please check your inbox' }
      }
    }),
    ApiResponse({
      status: 404,
      description: 'Email no encontrado o cuenta no validada',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'Email account is not found' }
        }
      }
    }),
    ApiAuthResponses(),
    ApiErrorResponses()
  );
}

/**
 * Decorador para resetear contraseña con token
 */
export function ApiResetPassword() {
  return applyDecorators(
    ApiResetPasswordTag(),
    ApiOperation({ 
      summary: 'Cambiar contraseña con token',
      description: 'Cambia la contraseña del usuario usando el token válido enviado por email'
    }),
    ApiParam({ 
      name: 'token', 
      description: 'Token de reset de contraseña enviado por email (UUID)',
      example: '123e4567-e89b-12d3-a456-426614174000',
      type: 'string',
      format: 'uuid'
    }),
    ApiBody({
      type: 'object',
      schema: resetPasswordSchema,
      description: 'Nueva contraseña y confirmación'
    }),
    ApiSuccessResponse('Contraseña cambiada exitosamente', {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Password was reset' }
      }
    }),
    ApiResponse({
      status: 400,
      description: 'Token UUID inválido',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'string', example: 'Validation failed (uuid is expected)' },
          error: { type: 'string', example: 'Bad Request' }
        }
      }
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { 
            type: 'string', 
            example: 'Confirm password is not correct' 
          }
        }
      }
    }),
    ApiResponse({
      status: 404,
      description: 'Token no encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'Token not found' }
        }
      }
    }),
    ApiResponse({
      status: 419,
      description: 'Token expirado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 419 },
          message: { type: 'string', example: 'Token is expired' }
        }
      }
    }),
    ApiErrorResponses()
  );
}

/**
 * Decorador para validar token de reset password
 */
export function ApiValidateResetPasswordToken() {
  return applyDecorators(
    ApiResetPasswordTag(),
    ApiOperation({ 
      summary: 'Validar token de reset de contraseña',
      description: 'Valida si un token de reset de contraseña es válido y no ha expirado'
    }),
    ApiParam({ 
      name: 'token', 
      description: 'Token de reset de contraseña a validar (UUID)',
      example: '123e4567-e89b-12d3-a456-426614174000',
      type: 'string',
      format: 'uuid'
    }),
    ApiSuccessResponse('Token válido', {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Token is valid' }
      }
    }),
    ApiResponse({
      status: 400,
      description: 'Token UUID inválido',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'string', example: 'Validation failed (uuid is expected)' },
          error: { type: 'string', example: 'Bad Request' }
        }
      }
    }),
    ApiResponse({
      status: 404,
      description: 'Token no encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'Token not found' }
        }
      }
    }),
    ApiResponse({
      status: 419,
      description: 'Token expirado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 419 },
          message: { type: 'string', example: 'Token is expired' }
        }
      }
    }),
    ApiErrorResponses()
  );
}
