import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  ApiErrorResponses,
  ApiAuthResponses,
} from '../common/base-api.decorator';
import {
  ApiSuccessResponse,
  ApiPaginatedResponse,
  ApiDeletedResponse,
} from '../common/success-responses.decorator';

/**
 * Decorador para endpoints de usuarios
 */
export function ApiUserTag() {
  return ApiTags('users');
}

/**
 * Esquema de usuario para documentación
 */
const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
    name: { type: 'string', example: 'Juan' },
    surnames: { type: 'string', example: 'Pérez García' },
    email: { type: 'string', example: 'juan.perez@example.com' },
    avatars: { type: 'array', items: { type: 'string' } },
    role: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'Admin' },
      },
    },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};

/**
 * Decorador para obtener lista de usuarios
 */
export function ApiGetUsers() {
  return applyDecorators(
    ApiUserTag(),
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary: 'Obtener lista de usuarios con paginación' }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Número de página',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Límite de usuarios por página',
      example: 10,
    }),
    ApiPaginatedResponse(userSchema, 'Lista de usuarios obtenida exitosamente'),
    ApiAuthResponses(),
    ApiErrorResponses(),
  );
}

/**
 * Decorador para obtener usuario por ID
 */
export function ApiGetUser() {
  return applyDecorators(
    ApiUserTag(),
    ApiOperation({ summary: 'Obtener usuario por ID' }),
    ApiParam({
      name: 'id',
      description: 'UUID del usuario',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiSuccessResponse('Usuario encontrado exitosamente', userSchema),
    ApiResponse({
      status: 404,
      description: 'Usuario no encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'Usuario no encontrado' },
        },
      },
    }),
    ApiErrorResponses(),
  );
}

/**
 * Decorador para crear usuario
 */
export function ApiCreateUser() {
  return applyDecorators(
    ApiUserTag(),
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary: 'Crear nuevo usuario' }),
    ApiResponse({
      status: 201,
      description: 'Usuario creado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          name: { type: 'string', example: 'Juan' },
          surnames: { type: 'string', example: 'Pérez García' },
          email: { type: 'string', example: 'juan.perez@example.com' },
          message: { type: 'string', example: 'Usuario creado exitosamente' },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: {
            type: 'array',
            items: { type: 'string' },
            example: ['El email ya está en uso'],
          },
        },
      },
    }),
    ApiAuthResponses(),
    ApiErrorResponses(),
  );
}

/**
 * Decorador para actualizar usuario
 */
export function ApiUpdateUser() {
  return applyDecorators(
    ApiUserTag(),
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary: 'Actualizar usuario por ID' }),
    ApiParam({
      name: 'id',
      description: 'UUID del usuario',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiSuccessResponse('Usuario actualizado exitosamente', userSchema),
    ApiResponse({
      status: 404,
      description: 'Usuario no encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'Usuario no encontrado' },
        },
      },
    }),
    ApiAuthResponses(),
    ApiErrorResponses(),
  );
}

/**
 * Decorador para eliminar usuario
 */
export function ApiDeleteUser() {
  return applyDecorators(
    ApiUserTag(),
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary: 'Eliminar usuario por ID' }),
    ApiParam({
      name: 'id',
      description: 'UUID del usuario',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiDeletedResponse('Usuario eliminado exitosamente'),
    ApiResponse({
      status: 404,
      description: 'Usuario no encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'Usuario no encontrado' },
        },
      },
    }),
    ApiAuthResponses(),
    ApiErrorResponses(),
  );
}
