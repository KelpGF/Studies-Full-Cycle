# Conceitos Básicos

## Usuários e Senhas

### Usuários já cadastrados em outro DB

Para ser possível utilizar o Keycloak para autenticação, é necessário que todos os usuários estejam na base de dados dele.

Em caso de empresa que não utilizam o Keycloak, terá que ser feita uma migração.

Nessa migração devemos tomar cuidado com as senhas dos usuários, que geralmente temos alguma política de proteção.

Também devemos pensar em quais dados queremos manter no Keycloak e quais dados vamos manter no nosso banco.
As vezes é melhor manter no nosso banco apenas informações mais personalizadas para não poluir o Keycloak,
ou mandar pro Keycloak apenas o mínimo necessário para ser possível utilizá-lo

### Validação de usuários

Ao criar um usuário podemos adicionar algumas validações para que ele consiga entrar na plataforma, como alterar a senha e validar o email

Para validar o email precisamos adicionar as configurações do nosso provedor de email, isso fazer nas configurações do reino

Quando criamos uma senha para um usuário, além de forçar ele a trocar, podemos marcar essa senha como temporária, fazendo com que seja forçado a troca sua senha.

### Permitindo acesso superuser

Por padrão, os novos usuários possuem apenas um role default "default-roles-master" que tem a permissão somente de poder gerenciar a própria conta.

Para poderem ter acesso de admin, é necessário atribuir ao user a role "admin". Isso permite que o user tenha acesso total a todos os Realms.

## Realms

Realm (reino) foi criado para habilitar um suporte multi-tenancy, podendo assim autenticar várias empresas de maneira organizada e agrupada por realms.

Podemos atribuir aos users algumas roles já existentes devido as clients, como a "realm-admin" que permite acesso total somente ao reino.

## Roles e Grupos

### Realm Roles

São as roles do reino, por padrão o Keycloak já cria algumas roles quando o reino é criado.

- default-roles-${realm-name}: role composta por outras roles que são as duas abaixo e roles para gerenciar seu próprio perfil.
- offline_access: permite os clients obterem um Offline token em vez do Refresh token, sendo que esse Offline não expira e pode ser usado para gerar novos access tokens. Também permite que sejam feitas ações quando o usuário estiver "offline"
- uma_authorization: User Manager Access, permite conceder ou remover acesso dos clients conectados a conta

As Realm Roles são usadas para roles mais personalizadas do realm

### Grupos

Com os grupos podemos adicionar vários users ao mesmo e definir quais são as roles do grupo. Todas as roles do grupo serão refletidas ao seus membros.

Podemos pensar nos grupos como ACL (Access Control List)

## Internacionalização

O Keycloak já possui um suporte a várias linguas sendo configurável por Realm. Podemos adicionar várias linguas a um Realm e definir uma padrão

O usuário pode selecionar a lingua no login ou na sua aba de informações pessoais

Em alguns pontos vemos um padrão ${client_account}. Isso é como se fosse uma variável que o Keycloak suporta para realizar a tradução por lingua.

Por exemplo, podemos cadastrar uma ${tomato} com o seu valor em pt-BR sendo Tomate. E assim podemos usar em todos os locais essa var que ele vai trocar o valor

## Clients

Lembrando do OAuth2, client é quem acessa os recurso no Resource Server em nome do usuário.

Sempre que alguma aplicação quiser utilizar os recursos de autenticação do Keycloak isso deve ser feito via Client.

Temos 3 Clients que já vêm no Keycloak que são aplicações visuais: account, account-console e security-admin-console.
E eles utilizam os outros clients que já existem também para poder acessar os recursos internos do Keycloak.

Podemos realizar várias configurações no Clients, como suas roles, os escopos, sessões ativas, etc.
