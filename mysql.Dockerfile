# Usa la imagen oficial de MySQL como base
ARG MYSQL_VERSION=8.0
FROM mysql:${MYSQL_VERSION}


# Define los argumentos que se pasarán en el momento de la construcción
#ARG MYSQL_ROOT_PASSWORD
#ARG MYSQL_DATABASE
#ARG MYSQL_USER
#ARG MYSQL_PASSWORD

# Establece las variables de entorno usando los argumentos
#ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD    
#ENV MYSQL_DATABASE=$MYSQL_DATABASE
#ENV MYSQL_USER=$MYSQL_USER
#ENV MYSQL_PASSWORD=$MYSQL_PASSWORD

# Exponer el puerto 3306
EXPOSE 3306
