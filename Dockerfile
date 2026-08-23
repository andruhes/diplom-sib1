FROM node:16 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Собираем сайт без ленивой загрузки
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/_site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
