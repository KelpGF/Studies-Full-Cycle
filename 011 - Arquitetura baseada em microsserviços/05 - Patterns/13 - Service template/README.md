# Service template

## Problemática

Quando temos muitos desenvolvedores e times mas não temos nenhuma padrão para criação de software acaba virando uma bagunça, tendo muitos serviços e todos sem um governança definida

## O que é Service template

É o que o nome já diz. É um template, um modelo já pronto para ser utilizado.

Esse modelo já vai estar de acordo com a governança e padrões escolhidos pela time. Alguns dos pontos são:

- Padrões de implementação
- Logs
- Outbox
- Gerenciamento password
- Falo com sistemas de mensageria
- Observabilidade
- CORS
- Múltiplos bancos de dados
- Audit
- Jobs

É um kit de desenvolvimento e a melhor maneira de fazer isso funcionar é ter um SDK e ter um time que vai mantê-lo

## Exemplo

O mercado livre possui um time de plataforma que ajuda os outros devs a ter padrões

Esse time mantêm um SDK chamado Fury, um PaaS, que o dev solicita que quer, exemplo, um software em Java e ele já cria o projeto, o repositório, a implementação de observabilidade, health check, etc.

## Conclusão

Ter esses starter kits agiliza e muito a criação de novos serviços. Muito tempo é perdido pensando nos padrões que serão seguidos, configurações de Dockerfiles/Docker Composes, pipelines, testes...

Tendo tudo isso pronto, os Devs vão precisar se preocupar apenas com a atividade me si. A produtividade irá aumentar e todos os softwares seguiram um padrão
