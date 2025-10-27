#!/bin/bash

# Script para rodar o container localmente
# Uso: ./run-docker.sh

set -e

# Carregar variáveis do .env.local (opcional)
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

echo "🚀 Starting Neonlab website container..."

# Parar container existente se houver
docker stop neonlab-website 2>/dev/null || true
docker rm neonlab-website 2>/dev/null || true

# Rodar novo container
docker run -d \
  --name neonlab-website \
  --restart unless-stopped \
  -p 3000:3000 \
  -e WEBHOOK_URL="${WEBHOOK_URL:-}" \
  -e NODE_ENV=production \
  neonlab-website:latest

echo "✅ Container started successfully!"
echo ""
echo "🌐 Application running at: http://localhost:3000"
echo ""
echo "📊 View logs:"
echo "docker logs -f neonlab-website"
