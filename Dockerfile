# Etapa de construcción para el frontend (React)
FROM node:latest AS frontend-builder

WORKDIR /app/frontend

# Copiar el package.json y package-lock.json e instalar las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto de los archivos del frontend
COPY . .

# Construir la aplicación React
RUN npm run build

# Etapa de producción
FROM node:latest AS production

WORKDIR /app

# Copiar el artefacto de construcción del frontend
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Instalar las dependencias del backend
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm install

# Copiar el código del backend
COPY backend ./backend

# Puerto en el que se ejecutará el servidor backend (ajusta según sea necesario)
EXPOSE 3001

# Comando para iniciar el servidor backend
CMD ["node", "backend/server.js"]
