# Conceitos Básicos

## Usuários e Senhas

### Usuários já cadastrados em outro DB

Para ser possível utilizar o Keycloak para autenticação, é necessário que todos os usuários estejam na base de dados dele.

Em caso de empresa que não utilizam o Keycloak, terá que ser feita uma migração.

Nessa migração devemos tomar cuidado com as senhas dos usuários, que geralmente temos alguma política de proteção.

Também devemos pensar em quais dados queremos manter no Keycloak e quais dados vamos manter no nosso banco.
As vezes é melhor manter no nosso banco apenas informações mais personalizadas para não poluir o Keycloak,
ou mandar pro Keycloak apenas o mínimo necessário para ser possível utilizá-lo

## Validação de usuários

Ao criar um usuário podemos adicionar algumas validações para que ele consiga entrar na plataforma, como alterar a senha e validar o email

Para validar o email precisamos adicionar as configurações do nosso provedor de email, isso fazer nas configurações do reino

Quando criamos uma senha para um usuário, além de forçar ele a trocar, podemos marcar essa senha como temporária, fazendo com que seja forçado a troca sua senha.
