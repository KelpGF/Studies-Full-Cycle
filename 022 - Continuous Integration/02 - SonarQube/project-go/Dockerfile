FROM golang:1.19

RUN apt update && \
    apt install vim -y && \
    apt install curl -y

WORKDIR /app

COPY . .

RUN useradd -ms /bin/bash golang && chown -R golang:golang /app

USER golang

ENTRYPOINT [ "tail", "-f", "/dev/null" ]
