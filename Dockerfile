#FROM node:18-alpine AS build
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build

FROM nginx:alpine

# Copia los archivos construidos de Angular al directorio de Nginx
COPY ./dist/supermaintenance-ui /usr/share/nginx/html

# Copia el archivo nginx.conf personalizado
COPY nginx.conf /etc/nginx/nginx.conf

# Instala Node.js y json-server
RUN apk add --no-cache nodejs npm && \
    npm install -g json-server

COPY db.json /db.json

# Copia y da permisos de ejecución al script de inicio
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]