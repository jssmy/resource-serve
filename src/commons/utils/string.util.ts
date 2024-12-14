export const trim = (str: string, charToTrim) => {
    const regex = new RegExp(`^[${charToTrim}]+|[${charToTrim}]+$`, 'g');
    return str.replace(regex, '');
};


function convertRouteToRegex(route: string) {
    // Escapar caracteres especiales en la ruta
    let regexStr = route.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
    
    // Reemplazar parámetros dinámicos `:param` por una expresión regular que coincida con cualquier cosa (alfa-numérico)
    regexStr = regexStr.replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, '([a-zA-Z0-9_]+)');
    
    // Agregar inicio y fin de línea para asegurar coincidencias exactas
    return new RegExp('^' + regexStr + '$');
}

export function matchRoute(inputRoute: string, routes: string[]): boolean {
    // Convertir la ruta recibida a expresión regular
    const inputRouteRegex = convertRouteToRegex(inputRoute);
  
    // Comparar la ruta recibida con las rutas definidas
    return routes.some(route => inputRouteRegex.test(route));
}