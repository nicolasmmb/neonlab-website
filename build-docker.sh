#!/bin/bash

# Script de build local do Docker
# Uso: ./build-docker.sh

set -e

echo "🔨 Building Docker image..."

# Carregar variáveis do .env.local (opcional)
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

# Build da imagem
docker build \
  --build-arg WEBHOOK_URL="${WEBHOOK_URL:-}" \
  -t neonlab-website:latest \
  .

echo "✅ Docker image built successfully!"
echo ""
echo "To run the container:"
echo "docker run -p 3000:3000 neonlab-website:latest"
