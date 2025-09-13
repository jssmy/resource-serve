import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

/**
 * Decorador para respuesta de éxito genérica
 */
export function ApiSuccessResponse(description: string, schema?: any) {
  return ApiResponse({
    status: 200,
    description,
    schema: schema || {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Operación exitosa' }
      }
    }
  });
}

/**
 * Decorador para respuesta de creación exitosa
 */
export function ApiCreatedResponse(description: string, schema?: any) {
  return ApiResponse({
    status: 201,
    description,
    schema: schema || {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Recurso creado exitosamente' }
      }
    }
  });
}

/**
 * Decorador para respuesta de eliminación exitosa
 */
export function ApiDeletedResponse(description: string) {
  return ApiResponse({
    status: 200,
    description,
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Recurso eliminado exitosamente' }
      }
    }
  });
}

/**
 * Decorador para respuesta de lista paginada
 */
export function ApiPaginatedResponse(itemSchema: any, description: string = 'Lista obtenida exitosamente') {
  return ApiResponse({
    status: 200,
    description,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: itemSchema
        },
        total: { type: 'number', example: 25 },
        page: { type: 'number', example: 1 },
        limit: { type: 'number', example: 10 },
        totalPages: { type: 'number', example: 3 }
      }
    }
  });
}
