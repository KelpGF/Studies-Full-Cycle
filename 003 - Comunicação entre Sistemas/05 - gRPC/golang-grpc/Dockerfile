FROM golang:1.21rc3

WORKDIR /go/src/golang-grpc

COPY . .

# RUN apt-get update && \
#     apt-get install -y protobuf-compiler  && \
#     go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28 && \
#     go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2 && \
#     protoc --go_out=. --go-grpc_out=. proto/course_category.proto

# Evans - gRPC client: https://github.com/ktr0731/evans
RUN go install github.com/ktr0731/evans@latest

RUN go mod tidy

EXPOSE 50051

ENTRYPOINT [ "go", "run", "cmd/grpcServer/main.go" ]
