FROM node:alpine

WORKDIR /usr/src/app

COPY discord-bot/package*.json ./

RUN npm install

COPY discord-bot/ . 
COPY discord-bot/src/.env ./

CMD ["node", "./src/index.js"]
