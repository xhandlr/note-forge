FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --chown=node:node . .

USER node

EXPOSE 5173

CMD ["npm", "run", "dev"]