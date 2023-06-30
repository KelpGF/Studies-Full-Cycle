FROM golang:1.19 as builder

WORKDIR /go/src/app

RUN go mod init example/show-full-cycle

COPY ./show-full-cycle.go ./

RUN go build -o show-full-cycle

FROM scratch

COPY --from=builder /go/src/app .

ENTRYPOINT [ "./show-full-cycle" ]
