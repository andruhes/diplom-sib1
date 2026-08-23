FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем исходники и собираем сайт
COPY . .
RUN npm run build

# Второй этап: nginx для отдачи статики
FROM nginx:alpine

# Копируем собранный сайт из builder
COPY --from=builder /app/_site /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
