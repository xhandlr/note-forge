FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

RUN chown -R node:node /app
USER node

EXPOSE 5000

CMD ["sh", "-c", "./wait-for-it.sh db:3306 --timeout=30 -- npm start"]