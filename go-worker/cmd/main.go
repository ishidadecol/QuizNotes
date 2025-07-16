package main

import (
	"log"

	"github.com/ishidadecol/go-worker/internal/consumer"
)

func main() {
	log.Println("🟢 Go Worker starting up...")

	err := consumer.StartConsumer()
	if err != nil {
		log.Fatalf("Failed to start consumer: %v", err)
	}
}
