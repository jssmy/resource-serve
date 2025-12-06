import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

/**
 * Guard para validar que las requests provengan de dominios permitidos
 * Dominios permitidos: hardacodeando.com, bugzilo.com
 */
@Injectable()
export class OriginGuard implements CanActivate {
  private readonly allowedOrigins = [
    'https://hardacodeando.com',
    'http://hardacodeando.com',
    'https://bugzilo.com',
    'http://bugzilo.com',
  ];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const origin = request.headers.origin || request.headers.referer;

    // Si no hay origin (Postman, curl, etc.), permitir en desarrollo
    // En producción, descomentar para rechazar requests sin origin
    // if (!origin) {
    //   throw new ForbiddenException('Origin header is required');
    // }

    if (origin) {
      const originUrl = new URL(origin);
      const originHost = originUrl.hostname;

      // Verificar si el dominio está en la lista de permitidos
      const isAllowed = this.allowedOrigins.some((allowedOrigin) => {
        const allowedUrl = new URL(allowedOrigin);
        return allowedUrl.hostname === originHost;
      });

      if (!isAllowed) {
        throw new ForbiddenException(
          `Access denied. Only requests from hardacodeando.com and bugzilo.com are allowed.`,
        );
      }
    }

    return true;
  }
}
