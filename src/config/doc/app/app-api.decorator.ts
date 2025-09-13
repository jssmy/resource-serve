import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiErrorResponses } from '../common/base-api.decorator';
import { ApiSuccessResponse } from '../common/success-responses.decorator';

/**
 * Decorador para endpoints de aplicación
 */
export function ApiAppTag() {
  return ApiTags('app');
}

/**
 * Decorador para endpoint de bienvenida
 */
export function ApiWelcome() {
  return applyDecorators(
    ApiAppTag(),
    ApiOperation({ summary: 'Obtener mensaje de bienvenida' }),
    ApiSuccessResponse('Mensaje de bienvenida obtenido exitosamente', {
      type: 'string',
      example: 'Hello World!'
    }),
    ApiErrorResponses()
  );
}

/**
 * Decorador para endpoint de salud de la aplicación
 */
export function ApiHealthCheck() {
  return applyDecorators(
    ApiAppTag(),
    ApiOperation({ summary: 'Verificar estado de la aplicación' }),
    ApiSuccessResponse('Aplicación funcionando correctamente', {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', format: 'date-time' },
        uptime: { type: 'number', example: 12345 },
        version: { type: 'string', example: '1.0.0' }
      }
    }),
    ApiErrorResponses()
  );
}
