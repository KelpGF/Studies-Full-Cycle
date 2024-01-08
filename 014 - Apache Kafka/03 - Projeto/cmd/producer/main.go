package main

import (
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log"
)

func main() {
	deliveryChan := make(chan kafka.Event)
	producer := NewKafkaProducer()

	Publish("transfer", "teste", producer, []byte("transfer2"), deliveryChan)
	go DeliveryReport(deliveryChan)

	producer.Flush(1000)
}

func NewKafkaProducer() *kafka.Producer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "03projeto-kafka-1:9092",
		"delivery.timeout.ms": "0",
		"acks": "all",
		"enable.idempotence": "true",
	}

	p, err := kafka.NewProducer(configMap)
	if err != nil {
		log.Println(err)
	}

	return p
}

func Publish(msg string, topic string, producer *kafka.Producer, key []byte, deliveryChan chan kafka.Event) error {
	message := &kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Value:          []byte(msg),
		Key:            key,
	}

	err := producer.Produce(message, deliveryChan)
	if err != nil {
		return err
	}

	return nil
}

func DeliveryReport(deliveryChan chan kafka.Event) {
	for e := range deliveryChan {
		switch ev := e.(type) {
		case *kafka.Message:
			if ev.TopicPartition.Error != nil {
				log.Println("Erro ao enviar mensagem: ", ev.TopicPartition.Error)
			} else {
				log.Println("Mensagem enviada: ", ev.TopicPartition)
			}
		}
	}
}
