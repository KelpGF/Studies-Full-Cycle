# Confiabilidade

## Dúvidas persistentes

Este é um ponto muito importante, pois perder uma pequena informação pode custar bem caro mais pra frente. Por conta disso temos dúvidas como: Como garantir que as mensagens não serão perdidas no meio do caminho? Como garantir que as mensagens puderam ser processadas corretamente pelos consumidores?

O RabbitMQ tem alguns recursos pensados para resolver tais situações

- Consumer acknowledgement
- Publisher confirms
- Filas e mensagens duráveis / persistidas.

## Consumer acknowledgement

O Consumidor informa se conseguiu ou não processar a mensagem.

### Basic.Ack

Resposta positiva de que conseguiu processar a mensagem e a mesma será removida da fila

### Basic.Reject

Resposta negativa de que não foi possível processar a mensagem e a mesma permanecerá na fila

### Basic.Nack

Resposta negativa de que não foi possível processar várias mensagens e a mesmas continuarão na fila

## Publisher confirms

Primeiramente nossa mensagem vai conter um ID que é um número inteiro escolhido por nós.

Ao publicar, o exchange vai retornar o ID da mensagem e nos informar que deu tudo certo: Ack: ID = 1

Mas também ele pode dizer que não deu certo (problema interno na exchange): Nack: ID = 2

## Filas e mensagens duráveis / persistidas

As mensagens e queue são salvas em disco. Isso pode aumentar a segurança mas também tornará tudo mais lento, deve ser usado com cuidado.
