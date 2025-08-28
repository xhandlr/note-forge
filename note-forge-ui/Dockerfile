FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --chown=root:root --chmod=755 . .

USER node

EXPOSE 5173

CMD ["npm", "run", "dev"]