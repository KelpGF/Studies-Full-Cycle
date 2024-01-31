# Fluxos de Autenticação

## Introdução

Fluxos de autenticação é um processo com vários passos utilizados para autenticar algo/alguém.

O Keycloak possui vários fluxos de autenticação e precisamos compreender cada um para entender quando usar cada um.
Não compreender os fluxos pode gerar brechas de segurança que poderiam ser identificadas se tivéssemos total entendimento.

Um API rest em GoLang precisa de um fluxo diferente de uma SPA em ReactJS. Utilizar um fluxo inadequado não permite o uso do single sign on, uma das vantagens de utilizar um provedor de identidade.

## Fluxos de Autenticação - Authorization Code

### Características

- Comum e bem aceito pela web
- Bem versátil: pode ser utilizado em API, SPA, mobile, client
- Seguro pois a autenticação ocorre no Keycloak
- Single Sign On

![Fluxos de Autenticação - Authorization Code](authrozation%2520code%2520flow.png)

### Segurança

Quando implementamos algum tipo de Autenticação/Autorização devemos ter noção da vulnerabilidades que esse método possui.

É necessário se aprofundar um pouco para ter noção dos perigos que sua aplicação pode estar correndo.

### Ataques de Rede - Replay Attack

Vimos que o fluxo de login é: user -> acessa o sistema -> manda para o keycloak -> informa os dados para o keycloak -> redireciona para um rota retornando junto o auth code.

#### Problemática

Esse último passo, temo o seguinte código:

```ts
app.get('/callback', async (req, res) => {
  const body = {
    client_id: 'realm-client',
    grant_type: 'authorization_code',
    code: req.query.code as string,
    redirect_uri: 'http://localhost:3000/callback',
  }

  const url = 'http://host.docker.internal:8080/realms/Realm/protocol/openid-connect/token';

  const result = await fetch(url, {
    method: 'POST',
    body: new URLSearchParams(body),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((response) => response.json());

  res.send(result);
})
```

Esse code esta sujeito a um reply attack. Esse tipo ataque ocorre quando o atacante possui acesso sua rede e consegue capturar a chamada de callback. Da forma que foi escrito o código, o atacante pode realizar a chamada de callback novamente e gerar novos tokens, provendo acesso indevido para ele.

#### Solução - Nonce

Nonce significa "number used once". Essa estratégia se baseia em gerar um valor, salvá-lo quando o login for chamado e informar para o provedor identidade. Assim, os tokens serão criados com esse valor e na rota callback será feita a validação desse nonce.
