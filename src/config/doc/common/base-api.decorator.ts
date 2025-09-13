import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

export interface ApiDocOptions {
  summary: string;
  description?: string;
  responses?: {
    status: number;
    description: string;
    schema?: any;
  }[];
  tags?: string[];
}

/**
 * Decorador base para documentación de API
 */
export function ApiDoc(options: ApiDocOptions) {
  const decorators = [];

  // Agregar tags si se especifican
  if (options.tags && options.tags.length > 0) {
    decorators.push(ApiTags(...options.tags));
  }

  // Agregar operación
  decorators.push(ApiOperation({ 
    summary: options.summary,
    description: options.description 
  }));

  // Agregar respuestas
  if (options.responses) {
    options.responses.forEach(response => {
      decorators.push(ApiResponse({
        status: response.status,
        description: response.description,
        schema: response.schema
      }));
    });
  }

  return applyDecorators(...decorators);
}

/**
 * Decorador para respuestas de error comunes
 */
export function ApiErrorResponses() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'array', items: { type: 'string' }, example: ['Error de validación'] },
          error: { type: 'string', example: 'Bad Request' }
        }
      }
    }),
    ApiResponse({
      status: 500,
      description: 'Error interno del servidor',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 500 },
          message: { type: 'string', example: 'Error interno del servidor' },
          error: { type: 'string', example: 'Internal Server Error' }
        }
      }
    })
  );
}

/**
 * Decorador para respuestas de autenticación
 */
export function ApiAuthResponses() {
  return applyDecorators(
    ApiResponse({
      status: 401,
      description: 'No autorizado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Unauthorized' }
        }
      }
    }),
    ApiResponse({
      status: 403,
      description: 'Sin permisos suficientes',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 403 },
          message: { type: 'string', example: 'Forbidden' }
        }
      }
    })
  );
}
