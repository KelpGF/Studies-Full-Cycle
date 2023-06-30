FROM node:16

WORKDIR /app

COPY ./src ./src
COPY ./package.json .

RUN npm i

CMD ["node", "src/server.js"]
