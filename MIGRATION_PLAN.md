# 📋 Plan de Migración: NestJS 10 → NestJS 11

## 🎯 Objetivo
Migrar de NestJS 10.4.20 a NestJS 11.1.9 para resolver vulnerabilidades de seguridad y mantener el proyecto actualizado.

## ⚠️ Requisitos Previos
- ✅ Node.js v25.2.1 (compatible con NestJS 11)
- ✅ Git configurado
- ✅ Proyecto funcionando correctamente

---

## 📦 Fase 1: Preparación (15 min)

### 1.1 Crear branch de migración
```bash
git checkout -b feature/migrate-nestjs-11
git push -u origin feature/migrate-nestjs-11
```

### 1.2 Backup del package.json
```bash
cp package.json package.json.backup
```

### 1.3 Verificar estado actual
```bash
npm run build
npm run test
npm run start:dev  # Verificar que funciona
```

### 1.4 Limpiar dependencias
```bash
rm -rf node_modules package-lock.json
```

---

## 🔄 Fase 2: Actualización de Dependencias (30 min)

### 2.1 Actualizar nodemailer primero (compatible con NestJS 10)
```bash
npm install nodemailer@^7.0.11
npm run build  # Verificar que compila
```

**Verificar cambios:**
- Revisar si hay cambios en la API de nodemailer
- Verificar que el servicio de mail funciona

### 2.2 Actualizar paquetes core de NestJS
```bash
npm install @nestjs/common@^11.1.9 \
            @nestjs/core@^11.1.9 \
            @nestjs/platform-express@^11.0.0 \
            @nestjs/config@^3.1.1 \
            @nestjs/jwt@^11.0.0 \
            @nestjs/passport@^11.0.0 \
            @nestjs/typeorm@^11.0.0 \
            @nestjs/throttler@^7.0.0
```

**Nota:** `@nestjs/throttler` cambia de v6 a v7, revisar breaking changes.

### 2.3 Actualizar @nestjs/swagger
```bash
npm install @nestjs/swagger@^11.2.3
```

**Breaking Changes esperados:**
- Cambios en decoradores de Swagger
- Posibles cambios en `DocumentBuilder`

### 2.4 Actualizar @nestjs-modules/mailer
```bash
npm install @nestjs-modules/mailer@^2.0.2
```

**Breaking Changes esperados:**
- Cambios en configuración del módulo
- Posibles cambios en la API del servicio

### 2.5 Actualizar devDependencies
```bash
npm install --save-dev @nestjs/cli@^11.0.14 \
                       @nestjs/schematics@^11.0.0 \
                       @nestjs/testing@^11.0.0
```

### 2.6 Actualizar @nestjs/mapped-types
```bash
npm install @nestjs/mapped-types@^2.0.0
```

---

## 🔍 Fase 3: Verificación de Breaking Changes (45 min)

### 3.1 Cambios en @nestjs/swagger (v7 → v11)

**Archivos a revisar:**
- `src/main.ts` - Configuración de Swagger
- `src/config/doc/**/*.decorator.ts` - Todos los decoradores de Swagger

**Cambios esperados:**
- `DocumentBuilder` puede tener cambios en métodos
- Decoradores `@Api*` pueden requerir ajustes
- `SwaggerModule.setup()` puede tener cambios

**Acción:**
```bash
# Buscar usos de Swagger
grep -r "DocumentBuilder\|SwaggerModule\|@Api" src/
```

### 3.2 Cambios en @nestjs/throttler (v6 → v7)

**Archivos a revisar:**
- `src/app.module.ts` - Configuración de ThrottlerModule
- `src/commons/guards/throttler.guard.ts` - Guard personalizado

**Cambios esperados:**
- `ThrottlerModule.forRoot()` puede cambiar
- API del `ThrottlerGuard` puede cambiar

**Acción:**
- Revisar documentación de @nestjs/throttler v7
- Verificar que `CustomThrottlerGuard` sigue funcionando

### 3.3 Cambios en @nestjs-modules/mailer (v1 → v2)

**Archivos a revisar:**
- `src/mail/mail.service.ts` - Servicio de mail
- `src/app.module.ts` o módulo de mail - Configuración

**Cambios esperados:**
- Configuración del módulo puede cambiar
- API del `MailerService` puede cambiar

**Acción:**
- Revisar documentación de @nestjs-modules/mailer v2
- Verificar métodos usados: `sendMail()`, `sendMailAccountConfirmation()`, etc.

### 3.4 Cambios en nodemailer (v6 → v7)

**Archivos a revisar:**
- `src/mail/mail.service.ts` - Uso de nodemailer

**Cambios esperados:**
- API de `nodemailer` puede tener cambios menores
- Opciones de configuración pueden cambiar

**Acción:**
- Revisar changelog de nodemailer v7
- Verificar que las opciones de transporte siguen funcionando

---

## 🛠️ Fase 4: Correcciones de Código (60 min)

### 4.1 Compilar y revisar errores
```bash
npm run build
```

### 4.2 Corregir errores de TypeScript
- Revisar errores de tipos
- Actualizar imports si es necesario
- Ajustar decoradores si cambiaron

### 4.3 Actualizar decoradores de Swagger
Si hay cambios en `@nestjs/swagger`:
- Revisar cada decorador en `src/config/doc/`
- Actualizar según nueva API

### 4.4 Actualizar configuración de Throttler
Si hay cambios en `@nestjs/throttler`:
- Revisar `src/app.module.ts`
- Actualizar `ThrottlerModule.forRoot()`
- Verificar `CustomThrottlerGuard`

### 4.5 Actualizar servicio de Mail
Si hay cambios en `@nestjs-modules/mailer`:
- Revisar `src/mail/mail.service.ts`
- Actualizar métodos si es necesario
- Verificar configuración del módulo

---

## ✅ Fase 5: Pruebas (30 min)

### 5.1 Pruebas de compilación
```bash
npm run build
```

### 5.2 Pruebas unitarias
```bash
npm run test
```

### 5.3 Pruebas de linting
```bash
npm run lint
```

### 5.4 Pruebas de ejecución
```bash
npm run start:dev
```

**Verificar:**
- ✅ La aplicación inicia correctamente
- ✅ Swagger funciona en `/api/docs`
- ✅ Endpoints de autenticación funcionan
- ✅ Envío de emails funciona
- ✅ Rate limiting funciona
- ✅ Validación de origen funciona

### 5.5 Pruebas manuales
- [ ] Login funciona
- [ ] Registro funciona
- [ ] Reset password funciona
- [ ] Confirmación de cuenta funciona
- [ ] Envío de emails funciona
- [ ] Swagger UI se muestra correctamente
- [ ] Rate limiting bloquea requests excesivas

---

## 🔒 Fase 6: Verificación de Seguridad (15 min)

### 6.1 Verificar vulnerabilidades
```bash
npm audit
```

**Objetivo:** Reducir vulnerabilidades de 44 a < 5

### 6.2 Verificar versiones instaladas
```bash
npm list @nestjs/common @nestjs/core @nestjs/swagger @nestjs-modules/mailer nodemailer
```

**Verificar:**
- ✅ @nestjs/common: ^11.1.9
- ✅ @nestjs/core: ^11.1.9
- ✅ @nestjs/swagger: ^11.2.3
- ✅ @nestjs-modules/mailer: ^2.0.2
- ✅ nodemailer: ^7.0.11

---

## 📝 Fase 7: Documentación y Commit (15 min)

### 7.1 Actualizar package.json
- Verificar que todas las versiones están correctas
- Revisar que no hay conflictos

### 7.2 Commit de cambios
```bash
git add .
git commit -m "feat: migrate to NestJS 11

- Update @nestjs/core, @nestjs/common to v11.1.9
- Update @nestjs/swagger to v11.2.3
- Update @nestjs-modules/mailer to v2.0.2
- Update @nestjs/throttler to v7.0.0
- Update nodemailer to v7.0.11
- Fix breaking changes in Swagger decorators
- Fix breaking changes in Throttler configuration
- Fix breaking changes in Mailer service
- Resolve security vulnerabilities (44 → <5)

BREAKING CHANGE: Migrated from NestJS 10 to NestJS 11"
```

### 7.3 Push
```bash
git push origin feature/migrate-nestjs-11
```

---

## 🚨 Problemas Comunes y Soluciones

### Problema 1: Errores de compilación en decoradores de Swagger
**Solución:**
- Revisar documentación de @nestjs/swagger v11
- Actualizar decoradores según nueva API
- Verificar imports de `@nestjs/swagger`

### Problema 2: ThrottlerModule no funciona
**Solución:**
- Revisar documentación de @nestjs/throttler v7
- Verificar configuración en `app.module.ts`
- Actualizar `CustomThrottlerGuard` si es necesario

### Problema 3: MailerService no funciona
**Solución:**
- Revisar documentación de @nestjs-modules/mailer v2
- Verificar configuración del módulo
- Actualizar métodos del servicio

### Problema 4: Errores de tipos en TypeScript
**Solución:**
- Actualizar `@types/node` si es necesario
- Verificar versiones de TypeScript
- Limpiar cache: `rm -rf node_modules .nest`

### Problema 5: Tests fallan
**Solución:**
- Actualizar mocks si es necesario
- Verificar imports en tests
- Revisar configuración de Jest

---

## 📊 Checklist Final

Antes de hacer merge:

- [ ] ✅ Compilación exitosa (`npm run build`)
- [ ] ✅ Tests pasan (`npm run test`)
- [ ] ✅ Linting pasa (`npm run lint`)
- [ ] ✅ Aplicación inicia (`npm run start:dev`)
- [ ] ✅ Swagger funciona (`/api/docs`)
- [ ] ✅ Endpoints principales funcionan
- [ ] ✅ Emails se envían correctamente
- [ ] ✅ Rate limiting funciona
- [ ] ✅ Vulnerabilidades resueltas (`npm audit`)
- [ ] ✅ Código revisado y documentado
- [ ] ✅ Commit realizado
- [ ] ✅ Push realizado

---

## 📚 Recursos

- [NestJS Migration Guide](https://docs.nestjs.com/migration-guide)
- [@nestjs/swagger v11 Docs](https://docs.nestjs.com/openapi/introduction)
- [@nestjs/throttler v7 Docs](https://github.com/nestjs/throttler)
- [@nestjs-modules/mailer v2 Docs](https://github.com/notiz-dev/nestjs-mailer)
- [nodemailer v7 Changelog](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md)

---

## ⏱️ Tiempo Estimado Total

- **Preparación:** 15 min
- **Actualización:** 30 min
- **Verificación:** 45 min
- **Correcciones:** 60 min
- **Pruebas:** 30 min
- **Seguridad:** 15 min
- **Documentación:** 15 min

**Total: ~3.5 horas**

---

## 🎯 Resultado Esperado

- ✅ Proyecto migrado a NestJS 11
- ✅ Vulnerabilidades de seguridad resueltas (44 → <5)
- ✅ Todas las funcionalidades funcionando
- ✅ Código actualizado y documentado
- ✅ Tests pasando
- ✅ Listo para producción

