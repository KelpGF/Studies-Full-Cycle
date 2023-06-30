# Full Cycle - NodeJS + NGINX Challenge

## Desafio

### 🐋 DockerHub das Images

[Imagem NGINX](https://hub.docker.com/r/928369/nodejs-challenge-proxy)
[Imagem NodeJS](https://hub.docker.com/r/928369/nodejs-challenge-api)

### Run

```sh
docker compose up -d --build && sleep 10 && docker exec nodejs-challenge-db sh /scripts/migrations.sh
```
