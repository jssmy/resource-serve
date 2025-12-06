#!/bin/bash

# Script de ayuda para migración de NestJS 10 a NestJS 11
# Uso: ./migrate-nestjs-11.sh [fase]
# Fases: prep, update, verify, test, audit

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

echo_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

echo_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_node_version() {
    echo_info "Verificando versión de Node.js..."
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 20 ]; then
        echo_error "Node.js v20 o superior es requerido para NestJS 11"
        exit 1
    fi
    echo_info "Node.js versión: $(node --version) ✓"
}

phase_prep() {
    echo_info "=== FASE 1: Preparación ==="
    
    # Verificar que estamos en un branch limpio
    if ! git diff-index --quiet HEAD --; then
        echo_warn "Hay cambios sin commitear. ¿Deseas continuar? (y/n)"
        read -r response
        if [ "$response" != "y" ]; then
            exit 1
        fi
    fi
    
    # Crear branch si no existe
    CURRENT_BRANCH=$(git branch --show-current)
    if [ "$CURRENT_BRANCH" != "feature/migrate-nestjs-11" ]; then
        echo_info "Creando branch feature/migrate-nestjs-11..."
        git checkout -b feature/migrate-nestjs-11
    fi
    
    # Backup de package.json
    if [ ! -f "package.json.backup" ]; then
        echo_info "Creando backup de package.json..."
        cp package.json package.json.backup
    fi
    
    # Limpiar dependencias
    echo_info "Limpiando node_modules y package-lock.json..."
    rm -rf node_modules package-lock.json
    
    echo_info "Preparación completada ✓"
}

phase_update() {
    echo_info "=== FASE 2: Actualización de Dependencias ==="
    
    check_node_version
    
    # Instalar dependencias base
    echo_info "Instalando dependencias base..."
    npm install
    
    # Actualizar nodemailer primero
    echo_info "Actualizando nodemailer a v7.0.11..."
    npm install nodemailer@^7.0.11
    
    # Actualizar paquetes core de NestJS
    echo_info "Actualizando paquetes core de NestJS a v11..."
    npm install @nestjs/common@^11.1.9 \
                @nestjs/core@^11.1.9 \
                @nestjs/platform-express@^11.0.0 \
                @nestjs/config@^3.1.1 \
                @nestjs/jwt@^11.0.0 \
                @nestjs/passport@^11.0.0 \
                @nestjs/typeorm@^11.0.0 \
                @nestjs/throttler@^7.0.0
    
    # Actualizar Swagger
    echo_info "Actualizando @nestjs/swagger a v11.2.3..."
    npm install @nestjs/swagger@^11.2.3
    
    # Actualizar Mailer
    echo_info "Actualizando @nestjs-modules/mailer a v2.0.2..."
    npm install @nestjs-modules/mailer@^2.0.2
    
    # Actualizar devDependencies
    echo_info "Actualizando devDependencies..."
    npm install --save-dev @nestjs/cli@^11.0.14 \
                           @nestjs/schematics@^11.0.0 \
                           @nestjs/testing@^11.0.0
    
    # Actualizar mapped-types
    echo_info "Actualizando @nestjs/mapped-types..."
    npm install @nestjs/mapped-types@^2.0.0
    
    echo_info "Actualización de dependencias completada ✓"
}

phase_verify() {
    echo_info "=== FASE 3: Verificación ==="
    
    # Verificar versiones instaladas
    echo_info "Verificando versiones instaladas..."
    npm list @nestjs/common @nestjs/core @nestjs/swagger @nestjs-modules/mailer nodemailer --depth=0
    
    # Intentar compilar
    echo_info "Intentando compilar..."
    if npm run build; then
        echo_info "Compilación exitosa ✓"
    else
        echo_error "Error en compilación. Revisa los errores arriba."
        exit 1
    fi
}

phase_test() {
    echo_info "=== FASE 4: Pruebas ==="
    
    # Linting
    echo_info "Ejecutando linting..."
    if npm run lint; then
        echo_info "Linting pasado ✓"
    else
        echo_warn "Hay errores de linting. Revisa y corrige."
    fi
    
    # Tests
    echo_info "Ejecutando tests..."
    if npm run test; then
        echo_info "Tests pasados ✓"
    else
        echo_warn "Algunos tests fallaron. Revisa y corrige."
    fi
}

phase_audit() {
    echo_info "=== FASE 5: Auditoría de Seguridad ==="
    
    echo_info "Ejecutando npm audit..."
    npm audit
    
    VULN_COUNT=$(npm audit --json | jq '.metadata.vulnerabilities.total // 0')
    echo_info "Vulnerabilidades encontradas: $VULN_COUNT"
    
    if [ "$VULN_COUNT" -lt 5 ]; then
        echo_info "✓ Vulnerabilidades bajo control"
    else
        echo_warn "Aún hay vulnerabilidades. Considera ejecutar 'npm audit fix'"
    fi
}

# Main
case "${1:-all}" in
    prep)
        phase_prep
        ;;
    update)
        phase_update
        ;;
    verify)
        phase_verify
        ;;
    test)
        phase_test
        ;;
    audit)
        phase_audit
        ;;
    all)
        phase_prep
        phase_update
        phase_verify
        phase_test
        phase_audit
        echo_info "=== Migración completada ==="
        echo_info "Revisa MIGRATION_PLAN.md para los siguientes pasos"
        ;;
    *)
        echo "Uso: $0 [prep|update|verify|test|audit|all]"
        exit 1
        ;;
esac

