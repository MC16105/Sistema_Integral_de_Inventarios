# Etapa 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Configuración básica para que React Router funcione
RUN echo 'server { listen 5173; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' | sed 's/\$/\$/g' > /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
