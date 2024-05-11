FROM node:16

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN chown -R node:node /app

USER node

ENTRYPOINT [ "tail", "-f", "/dev/null" ]