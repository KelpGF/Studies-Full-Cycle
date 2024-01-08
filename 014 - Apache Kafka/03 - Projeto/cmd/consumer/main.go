package main

import (
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log"
)

func main() {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "03projeto-kafka-1:9092",
		"client.id":         "goapp3-consumer",
		"group.id":          "goapp-group",
		// "auto.offset.reset": "earliest",
	}

	c, err := kafka.NewConsumer(configMap)
	if err != nil {
		log.Println(err.Error())
	}

	topics := []string{"teste"}
	c.SubscribeTopics(topics, nil)

	for {
		msg, err := c.ReadMessage(-1)

		if err == nil {
			log.Println(string(msg.Value), msg.TopicPartition)
		}
	}
}
