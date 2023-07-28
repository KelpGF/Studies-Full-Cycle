package main

import (
	"database/sql"
	"net"
	"log"

	"golang-grpc/internal/database"
	"golang-grpc/internal/pb"
	"golang-grpc/internal/service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "./database.db")
	if err != nil {
		log.Fatal("Failed to open database: %v", err)
	}
	defer db.Close()

	categoryDB := database.NewCategory(db)
	categoryService := service.NewCategoryService(*categoryDB)
	
	grpcServer := grpc.NewServer()
	pb.RegisterCategoryServiceServer(grpcServer, categoryService)
	reflection.Register(grpcServer)

	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatal("Failed to listen port: %v", err)
	}

	err = grpcServer.Serve(listener)
	if err != nil {
		log.Fatal("Failed to serve gRPC server: %v", err)
	}
}