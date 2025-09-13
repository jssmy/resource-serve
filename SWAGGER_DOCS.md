# 📚 Documentación de la API - Swagger

## 🚀 Configuración de Swagger

Swagger ha sido configurado exitosamente en el proyecto. La documentación interactiva está disponible en:

**URL de la documentación:** `http://localhost:3000/api/docs`

## 🛠️ Características implementadas

### ✅ Configuración básica
- **Título:** Resource Serve API
- **Descripción:** API de autenticación y gestión de recursos
- **Versión:** 1.0
- **Autenticación:** Bearer JWT configurada

### ✅ Endpoints documentados

#### 🔐 Autenticación (`/auth`)
- `POST /login` - Iniciar sesión
- `POST /register` - Registrar nuevo usuario
- `POST /logout` - Cerrar sesión

#### 👥 Usuarios (`/users`)
- `GET /user` - Listar usuarios (con paginación)
- `GET /user/:id` - Obtener usuario por ID
- `DELETE /user/:id` - Eliminar usuario

#### 🏠 Aplicación (`/app`)
- `GET /` - Mensaje de bienvenida

### ✅ DTOs documentados
- `LoginDto` - Datos de login
- `RegisterUserDto` - Datos de registro de usuario

## 🔧 Cómo usar la documentación

1. **Iniciar la aplicación:**
   ```bash
   npm run start:dev
   ```

2. **Acceder a la documentación:**
   - Abrir navegador en: `http://localhost:3000/api/docs`

3. **Probar endpoints:**
   - Usar el botón "Try it out" en cada endpoint
   - La autenticación JWT se mantiene entre requests
   - Ejemplos de datos están incluidos

## 🔑 Autenticación

Para endpoints protegidos:
1. Hacer login en `/login`
2. Copiar el `access_token` de la respuesta
3. Hacer clic en "Authorize" en la parte superior de Swagger
4. Pegar el token con el formato: `Bearer tu_token_aqui`
5. Ahora puedes probar endpoints protegidos

## 📝 Estructura de la documentación

### Tags organizados:
- **auth** - Endpoints de autenticación
- **users** - Gestión de usuarios  
- **roles** - Gestión de roles
- **permissions** - Gestión de permisos
- **app** - Endpoints generales

### Respuestas documentadas:
- ✅ Códigos de estado HTTP
- ✅ Esquemas de respuesta
- ✅ Ejemplos de datos
- ✅ Mensajes de error

## 🎯 Próximos pasos

Para agregar más documentación:

1. **Agregar decoradores a nuevos controladores:**
   ```typescript
   @ApiTags('nombre-del-tag')
   @ApiOperation({ summary: 'Descripción del endpoint' })
   @ApiResponse({ status: 200, description: 'Respuesta exitosa' })
   ```

2. **Documentar DTOs:**
   ```typescript
   @ApiProperty({
     description: 'Descripción del campo',
     example: 'ejemplo',
     type: 'string'
   })
   ```

3. **Agregar autenticación a endpoints protegidos:**
   ```typescript
   @ApiBearerAuth('JWT-auth')
   ```

## 🐛 Solución de problemas

Si la documentación no aparece:
1. Verificar que la aplicación esté corriendo
2. Revisar la consola por errores
3. Asegurarse de que el puerto 3000 esté disponible
4. Verificar que las dependencias estén instaladas correctamente

---

**¡La documentación está lista para usar! 🎉**
