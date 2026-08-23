FROM node:18-alpine AS builder

# Устанавливаем Python и build-зависимости
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Копируем package.json и устанавливаем все зависимости
COPY package*.json ./
RUN npm install

# Копируем исходники и собираем сайт
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/_site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
