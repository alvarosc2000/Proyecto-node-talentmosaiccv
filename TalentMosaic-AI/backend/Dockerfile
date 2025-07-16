# Usamos la imagen oficial de Node.js
FROM node:18-alpine

# Instalar bash y herramientas de desarrollo (si necesitas)
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json antes de instalar dependencias
COPY package.json package-lock.json ./ 

# Instalar dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Compilar TypeScript a JavaScript (si es necesario)
# RUN npm run build

# Exponer el puerto de la API
EXPOSE 5000

# Iniciar la aplicación
# CMD ["npm", "run", "start"]
CMD ["npx", "tsx", "src/app.ts"]
