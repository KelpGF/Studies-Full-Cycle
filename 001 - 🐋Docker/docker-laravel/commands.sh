# !/bin/bash

docker build -t kelv/laravel -f ./project/Dockerfile.prod ./project && \

docker build -t kelv/nginx -f ./proxy/Dockerfile.prod ./proxy && \

docker network create lara-net && \

docker run -d --network lara-net --name laravel kelv/laravel && \

docker run -d --network lara-net --name nginx -p 8080:80 kelv/nginx
