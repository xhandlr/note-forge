FROM node:22-alpine

WORKDIR /app

# Instalar curl para health checks
RUN apk add --no-cache curl

COPY package*.json ./
RUN npm ci --only=production && npm install

COPY . .

COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

RUN chown -R node:node /app
USER node

EXPOSE 5000

CMD ["sh", "-c", "./wait-for-it.sh db:3306 --timeout=30 -- npm start"]