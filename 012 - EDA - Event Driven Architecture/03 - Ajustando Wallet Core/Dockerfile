FROM golang:1.21.3

WORKDIR /go/src/wallet-core

RUN apt-get update && apt-get install -y librdkafka-dev

COPY . .

RUN go mod tidy

CMD ["tail", "-f", "/dev/null"]
