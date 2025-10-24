# LegadoEfraim - Frontend

**LegadoEfraim** é um e-commerce bilíngue desenvolvido com **Next.js 15 (App Router)**, projetado para demonstrar arquitetura moderna de front-end, práticas de performance, organização de código e integração contínua.
Este projeto, que ainda está em desenvolvimento, tem o objetivo de ajudar financeiramente missionários no campo, investindo 30% do lucro de cada peça no Reino de Deus.

Confira

---

## ✦ Principais Tecnologias

- **Next.js 15:** com App Router e renderização híbrida (SSR/ISR)
- **TypeScript:** Tipagem segura
- **TailwindCSS v4** Mobile-first e theme-mode
- **ShadCN/UI** Design system
- **Zustand** Gerenciamento de estado global
- **React Query / SWR:** (em desenvolvimento) para cache e revalidação de dados
- **next-intl:** Internacionalização (`pt` e `en`)
- **Framer Motion:** Animações fluidas
- **Vitest + Testing Library:** Testes de unidade e hooks
- **Storybook:** (em desenvolvimento) para documentação visual de componentes
- **CI/CD:** GitHub Actions e deploy automático na Vercel

---

## ✦ Estrutura do Projeto

```
src/
├─ app/                       # Rotas principais (Next.js App Router)
│  ├─ [locale]/               # Suporte a múltiplos idiomas (pt/en)
│  │  ├─ about/               # Página SSG "Sobre"
│  │  └─ product/[slug]/      # Página ISR de detalhes do produto
│  └─ layout.tsx              # Layouts globais da aplicação
│
├─ components/                # Componentes reutilizáveis (UI, layout, home, etc.)
│  ├─ ui/                     # Camada base de componentes visuais (ShadCN + Tailwind)
│  ├─ layout/                 # Navbar, Footer e estrutura de página
│  └─ home/                   # Componentes específicos da home (banner, listagens, etc.)
│
├─ hooks/                     # Hooks customizados (useIsClient, paginação, etc.)
├─ lib/                       # Funções utilitárias e mock da API de produtos
├─ store/                     # Estado global com Zustand (carrinho persistente)
├─ i18n/                      # Configuração de internacionalização (next-intl)
├─ messages/                  # Textos JSON para cada idioma
└─ providers/                 # Providers globais (themes, toasts, contexto de idioma)

```

---

## ✦ Funcionalidades Principais

- **Listagem e visualização de produtos**
- **Carrinho com persistência local**
- **Paginação e filtros**
- **Internacionalização completa (pt/en)**
- **Layout responsivo com theme-mode**
- **SEO otimizado (sitemap, robots, JSON-LD)**

---

## ✦ Boas Práticas Aplicadas

- Arquitetura **feature-based**
- **Atomic Design** para estrutura de componentes
- **Clean Code**
- Monitoramento de performance com **Core Web Vitals**
- **CI/CD automatizado**: build, lint, testes e deploy na Vercel

---

## ✦ Como Executar Localmente

```bash
# Clonar o repositório
git clone https://github.com/fergmauricio/legadoefraim-frontend.git
cd faithwear

# Instalar dependências
npm install

# Rodar localmente
npm run dev

# Rodar testes
npm run test

# Build de produção
npm run build && npm start

```

## ✦ Autor

Maurício Ferg
Desenvolvedor Full Stack — Next.js | React | TypeScript
