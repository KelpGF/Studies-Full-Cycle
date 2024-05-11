# Prometheus na Prática

[Site Oficial](https://prometheus.io/docs/prometheus/latest/getting_started/)

## Interface Padrão

- **Status -> Target**: Mostra o status dos targets que estão sendo monitorados.
- **Status -> Configuration**: Mostra o status da configuração do Prometheus.
- **Graph**: Permite elaborar consultas e visualizar os resultados.

## Cadvisor

Ferramenta que coleta métricas de containers. Ele consegue analisar a utilização dos recursos e performance de containers docker, como CPU, memória, rede e disco.

## Grafana

Ferramenta de visualização de métricas. Permite criar dashboards com diversos tipos de gráficos.

Mas criar dashboards do zero é complicado. Por isso, existem dashboards prontos que podem ser importados no [Site Oficial do Grafana](https://grafana.com/grafana/dashboards/).

### Configurando Alertas

- Criar um Contact Point
- Criar um Notification Police
- Criar Alert Rule

## Adicionando um Target

Para adicionar um target, é necessário editar o arquivo `prometheus.yml` e adicionar o target no campo `static_configs`.

```yml
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
  - job_name: cadvisor
    scrape_interval: 5s
    static_configs:
    - targets:
      - cadvisor:8080
  - job_name: goapp
    scrape_interval: 5s
    static_configs:
    - targets:
      - app:8181
```
