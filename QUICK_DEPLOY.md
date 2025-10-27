# 🚀 Deploy Rápido - Neonlab.dev

## ⚡ Setup Inicial (Uma vez)

### 1. Instalar Docker no Servidor
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### 2. Gerar SSH Key
```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/neonlab_deploy
ssh-copy-id -i ~/.ssh/neonlab_deploy.pub user@seu-servidor
```

### 3. Configurar GitHub Secrets
```
Settings > Secrets > Actions > New repository secret

RESEND_API_KEY = re_sua_chave
SERVER_HOST = 123.45.67.89
SERVER_USER = ubuntu
SERVER_PORT = 22
SSH_PRIVATE_KEY = (conteúdo do ~/.ssh/neonlab_deploy)
```

## 🎯 Deploy Automático

```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

Pronto! GitHub Actions faz tudo automaticamente! ✨

## 🔧 Comandos Úteis

### No Servidor:
```bash
# Ver logs
docker logs -f neonlab-website

# Restart
docker restart neonlab-website

# Status
docker ps | grep neonlab

# Atualizar manualmente
cd neonlab-website
git pull
docker-compose up -d --build
```

### Local:
```bash
# Tornar scripts executáveis
chmod +x build-docker.sh run-docker.sh

# Build local
./build-docker.sh

# Run local
./run-docker.sh
```

## 🌐 Apontar Domínio

### DNS (Cloudflare/Registro.br):
```
Tipo: A
Nome: @
Valor: [IP do servidor]

Tipo: A
Nome: www
Valor: [IP do servidor]
```

### Nginx + SSL:
```bash
sudo apt install nginx certbot python3-certbot-nginx -y

# Criar config
sudo nano /etc/nginx/sites-available/neonlab.dev

# (Copiar config do DEPLOY_GUIDE.md)

# Ativar
sudo ln -s /etc/nginx/sites-available/neonlab.dev /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL
sudo certbot --nginx -d neonlab.dev -d www.neonlab.dev
```

## ❌ Problemas Comuns

### Container não inicia:
```bash
docker logs neonlab-website
docker rm neonlab-website
docker-compose up -d
```

### Porta em uso:
```bash
sudo lsof -i :3000
sudo kill -9 [PID]
```

### Build falha no CI:
- Verifique secrets no GitHub
- Verifique SSH key
- Veja logs no Actions tab

## 📊 Monitoramento

```bash
# CPU/RAM em tempo real
docker stats neonlab-website

# Logs com filtro
docker logs neonlab-website | grep ERROR

# Health check
curl http://localhost:3000
```

---

**Tem dúvidas?** Veja `DEPLOY_GUIDE.md` completo!
