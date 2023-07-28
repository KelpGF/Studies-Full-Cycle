docker run \     
  --rm \
  --name golang-grpc \
  -p 8080:8080 \
  -it \
  -w /go/src/golang-grpc \
  -v "/home/kelp/dev/estudos/Studies-Full-Cycle/003 - Comunicação entre Sistemas/05 - gRPC/golang-grpc":/go/src/golang-grpc \
  golang:1.21rc3 \
  bash