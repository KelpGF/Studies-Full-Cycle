# Fluxos de Autenticação

## Introdução

Fluxos de autenticação é um processo com vários passos utilizados para autenticar algo/alguém.

O Keycloak possui vários fluxos de autenticação e precisamos compreender cada um para entender quando usar cada um.
Não compreender os fluxos pode gerar brechas de segurança que poderiam ser identificadas se tivéssemos total entendimento.

Um API rest em GoLang precisa de um fluxo diferente de uma SPA em ReactJS. Utilizar um fluxo inadequado não permite o uso do single sign on, uma das vantagens de utilizar um provedor de identidade.

## Fluxos de Autenticação - Authorization Code

- Comum e bem aceito pela web
- Bem versátil: pode ser utilizado em API, SPA, mobile, client
- Seguro pois a autenticação ocorre no Keycloak
- Single Sign On

![Fluxos de Autenticação - Authorization Code](authrozation%2520code%2520flow.png)
