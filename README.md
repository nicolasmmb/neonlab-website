# Neonlab.dev - Landing Page

Landing page moderna e otimizada para SEO da Neonlab.dev, construída com Next.js 14, TypeScript, Tailwind CSS e Framer Motion.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com otimização de SEO
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **Framer Motion** - Animações fluidas e performáticas

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 🎨 Características

- ✅ Otimizado para SEO (metadados, Open Graph, Twitter Cards)
- ✅ Design responsivo e moderno
- ✅ Animações suaves com Framer Motion
- ✅ Glassmorphism UI
- ✅ Performance otimizada
- ✅ TypeScript para segurança de tipos
- ✅ Formulário de contato funcional

## 📁 Estrutura do Projeto

```
neonlab-website/
├── app/
│   ├── layout.tsx       # Layout principal com metadados SEO
│   ├── page.tsx         # Página inicial
│   └── globals.css      # Estilos globais
├── components/
│   ├── HomePage.tsx     # Componente principal da página
│   ├── Icons.tsx        # Ícones SVG
│   ├── RotatingText.tsx # Componente de texto animado
│   └── UI.tsx           # Componentes de UI reutilizáveis
├── public/              # Arquivos estáticos
└── package.json
```

## 🔧 Configuração

O projeto está configurado com:
- Next.js App Router
- TypeScript strict mode
- Tailwind CSS com configuração personalizada
- Metadados SEO otimizados

## 📝 Próximos Passos

1. Executar `npm install` para instalar as dependências
2. Adicionar uma imagem OG em `public/og-image.png` (1200x630px)
3. Configurar variáveis de ambiente se necessário
4. Personalizar os metadados em `app/layout.tsx`
5. Adicionar analytics (Google Analytics, etc.)
6. Configurar formulário de contato com backend real

## 🌐 Deploy

Recomendado: **Vercel** (criadores do Next.js)

```bash
# Deploy na Vercel
npx vercel
```

Ou use Netlify, AWS, ou qualquer plataforma que suporte Next.js.

## 📄 Licença

© 2025 Neonlab.dev - Todos os direitos reservados.
