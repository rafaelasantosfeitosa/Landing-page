# Landing Page — Rafaela Santos (Design Spec)

## Objetivo

Landing page profissional de portfólio para Upwork. Representa Rafaela Santos como desenvolvedora Full Stack freelancer. Projeto em HTML/CSS/JS puro — sem frameworks, sem build tools.

## Identidade Visual

| Atributo | Valor |
|---|---|
| Tema base | Dark |
| Background principal | `#070b14` |
| Background secundário | `#0a1020` |
| Background cards | `#0d1525` |
| Cor de destaque | `#60a5fa` (azul cobalto) |
| Bordas | `#1a2540` |
| Texto principal | `#e0e8ff` |
| Texto secundário | `#6a7fa8` |
| Fonte | System UI / Segoe UI |
| Estilo | Moderno tech, sóbrio e profissional |

Sem efeitos neon agressivos. O azul cobalto é usado em: textos de destaque, bordas hover, badges, botão primário, números de estatísticas e tags de tecnologia.

## Estrutura de Arquivos

```
landing-page/
├── index.html
├── styles/
│   └── main.css
├── js/
│   └── main.js
└── assets/
    └── (imagens futuras, se necessário)
```

## Seções

### 1. Navbar
- Logo textual: `<rafaela.dev />` em azul cobalto, fonte monospace
- Links de navegação: Serviços · Sobre · Depoimentos · Contato
- Botão CTA: "Hire me" (outline azul cobalto)
- Fixa no topo ao rolar (`position: sticky`)
- Fundo semi-transparente com backdrop blur ao rolar

### 2. Hero
- Badge animado: `● Disponível para novos projetos`
- Título: "Olá, sou **Rafaela Santos**" — nome em azul cobalto
- Subtítulo: "Full Stack Developer"
- Descrição curta (2 linhas)
- Dois botões: "Ver meus projetos" (primário sólido — ancora para seção Serviços) e "Entrar em contato →" (outline — ancora para seção Contato)
- Glow radial decorativo no canto superior direito
- 3 estatísticas separadas por linha: `3+ anos · 20+ projetos · 100% Job Success`
- Gradiente de fundo: `#070b14` → `#0d1a38`

### 3. Serviços
- Label: `// o que eu faço`
- Grid 2×2 com 4 cards:
  1. **Frontend com React** — React, Next.js, TypeScript
  2. **Backend & APIs** — Node.js, Python, FastAPI
  3. **Banco de Dados** — PostgreSQL, MongoDB, Redis
  4. **Deploy & DevOps** — Docker, Vercel, AWS
- Cada card: ícone emoji, título, descrição, tags de tecnologia
- Hover: border-color muda para azul cobalto com transição suave

### 4. Sobre
- Label: `// quem sou eu`
- Layout horizontal: avatar (emoji 👩‍💻 em círculo com borda azul) + texto
- Texto: apresentação pessoal, foco em trabalho remoto e entrega de qualidade
- Pills de habilidades: React, Node.js, Python, TypeScript, PostgreSQL, Docker

### 5. Depoimentos
- Label: `// o que dizem`
- Grid 2 colunas com 2 cards
- Cada card: 5 estrelas, texto em itálico, avatar com bandeira + nome + cargo
- Conteúdo fictício mas realista para portfólio

### 6. Contato
- Label: `// vamos trabalhar juntos`
- Layout 2 colunas: info à esquerda, formulário à direita
- Info: título "Tem um projeto em mente?", parágrafo, 3 links (email, LinkedIn, Upwork)
- Formulário: campos Nome, Email, Mensagem + botão "Enviar mensagem →"
- Integração com **EmailJS** (SDK via CDN, sem backend)
- Feedback visual ao enviar: loading no botão + mensagem de sucesso/erro

### 7. Footer
- Copyright: `© 2026 Rafaela Santos`
- Links: GitHub · LinkedIn · Upwork

## Comportamentos JavaScript (`js/main.js`)

- **Navbar scroll**: adiciona classe `scrolled` após 50px (backdrop blur + borda inferior)
- **Smooth scroll**: links da navbar rolam suavemente até cada seção
- **EmailJS**: inicializa com public key, captura submit do form, envia via `emailjs.send()`, exibe feedback no botão
- **Animações de entrada**: `IntersectionObserver` para animar cards e seções ao entrar na viewport (fade-in + slide-up)

## Responsividade

- Mobile-first usando CSS custom properties e media queries
- Breakpoint principal: `768px`
- Abaixo de 768px:
  - Navbar: links colapsam em menu hambúrguer (toggle JS)
  - Hero: stats em coluna
  - Services grid: 1 coluna
  - Testimonials grid: 1 coluna
  - Contato: 1 coluna (form abaixo da info)

## EmailJS

- SDK carregado via CDN no `index.html`
- Credenciais (public key, service ID, template ID) declaradas no topo de `main.js` como constantes — o usuário substitui pelos valores reais da conta EmailJS
- Campos do template: `from_name`, `from_email`, `message`

## O que está fora do escopo

- Seção de portfólio/projetos (pode ser adicionada depois)
- Blog
- Backend próprio
- Animações complexas (ex: Three.js, GSAP)
