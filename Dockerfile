# 1. Usa una imagen de Node.js como base
FROM node:18

# 2. Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copia los archivos del proyecto
COPY package.json package-lock.json ./

# 4. Instala las dependencias
RUN npm install

# 5. Copia el resto del código fuente
COPY . .

# 6. Expone el puerto en el que corre React (por defecto 3000)
EXPOSE 3003

# 7. Inicia la aplicación con npm start
CMD ["npm", "start"]
