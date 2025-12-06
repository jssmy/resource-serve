import { Permission } from 'src/permissions/entities/permission.entity';

export const trim = (str: string, charToTrim) => {
  str = str || '';
  const regex = new RegExp(`^[${charToTrim}]+|[${charToTrim}]+$`, 'g');
  return str.replace(regex, '');
};

// TODO: Migrar a nuevo sistema de paths - Esta función será reemplazada
// cuando se implemente el nuevo sistema de routing que soportará parámetros opcionales nativamente
function convertRouteToRegex(route: string): RegExp {
  // Escapar caracteres especiales en la ruta
  let regexStr = route.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');

  // Reemplazar parámetros dinámicos obligatorios y opcionales
  // Nota: El soporte de parámetros opcionales (:id?) se mantiene aquí para compatibilidad
  // con el sistema de permisos actual, pero será reemplazado en la migración
  regexStr = route.replace(
    /\/:([a-zA-Z_][a-zA-Z0-9_-]*)(\?)?/g,
    (_, paramName, optional) => {
      // Verificar si es un parámetro opcional
      const isOptional = optional !== undefined;

      return isOptional ? '(?:/([a-zA-Z0-9_-]+))?' : '/([a-zA-Z0-9_-]+)';
    },
  );

  // Permitir coincidencia exacta desde el inicio hasta el final y barra final opcional
  return new RegExp(`^${regexStr}$`);
}

export function matchRoute(
  inputRoute: string,
  routes: Permission[],
): Permission {
  // Convertir la ruta recibida a expresión regular

  // Comparar la ruta recibida con las rutas definidas
  const formatRoutes = routes.map((route) => ({
    ...route,
    route: trim(route.route, '/'),
  }));
  const formatRoute = trim(inputRoute, '/').trim();

  return formatRoutes.find((route) =>
    convertRouteToRegex(route.route).test(formatRoute),
  );
}

export function removeQueryParams(url: string) {
  const index = url.indexOf('?');
  return index !== -1 ? url.substring(0, index) : url;
}
