FROM node:16

WORKDIR /app

COPY ./src ./src
COPY ./.docker ./.docker
COPY ./package.json .

ENV DOCKERIZE_VERSION v0.6.1
RUN wget http://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN npm i

EXPOSE 3000

CMD ["node", "src/server.js"]
