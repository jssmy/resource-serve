# ============================================
# Dockerfile para NestJS Application
# ============================================
# Node.js: v25.2.1
# NestJS: v11.1.9
# TypeScript: v5.6.0
# TypeORM: v0.3.28
# MySQL Driver: mysql2
# ============================================

# Imagen de base - Node.js 25.2.1 LTS
FROM node:25.2.1 as builder

# Establece la dirección de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package.json package-lock.json ./

# Instala las dependencias de la aplicación (con --legacy-peer-deps para compatibilidad)
RUN npm install --legacy-peer-deps


# Copia el código de la aplicación dentro del contenedor
COPY . ./

# Construye la aplicación (TypeScript → JavaScript)
RUN npm run build

#RUN npm run seed

# Configura la segunda fase (etapa de producción) para reducir el tamaño de la imagen
FROM node:25.2.1 as production

# Establece entorno de trabajo
WORKDIR /app

# Copia package.json y package-lock.json desde la fase de construcción
COPY --from=builder /app/package*.json ./

# Instala solo dependencias de producción con --legacy-peer-deps
RUN npm install --only=production --legacy-peer-deps


# Copia la aplicación construida desde la fase anterior
COPY --from=builder /app/dist ./dist


# Establece la variable de entorno para que NestJS use el entorno de producción
ENV NODE_ENV production

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]


