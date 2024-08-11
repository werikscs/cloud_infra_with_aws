## Requisitos:

- Certifique-se de ter [Docker](https://docs.docker.com/desktop/) e [Docker Compose](https://docs.docker.com/compose/) instalados na sua máquina.
- Certifique-se de ter a extensão [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) instalada no VS Code.

## Sobre o projeto:

Este projeto é uma API RESTful desenvolvida com Node.js, Express e Prisma ORM. O banco de dados utilizado é o PostgreSQL.

### Recursos:

#### Desenvolvimento:

- API RESTful no endereço `http://localhost:3010`.
- Banco de dados PostgreSQL no endereço `http://localhost:5432`.
- Prisma Studio no endereço `http://localhost:5555`.

#### Produção:

- API RESTful no endereço `http://localhost:3000`.
- Banco de dados PostgreSQL no endereço `http://localhost:5432`.

### Como iniciar o projeto:

1. Clone o repositório.
2. Abra o projeto no VS Code.
3. Inicie o projeto com a extensão Dev Containers.
4. Após a inicialização do Dev Containers, abra o terminal no Dev Containers e instale as dependências do projeto com o comando `npm install`.

### Modo de Desenvolvimento:

1. No terminal do Dev Containers, execute o comando `npm run watch:local`, e em seguida, em um terminal fora do Dev Containers, mas ainda na raiz do projeto, execute o comando `docker compose -f docker-compose.dev.yaml up --build --watch`.

   O primeiro comando irá **resetar** o conteúdo do banco de desenvolvimento e aplicará as migrations da pasta **prisma**. Então comecará a monitorar as mudanças na pasta **src** e rebuildar o projeto na pasta **build**.

   O segundo comando irá monitorar as mudanças na pasta **build** e sincronizará as mudanças na pasta **/app/build** do container.

   Para parar o container, execute o comando `docker compose -f docker-compose.dev.yaml down`.

2. Acesse o server no endereço `http://localhost:3010`, e utilize o arquivo **routes.http**, na pasta **rest-client**, para testar as rotas da API. Atribua o valor **3010** à variavel **@PORT** para que o rest-client funcione corretamente.
3. Acesse o Prisma Studio, para vizualizar e manipular os dados do banco de dados, no endereço `http://localhost:5555`.

OBS.: Para refletir as mudanças no arquivo prisma/schema.prisma para o container, é necessário executar o comando `npx prisma migrate dev` no terminal do Dev Containers.

### Modo de Produção:

1. Em um terminal fora do Dev Containers, mas ainda na raiz do projeto, execute o comando `docker compose -f docker-compose.yaml up -d`. Este comando irá criar uma imagem Docker com o projeto e iniciar o container.

   Para parar o container, execute o comando `docker compose -f docker-compose.yaml down`.

2. Acesse o server em `http://localhost:3000`, e utilize o arquivo **routes.http**, na pasta **rest-client**, para testar as rotas da API. Atribua o valor **3000** à variavel **@PORT** para que o rest-client funcione corretamente.
