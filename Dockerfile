FROM node:18 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/supermaintenance-ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf