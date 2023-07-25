FROM golang:1.21rc3

WORKDIR /go/src/golang-graphql

COPY . .

RUN go mod tidy

EXPOSE 8080

ENTRYPOINT [ "go", "run", "cmd/server/server.go" ]
