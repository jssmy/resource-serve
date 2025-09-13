import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { ApiDoc, ApiErrorResponses, ApiAuthResponses } from '../common/base-api.decorator';
import { ApiSuccessResponse, ApiCreatedResponse } from '../common/success-responses.decorator';

/**
 * Decorador para endpoints de autenticación
 */
export function ApiAuthTag() {
  return ApiTags('auth');
}

/**
 * Decorador para login de usuario
 */
export function ApiLogin() {
  return applyDecorators(
    ApiAuthTag(),
    ApiOperation({ summary: 'Iniciar sesión de usuario' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'user@example.com', format: 'email' },
          password: { type: 'string', example: 'password123', minLength: 6 }
        },
        required: ['email', 'password']
      }
    }),
    ApiResponse({
      status: 200,
      description: 'Login exitoso',
      schema: {
        type: 'object',
        properties: {
          access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              email: { type: 'string', example: 'user@example.com' },
              name: { type: 'string', example: 'John Doe' }
            }
          }
        }
      }
    }),
    ApiResponse({
      status: 401,
      description: 'Credenciales inválidas',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Credenciales inválidas' }
        }
      }
    }),
    ApiErrorResponses()
  );
}

/**
 * Decorador para registro de usuario
 */
export function ApiRegister() {
  return applyDecorators(
    ApiAuthTag(),
    ApiOperation({ summary: 'Registrar nuevo usuario' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Juan', minLength: 2, maxLength: 50 },
          surnames: { type: 'string', example: 'Pérez García', minLength: 8, maxLength: 155 },
          email: { type: 'string', example: 'juan.perez@example.com', format: 'email' },
          avatars: { type: 'array', items: { type: 'string' } },
          roleId: { type: 'number', example: 1 }
        },
        required: ['name', 'surnames', 'email', 'roleId']
      }
    }),
    ApiCreatedResponse('Usuario registrado exitosamente', {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        email: { type: 'string', example: 'user@example.com' },
        name: { type: 'string', example: 'John Doe' },
        message: { type: 'string', example: 'Usuario registrado exitosamente' }
      }
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'array', items: { type: 'string' }, example: ['El email ya está en uso'] }
        }
      }
    }),
    ApiErrorResponses()
  );
}

/**
 * Decorador para logout de usuario
 */
export function ApiLogout() {
  return applyDecorators(
    ApiAuthTag(),
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary: 'Cerrar sesión de usuario' }),
    ApiHeader({
      name: 'authorization',
      description: 'Token JWT de acceso',
      required: true,
      example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    ApiSuccessResponse('Sesión cerrada exitosamente', {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Sesión cerrada exitosamente' }
      }
    }),
    ApiAuthResponses(),
    ApiErrorResponses()
  );
}

/**
 * Decorador para confirmación de cuenta
 */
export function ApiConfirmAccount() {
  return applyDecorators(
    ApiAuthTag(),
    ApiOperation({ summary: 'Confirmar cuenta de usuario' }),
    ApiResponse({
      status: 200,
      description: 'Cuenta confirmada exitosamente',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Cuenta confirmada exitosamente' }
        }
      }
    }),
    ApiResponse({
      status: 400,
      description: 'Token inválido o expirado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'string', example: 'Token inválido o expirado' }
        }
      }
    }),
    ApiErrorResponses()
  );
}

/**
 * Decorador para reset de contraseña
 */
export function ApiResetPassword() {
  return applyDecorators(
    ApiAuthTag(),
    ApiOperation({ summary: 'Solicitar reset de contraseña' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'user@example.com', format: 'email' }
        },
        required: ['email']
      }
    }),
    ApiSuccessResponse('Email de reset enviado exitosamente'),
    ApiResponse({
      status: 404,
      description: 'Usuario no encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'Usuario no encontrado' }
        }
      }
    }),
    ApiErrorResponses()
  );
}
