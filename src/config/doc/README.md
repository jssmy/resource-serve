# 📚 Documentación de Decoradores Personalizados

Este directorio contiene decoradores personalizados para centralizar la documentación de Swagger en lugar de escribirla directamente en los controladores.

## 🏗️ Estructura

```
src/config/doc/
├── common/                    # Decoradores base y comunes
│   ├── base-api.decorator.ts  # Decorador base y respuestas de error
│   └── success-responses.decorator.ts  # Respuestas de éxito
├── auth/                      # Decoradores de autenticación
│   └── auth-api.decorator.ts
├── user/                      # Decoradores de gestión de usuarios
│   └── user-api.decorator.ts
├── app/                       # Decoradores de aplicación
│   └── app-api.decorator.ts
└── index.ts                   # Exportaciones centralizadas
```

## 🎯 Decoradores Disponibles

### 🔐 Autenticación (`auth/`)

- `@ApiLogin()` - Documentación para login de usuario
- `@ApiRegister()` - Documentación para registro de usuario
- `@ApiLogout()` - Documentación para logout de usuario
- `@ApiConfirmAccount()` - Documentación para confirmación de cuenta
- `@ApiResetPassword()` - Documentación para reset de contraseña

### 👥 Usuarios (`user/`)

- `@ApiGetUsers()` - Documentación para obtener lista de usuarios
- `@ApiGetUser()` - Documentación para obtener usuario por ID
- `@ApiCreateUser()` - Documentación para crear usuario
- `@ApiUpdateUser()` - Documentación para actualizar usuario
- `@ApiDeleteUser()` - Documentación para eliminar usuario

### 🏠 Aplicación (`app/`)

- `@ApiWelcome()` - Documentación para endpoint de bienvenida
- `@ApiHealthCheck()` - Documentación para health check

### 🔧 Comunes (`common/`)

- `@ApiDoc(options)` - Decorador base configurable
- `@ApiErrorResponses()` - Respuestas de error comunes
- `@ApiAuthResponses()` - Respuestas de autenticación
- `@ApiSuccessResponse()` - Respuesta de éxito genérica
- `@ApiCreatedResponse()` - Respuesta de creación exitosa
- `@ApiDeletedResponse()` - Respuesta de eliminación exitosa
- `@ApiPaginatedResponse()` - Respuesta de lista paginada

## 📝 Cómo Usar

### 1. Importar el decorador

```typescript
import { ApiLogin } from '../config/doc';
```

### 2. Aplicar el decorador

```typescript
@Post()
@ApiLogin()
login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}
```

### 3. Resultado

El decorador aplicará automáticamente:
- ✅ Tags de Swagger
- ✅ Descripción de la operación
- ✅ Esquemas de request/response
- ✅ Códigos de estado HTTP
- ✅ Ejemplos de datos
- ✅ Autenticación si es necesaria

## 🎨 Ejemplo Completo

### Antes (documentación en el controlador):

```typescript
@Post()
@ApiTags('auth')
@ApiOperation({ summary: 'Iniciar sesión de usuario' })
@ApiBody({ type: LoginDto })
@ApiResponse({ 
  status: 200, 
  description: 'Login exitoso',
  schema: { /* esquema complejo */ }
})
@ApiResponse({ 
  status: 401, 
  description: 'Credenciales inválidas',
  schema: { /* esquema de error */ }
})
login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}
```

### Después (usando decorador personalizado):

```typescript
@Post()
@ApiLogin()
login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}
```

## 🔧 Crear Nuevos Decoradores

### 1. Crear el archivo del decorador

```typescript
// src/config/doc/mi-modulo/mi-modulo-api.decorator.ts
import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

export function ApiMiModuloTag() {
  return ApiTags('mi-modulo');
}

export function ApiMiOperacion() {
  return applyDecorators(
    ApiMiModuloTag(),
    ApiOperation({ summary: 'Descripción de la operación' }),
    // ... más decoradores
  );
}
```

### 2. Exportar en el índice

```typescript
// src/config/doc/index.ts
export * from './mi-modulo/mi-modulo-api.decorator';
```

### 3. Usar en el controlador

```typescript
import { ApiMiOperacion } from '../config/doc';

@Controller('mi-modulo')
export class MiModuloController {
  @Get()
  @ApiMiOperacion()
  miOperacion() {
    return this.service.miOperacion();
  }
}
```

## 🎯 Ventajas

- ✅ **Código más limpio**: Los controladores se enfocan en la lógica de negocio
- ✅ **Reutilización**: Los decoradores se pueden usar en múltiples controladores
- ✅ **Mantenimiento**: Cambios en la documentación se hacen en un solo lugar
- ✅ **Consistencia**: Todos los endpoints siguen el mismo patrón de documentación
- ✅ **Escalabilidad**: Fácil agregar nuevos decoradores para nuevos módulos

## 🚀 Próximos Pasos

1. **Agregar más decoradores** para otros módulos (roles, permissions, etc.)
2. **Crear decoradores específicos** para operaciones complejas
3. **Implementar validaciones** en los decoradores
4. **Agregar tests** para los decoradores
5. **Documentar esquemas** reutilizables

---

**¡La documentación está centralizada y es fácil de mantener! 🎉**
