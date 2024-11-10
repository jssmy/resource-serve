#imagen de base 
FROM node:22-alpine3.20 as builder

# establece la direccion de trabajo dentro del contenedor

WORKDIR /app

# copia el archivo packege.json y package-lock.json
COPY package*.json ./

# instala las dependencias de la aplicacion
RUN npm install

# copia el el codigo de la aplicacion dentro del contenedor
COPY . ./

# haces build de la aplicacion
RUN npm run build


# Configura la segunda fase (etapa de producción) para reducir el tamaño de la imagen
FROM node:22-alpine3.20 as production

#establece entorno de trabajo
WORKDIR /app

# Copia solo las dependencias de producción desde la fase de construcción
COPY package*.json ./

#instalamos dependencias
RUN npm install


# Copia la aplicación construida desde la fase anterior
COPY --from=builder /app/dist ./dist


# Establece la variable de entorno para que NestJS use el entorno de producción
ENV NODE_ENV production

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]





