# Usamos la imagen oficial de Node.js
FROM node:18-alpine

# Instalar bash
RUN apk add --no-cache bash

# Copiar el script wait-for-it.sh al contenedor
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json antes de instalar dependencias
COPY package.json package-lock.json ./ 

# Instalar dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Exponer el puerto de la API
EXPOSE 5000

# Usar bash para ejecutar wait-for-it.sh
CMD ["bash", "./wait-for-it.sh", "db:5432", "--", "npm", "run", "start"]
