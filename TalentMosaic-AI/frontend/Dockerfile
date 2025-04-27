# Usa una imagen oficial de Node
FROM node:20

# Crea un directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json primero
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto en el que correrá el servidor de desarrollo
EXPOSE 3000

# Comando por defecto
CMD ["npm", "run", "dev"]
