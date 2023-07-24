docker run \
  --name golang-graphql \
  -p 8080:8080 \
  -it \
  -w /go/src/golang-graphql\
  -v "/home/kelp/dev/estudos/Studies-Full-Cycle/003 - Comunicação entre Sistemas/04 - GraphQL/golang-graphql":/go/src/golang-graphql \
  golang:1.21rc3 \
  bash
