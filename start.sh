#!/bin/sh

# Inicie a aplicação em background
npm run start:prod &

# Inicie o Prisma Studio em background, definindo a porta e o datasource
npx prisma studio &

# Espere todos os processos terminarem
wait
