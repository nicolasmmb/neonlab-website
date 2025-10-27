# 🚀 Guia Completo de Deploy - Neonlab.dev

## 📦 Arquivos Criados

### Docker
- ✅ `Dockerfile` - Multi-stage build otimizado
- ✅ `.dockerignore` - Arquivos ignorados no build
- ✅ `docker-compose.yml` - Orquestração local
- ✅ `build-docker.sh` - Script de build
- ✅ `run-docker.sh` - Script para rodar

### CI/CD
- ✅ `.github/workflows/deploy.yml` - Pipeline completo
- ✅ `next.config.js` - Configurado para standalone

## 🎯 Opções de Deploy

### 1. **Dockerploy** (Recomendado para você)

#### Passo 1: Preparar o Servidor
```bash
# No seu servidor
sudo apt update
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker $USER
```

#### Passo 2: Configurar GitHub Secrets
No GitHub, vá em: **Settings > Secrets and variables > Actions**

Adicione os seguintes secrets:
```
RESEND_API_KEY          # Sua chave do Resend
SERVER_HOST             # IP do servidor (ex: 123.45.67.89)
SERVER_USER             # Usuário SSH (ex: ubuntu)
SERVER_PORT             # Porta SSH (padrão: 22)
SSH_PRIVATE_KEY         # Chave privada SSH
```

#### Passo 3: Gerar SSH Key
```bash
# No seu computador local
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/neonlab_deploy

# Copiar chave pública para o servidor
ssh-copy-id -i ~/.ssh/neonlab_deploy.pub user@seu-servidor

# Copiar chave privada e adicionar ao GitHub Secret SSH_PRIVATE_KEY
cat ~/.ssh/neonlab_deploy
```

#### Passo 4: Deploy Automático
```bash
# Fazer push para main/master
git add .
git commit -m "Deploy to production"
git push origin main

# O GitHub Actions vai:
# 1. Build e test
# 2. Criar imagem Docker
# 3. Push para GitHub Container Registry
# 4. Deploy no servidor via SSH
```

### 2. **Docker Compose (Deploy Manual)**

#### No Servidor:
```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/neonlab-website.git
cd neonlab-website

# 2. Criar .env
echo "RESEND_API_KEY=sua_chave_aqui" > .env

# 3. Build e run
docker-compose up -d --build

# 4. Ver logs
docker-compose logs -f

# 5. Parar
docker-compose down
```

### 3. **Render / Railway / Fly.io**

#### Render.com:
1. Conecte o repositório GitHub
2. Tipo: **Docker**
3. Adicione variável: `RESEND_API_KEY`
4. Deploy automático

#### Railway.app:
```bash
npm install -g @railway/cli
railway login
railway link
railway up
```

#### Fly.io:
```bash
flyctl launch
flyctl secrets set RESEND_API_KEY=sua_chave
flyctl deploy
```

### 4. **VPS Manual (DigitalOcean, AWS, etc)**

```bash
# SSH no servidor
ssh user@seu-servidor

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Clone e deploy
git clone https://github.com/seu-usuario/neonlab-website.git
cd neonlab-website

# Build
docker build -t neonlab-website:latest .

# Run
docker run -d \
  --name neonlab-website \
  --restart unless-stopped \
  -p 80:3000 \
  -e RESEND_API_KEY=sua_chave \
  neonlab-website:latest
```

## 🔧 Configuração do Nginx (Opcional)

Se quiser usar domínio e HTTPS:

```nginx
# /etc/nginx/sites-available/neonlab.dev
server {
    listen 80;
    server_name neonlab.dev www.neonlab.dev;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ativar SSL com Certbot:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d neonlab.dev -d www.neonlab.dev
```

## 📊 Monitoramento

### Logs Docker:
```bash
# Ver logs em tempo real
docker logs -f neonlab-website

# Últimas 100 linhas
docker logs --tail 100 neonlab-website

# Logs com timestamp
docker logs -t neonlab-website
```

### Health Check:
```bash
# Verificar status
docker ps | grep neonlab-website

# Verificar saúde
curl http://localhost:3000

# Stats de recursos
docker stats neonlab-website
```

## 🔄 Atualizações

### Deploy Manual:
```bash
# No servidor
cd neonlab-website
git pull origin main
docker-compose up -d --build
```

### Deploy Automático (CI/CD):
```bash
# No local
git add .
git commit -m "Update"
git push origin main
# GitHub Actions faz o resto!
```

## 🐛 Troubleshooting

### Container não inicia:
```bash
# Ver logs de erro
docker logs neonlab-website

# Verificar porta em uso
sudo lsof -i :3000

# Recriar container
docker stop neonlab-website
docker rm neonlab-website
docker-compose up -d --build
```

### Build falha:
```bash
# Limpar cache Docker
docker system prune -af
docker volume prune -f

# Build sem cache
docker build --no-cache -t neonlab-website:latest .
```

### Variáveis de ambiente não funcionam:
```bash
# Verificar se variáveis estão setadas
docker exec neonlab-website env | grep RESEND

# Recriar com variáveis corretas
docker stop neonlab-website
docker rm neonlab-website
docker run -d \
  --name neonlab-website \
  -p 3000:3000 \
  -e RESEND_API_KEY=sua_chave_real \
  neonlab-website:latest
```

## 📈 Performance

### Otimizações Aplicadas:
- ✅ Multi-stage Docker build (imagem mínima)
- ✅ Next.js standalone output
- ✅ Production mode
- ✅ Cache otimizado
- ✅ Healthcheck configurado

### Tamanho da Imagem:
```bash
# Verificar tamanho
docker images | grep neonlab-website

# Esperado: ~150-200MB (muito otimizado!)
```

## 🔒 Segurança

### Checklist:
- ✅ User não-root no container
- ✅ Variáveis em secrets
- ✅ .env.local no .gitignore
- ✅ HTTPS no nginx
- ✅ Healthcheck ativo

### Firewall:
```bash
# UFW (Ubuntu)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

## 🚀 Quick Start (Resumo)

### Local:
```bash
# Build
./build-docker.sh

# Run
./run-docker.sh

# Acesse: http://localhost:3000
```

### Produção (GitHub Actions):
```bash
git add .
git commit -m "Deploy"
git push origin main
# Automático! ✨
```

## 📞 Suporte

### Links Úteis:
- Docker Docs: https://docs.docker.com
- Next.js Deploy: https://nextjs.org/docs/deployment
- GitHub Actions: https://docs.github.com/en/actions

### Comandos Úteis:
```bash
# Status de tudo
docker ps -a

# Limpar tudo
docker system prune -af

# Restart container
docker restart neonlab-website

# Shell no container
docker exec -it neonlab-website sh
```

---

## ✅ Checklist Final

- [ ] Docker instalado
- [ ] Variáveis de ambiente configuradas
- [ ] GitHub Secrets adicionados
- [ ] SSH keys configuradas
- [ ] Nginx instalado (opcional)
- [ ] SSL configurado (opcional)
- [ ] Primeiro deploy testado
- [ ] Logs verificados
- [ ] Health check funcionando
- [ ] Domínio apontando (se aplicável)

**Status:** 🚀 Pronto para deploy em produção!
