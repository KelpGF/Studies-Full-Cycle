# Observabilidade

Hoje em dia, com a complexidade dos sistemas, é necessário ter uma visão mais ampla do que está acontecendo em nossas aplicações. A observabilidade é uma prática que nos ajuda a entender o que está acontecendo em nossos sistemas, permitindo que possamos identificar problemas e corrigi-los de forma mais rápida.

"A simple way of describing observability is how well you can understand the system from the output. In control theory, observability is defined as how engineers can infer the internal states of a system from knowledge of that system's external outputs."
[New Relic](https://newrelic.com/blog/best-practices/what-is-observability)

## Observabilidade x Monitoramento

Observabilidade e monitoramento são práticas que se complementam, mas que possuem objetivos diferentes. O monitoramento é uma prática que nos ajuda a entender o que está acontecendo em nossos sistemas, permitindo que possamos identificar problemas e corrigi-los de forma mais rápida. Já a observabilidade é uma prática que nos ajuda a entender o que está acontecendo em nossos sistemas, permitindo que possamos identificar problemas e corrigi-los de forma mais rápida.

**Monitoramento:**

- Monitoramento nos mostra que há um problema.
- Monitoramento se baseia em saber com antecedência quais sinais desejamos monitorar. Exemplo: CPU, memória, disco, etc.

**Observabilidade:**

- Observabilidade nos ajuda a entender o porquê de um problema. Nos permite a perguntar o porquê de um problema e encontrar a resposta.

## Os 3 pilares da Observabilidade

### Métricas

Métricas são valores quantitativos que nos ajudam a entender o comportamento de um sistema. Elas são úteis para entender o estado atual do sistema e para identificar tendências.

De forma direta, métrica é número que representa alguma coisa.

Exemplos de métricas técnicas:

- Número de requisições por segundo
- Tempo médio de resposta
- Número de erros
- Uso de CPU
- Quantidade de réplicas de um serviço

Exemplos de métricas de negócio:

- Número de vendas
- Número de usuários ativos
- Quantidade de trials no mês

São valores de extrema importância pois guiam a tomada de decisão a nível de infraestrutura e de negócio.

### Logs

Logs são registros contento o resultado de eventos que aconteceram em um software. Eles são úteis para entender o comportamento de um sistema e para identificar problemas.

Normalmente em formato texto, mas tendo uma padrão comum.

### Rastreamento (Tracing)

Rastreamento é a capacidade de seguir o fluxo de uma requisição através de um sistema distribuído. Ele é útil para identificar gargalos e pontos de falha em um determinado fluxo que percorre vários serviços.

Supondo que ocorreu um erro em serviço X, mas outros serviços chamam esse mesmo, como saber de onde veio a requisição que causou o erro?

Outro exemplo seria uma requisição foi iniciada mas nunca finalizada, como saber onde ela parou?
