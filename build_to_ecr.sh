#!/bin/bash

# Verifica se o parâmetro foi fornecido
if [ -z "$1" ]; then
  echo "Uso: ./build_to_ecr.sh.sh SEU_REGISTRY"
  exit 1
fi

ECR_REGISTRY="$1"

# Executa o login no ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY

# Constrói a imagem Docker
docker build -t crud .

# Marca a imagem com o registro ECR
docker tag crud:latest $ECR_REGISTRY/crud:latest

# Envia a imagem para o registro ECR
docker push $ECR_REGISTRY/crud:latest
