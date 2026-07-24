# 🗺️ Mapa do Site — Ita Consórcios

> **Documentação completa** da arquitetura, conteúdo, posicionamento e lições aprendidas. Serve como referência pra qualquer modificação futura.

---

## 📋 Índice Rápido

1. [Stack e estrutura](#-stack-e-estrutura)
2. [Identidade visual](#-identidade-visual)
3. [Seções da página](#-seções-da-página) (12 seções)
4. [CSS — arquitetura](#-css--arquitetura)
5. [JS — arquitetura](#-js--arquitetura)
6. [Performance](#-performance)
7. [WhatsApp — onde está cada número](#-whatsapp--onde-está-cada-número)
8. [Formulário — comportamento](#-formulário--comportamento)
9. [Lições aprendidas](#-lições-aprendidas)
10. [Pontos de customização](#-pontos-de-customização)
11. [Deploy](#-deploy)

---

## 📁 Stack e estrutura

### Stack

| Camada | Tecnologia | Versão / origem |
|---|---|---|
| Frontend | HTML5 estático + CSS3 + JS vanilla | Single-page, sem build |
| Animações | GSAP 3 + ScrollTrigger | `assets/js/vendor/gsap.min.js` + `ScrollTrigger.min.js` (vendored, sem CDN) |
| Smooth scroll | Lenis | `assets/js/vendor/lenis.min.js` (vendored) |
| Fontes | Self-hosted WOFF2 | `assets/fonts/*.woff2` (4 arquivos: Sora + Inter, latin + latin-ext) |
| Imagens | WebP (produtos) + JPG (fallback removido) | `assets/img/*.webp` |
| Hosting | Vercel | Auto-deploy via Git push |
| DNS | Hostinger | Domínio `consorciosita.com` (A record → 76.76.21.21, CNAME www → cname.vercel-dns.com) |

### Estrutura de arquivos

```
ita-consorcio/
├── index.html                  ← ÚNICA página do site (HTML estático)
├── README.md                   ← README genérico
├── MAPA-DO-SITE.md             ← ESTE ARQUIVO (documentação)
├── assets/
│   ├── css/
│   │   └── style.css           ← Todo o CSS (~39KB minificado-não, ~1500 linhas)
│   ├── js/
│   │   ├── main.js             ← Todo o JS customizado (~22KB, 555 linhas)
│   │   └── vendor/             ← Bibliotecas third-party (GSAP, Lenis, ScrollTrigger)
│   ├── img/
│   │   ├── *.webp              ← 12 imagens dos produtos (formato principal)
│   │   ├── *.jpg               ← 12 imagens JPG mantidas como fallback (mas HTML só usa .webp)
│   │   └── PROMPTS-IA.md       ← Prompts pra gerar mais imagens se precisar
│   └── fonts/
│       ├── inter-latin.woff2          ← Inter 400/500/600 — latin básico (48KB)
│       ├── inter-latin-ext.woff2      ← Inter 400/500/600 — latin extended (10KB)
│       ├── sora-latin.woff2           ← Sora 400/600/700/800 — latin básico (25KB)
│       └── sora-latin-ext.woff2       ← Sora 400/600/700/800 — latin extended (12KB)
├── .gitignore
├── .vercel/                     ← Config da Vercel
└── shots/                       ← Screenshots de debug (não vai pro deploy, ignorado)
```

---

## 🎨 Identidade visual

### Cores (CSS variables — `:root` no `style.css` linha 6-24)

```css
--orange: #ff5c00;          /* Cor primária da marca — CTAs, ícones, hovers */
--orange-hot: #ff7a26;      /* Laranja claro — hovers, gradient */
--orange-deep: #cc4a00;     /* Laranja escuro — gradient */
--black: #0a0a0b;           /* Fundo principal */
--black-2: #101012;         /* Fundo secundário (sections alternadas) */
--black-3: #17171a;         /* Fundo de cards/elementos sobrepostos */
--white: #ffffff;           /* Texto principal, títulos */
--grey: #c8c8d0;            /* Texto secundário (descrições, legendas) */
--grey-2: #8a8a92;          /* Texto terciário (metadados, legendas menores) */
--line: rgba(255, 255, 255, 0.08);  /* Bordas sutis (cards, separadores) */
--glow: rgba(255, 92, 0, 0.35);      /* Sombras/efeitos com cor da marca */
--radius: 20px;             /* Border-radius padrão (cards, botões) */
```

### Tipografia

- **Display (títulos, H1, H2, H3, kickers):** Sora, weights 400/600/700/800
- **Body (textos, parágrafos, botões):** Inter, weights 400/500/600
- **Hierarquia de tamanho:**
  - H1: `clamp(1.9rem, 5.6vw, 4.4rem)` — escala fluida de ~30px a ~70px
  - H2: `clamp(1.6rem, 4vw, 3.1rem)` — escala fluida
  - H3: 1.15rem (fixo)
  - Body: 17px base, line-height 1.65
  - Pequeno: 0.85-0.92rem (legendas, labels)

### Spacing (padrão do site)

- **Section padding:** 110px vertical (desktop), 80px (mobile)
- **Container:** `width: min(1180px, 92%)` — 92% do viewport, max 1180px
- **Gap comum:** 14-20px entre elementos de uma seção
- **Card padding:** 22-28px interno, 12-20px margin entre cards
- **Border-radius padrão:** `var(--radius)` = 20px

---

## 📐 Seções da página

### Layout vertical (em ordem de aparição)

| # | ID | Seção | Linha no index.html | Conteúdo principal |
|---|---|---|---|---|
| 1 | `intro` | Vinheta de abertura | 96-111 | Logo cálice + botão "Toque para iniciar" |
| 2 | `#site` | Container do site | 114 | `hidden` inicialmente |
| 3 | `#header` | Menu fixo | 121-139 | Logo + nav + Simular grátis + Instagram |
| 4 | `#hero` | Topo / primeira dobra | 142-212 | Badge + H1 + sub + CTAs + trust + hero card |
| 5 | `#numeros` | Barra de autoridade | 213-234 | 4 stats (clientes, crédito, satisfação, tipos) |
| 6 | `#produtos` | Bento de 12 cards | 235-370 | 12 tipos de consórcio com imagem |
| 7 | `#como-funciona` | Timeline 4 passos | 371-405 | Sticky column + 4 steps numerados |
| 8 | `#comparativo` | Tabela Consórcio vs Financiamento | 406-451 | Head + 5 rows de comparação |
| 9 | `#simular` | Formulário | 452-513 | Texto + form (nome, whatsapp, objetivo, valor) |
| 10 | `#depoimentos` | 3 testemunhos | 514-558 | Cards com avatar, citação, nome |
| 11 | `#faq` | Perguntas frequentes | 559-594 | 6 details/summary |
| 12 | `#cta-final` | CTA final | 595-605 | Cálice + texto + botão grande |
| 13 | `#footer` | Rodapé | 606-631 | Logo + links + contato + legal |
| 14 | `#sticky-cta` | Barra fixa mobile | 638-640 | Só aparece em mobile quando rolar 70% |

---

### Detalhamento por seção

#### 1. Vinheta de abertura (`#intro`)

**Linhas:** 96-111 (`<div id="intro">`)

**Estrutura:**
- Botão `#intro-start` (cálice pulsando + "Toque para iniciar a experiência / com som")
- `#intro-stage` com cálice grande, "Ita", "CONSÓRCIOS", tagline
- Botão `#intro-skip` ("Pular abertura →")

**Comportamento JS (`main.js`):**
- Ao carregar: `body.overflow = "hidden"` (trava scroll)
- Clique no "Toque para iniciar": toca som "ta-dum" sintetizado (Web Audio API) + timeline GSAP com animações da marca
- Clique no "Pular": pula direto pro site sem som
- Após ~4s ou no "Pular": `revealSite()` faz fade-out do intro + revela site + anima hero

**Para customizar:** ajustar `duração` do timeline em `runIntro()` (linha ~164 do main.js) ou texto em `index.html`.

---

#### 2. Site container (`#site`)

**Linha:** 114 — `<div id="site" hidden>`

Tem o atributo `hidden` no carregamento. JS remove quando a vinheta termina.

---

#### 3. Header fixo (`#header`)

**Linhas:** 121-139

**Estrutura:**
```html
<header id="header">
  <div class="container header-inner">
    <a href="#hero" class="logo">...</a>
    <nav class="nav">
      <a href="#produtos">Consórcios</a>
      <a href="#como-funciona">Como funciona</a>
      <a href="#comparativo">Vantagens</a>
      <a href="#depoimentos">Clientes</a>
      <a href="#faq">Dúvidas</a>
    </nav>
    <a href="#simular" class="btn btn-primary btn-header" data-magnetic>Simular grátis</a>
    <a href="https://instagram.com/consorcios_ita" class="nav-social">...</a>
  </div>
</header>
```

**Comportamento:**
- Fixo no topo (`position: fixed`)
- Adiciona classe `.scrolled` quando scrollY > 30 (fundo com blur)
- Esconde no mobile via `@media (max-width: 768px)` `.nav { display: none }`
- Botões magnéticos (`.btn[data-magnetic]`) seguem mouse sutilmente
- `.nav-social` (Instagram) tem animação de brilho infinito (`nav-shine` keyframes)

**Para customizar:**
- Adicionar/remover links do menu: editar `<nav class="nav">` em `index.html`
- Mudar Instagram: substituir URL em `<a href="https://instagram.com/..." class="nav-social">`

---

#### 4. Hero (`#hero`)

**Linhas:** 142-212

**Estrutura:**
```html
<section id="hero">
  <div class="hero-bg">
    <div class="hero-glow hero-glow-1"></div>  <!-- decorativo, hidden mobile -->
    <div class="hero-glow hero-glow-2"></div>  <!-- decorativo, hidden mobile -->
    <div class="hero-grid"></div>                <!-- grade decorativa, hidden mobile -->
  </div>
  <div class="container hero-inner">
    <div class="hero-copy">
      <span class="hero-badge">Parcelas com até 50% OFF — condição por tempo limitado</span>
      <h1 data-split>Conquiste seu patrimônio <em>sem pagar juros</em> de financiamento.</h1>
      <p class="hero-sub">Casa, apartamento, carro, moto, caminhão ou investimento — com parcelas que cabem no seu bolso e planejamento inteligente. Simulação gratuita em menos de 2 minutos.</p>
      <div class="hero-ctas">
        <a href="#simular" class="btn btn-primary btn-lg btn-block btn-hero-primary">Quero simular agora</a>
        <a href="#como-funciona" class="btn btn-ghost btn-lg btn-block btn-hero-ghost">Ver como funciona</a>
      </div>
      <div class="hero-trust">
        <div class="trust-avatars"><span>MS</span><span>CE</span><span>FL</span><span>+</span></div>
        <p><strong>+2.500 famílias</strong> já conquistaram seus sonhos com a Ita</p>
      </div>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="hero-card" data-tilt>
        <!-- Card "Simulação exemplo" com R$ 287/mês -->
      </div>
    </div>
  </div>
</section>
```

**Comportamento JS:**
- H1 com `data-split`: cada palavra vira `<span class="w"><span class="wi">` (split de letras). Animado com stagger por GSAP no hero entrance
- `<em>` no H1: recebe gradient laranja nas palavras (split text)
- `data-tilt` no hero-card: aplica tilt 3D no mouse (efeito parallax sutil)
- `data-magnetic` nos CTAs: segue mouse (efeito magnético)

**Para customizar:**
- Texto principal: alterar conteúdo do `<h1>` e `<p class="hero-sub">` em `index.html`
- Valor do card "Simulação exemplo": alterar linhas do `.hero-card` (parcela mensal, valor total, prazo)

---

#### 5. Barra de autoridade (`#numeros`)

**Linhas:** 213-234

**Estrutura:**
```html
<section id="numeros">
  <div class="container stats-grid">
    <div class="stat" data-anim="stat">
      <strong class="stat-value">
        <span class="counter" data-target="2500">0</span>
        <span class="stat-suffix">+</span>
      </strong>
      <span class="stat-label">clientes atendidos</span>
    </div>
    <!-- +3 stats: R$ 180 mi crédito, 98% satisfeitos, 12 tipos -->
  </div>
</section>
```

**Comportamento JS:**
- `.counter` com `data-target`: animação de contagem quando entra em viewport (GSAP ScrollTrigger)

**Para customizar:**
- Números: alterar `data-target="2500"` etc.
- Labels: alterar `<span class="stat-label">`

---

#### 6. Produtos — Bento Grid (`#produtos`)

**Linhas:** 235-370

**Estrutura:** 12 cards em grid responsivo (4 cols → 2 cols → 1 col)

**Card padrão:**
```html
<article class="product-card [bento-wide]" data-anim="card" data-tilt>
  <img class="product-img" src="assets/img/[nome].webp" alt="" loading="lazy" decoding="async" onerror="this.style.display='none'" />
  <div class="product-overlay"></div>
  <div class="product-content">
    <span class="product-icon"><svg><use href="#i-[icone]"/></svg></span>
    <h3>[Nome]</h3>
    <p>[Descrição]</p>
  </div>
</article>
```

**Cards (ordem no grid):**
1. Casa (bento-wide) — `casa.webp`, ícone `#i-home`
2. Apartamento — `apartamento.webp`, ícone `#i-building`
3. Terreno — `terreno.webp`, ícone `#i-pin`
4. Construção — `construcao.webp`, ícone `#i-bricks`
5. Carro (bento-wide) — `carro.webp`, ícone `#i-car`
6. Moto — `moto.webp`, ícone `#i-moto`
7. Quitação de financiamento (bento-wide) — `quitacao.webp`, ícone `#i-card`
8. Caminhão — `caminhao.webp`, ícone `#i-truck`
9. Cartas contempladas — `cartas.webp`, ícone `#i-file`
10. Reforma — `reforma.webp`, ícone `#i-roller`
11. Cirurgia plástica — `cirurgia.webp`, ícone `#i-sparkle`
12. Investimento (bento-wide) — `investimento.webp`, ícone `#i-chart`

**Comportamento:**
- Imagens: `<img>` real (NÃO background-image) com `object-fit: cover`
- `data-tilt`: aplica tilt 3D no mouse (parallax sutil)
- `data-anim="card"`: fade-up com GSAP quando entra em viewport
- Hover: borda laranja, zoom na imagem (scale 1.08)
- Mobile (max-width 768px): grid vira 1 coluna

**Para customizar:**
- Trocar imagem: substituir arquivo `.webp` em `assets/img/`
- Trocar texto: editar `<h3>` e `<p>` do card
- Trocar ícone: trocar `href="#i-[...]"` no `<svg>` (ícones definidos em `<symbol>` no topo do HTML)

---

#### 7. Como funciona (`#como-funciona`)

**Linhas:** 371-405

**Estrutura:**
- Coluna sticky com título "Como funciona em 4 passos"
- Timeline com 4 steps numerados (01, 02, 03, 04)
- Linha vertical desenhando conforme scroll

**Comportamento JS:**
- GSAP ScrollTrigger com `scrub: 0.6` desenha a linha vertical conforme scroll
- Steps aparecem com `is-active` quando entram em viewport

**Para customizar:**
- Steps: editar conteúdo dos `<li class="step">` em `index.html`

---

#### 8. Comparativo (`#comparativo`)

**Linhas:** 406-451

**Estrutura:**
- Head (escondido em mobile) + 5 rows de comparação
- Cada row: 3 colunas (label, Consórcio Ita, Financiamento)

**Desktop:** grid 1.2fr 1fr 1fr (3 colunas)
**Mobile (max-width 768px):** cada linha vira um CARD vertical

**Importante:** a linha 422 da tabela de comparação diz "Até 19,13% a.a. + IOF" — taxa de juros usada no site.

**Layout mobile (a partir de 768px):**
```
┌─────────────────────────┐
│ JUROS                    │ ← laranja, uppercase, font-display
│ ─────────────            │
│ ✓ Zero juros             │ ← verde, ícone + texto
│ ✕ Até 19,13% a.a. + IOF  │ ← vermelho, ícone + texto
└─────────────────────────┘
```

CSS chave: `style.css` linhas ~1452+

**Para customizar:**
- Taxa de juros: alterar linha 422 do index.html
- Outros valores: editar `<div class="compare-ita">` ou os `<div>` finais

---

#### 9. Formulário de simulação (`#simular`)

**Linhas:** 452-513

**Estrutura:**
- Lado esquerdo: copy + 3 bullets
- Lado direito: form com 4 campos + botão submit

**Campos:**
1. **Seu nome** (input text, obrigatório)
2. **WhatsApp** (input tel, obrigatório, com máscara `(00) 90000-0000`)
3. **Qual é o seu objetivo?** (select com 12 opções de consórcio)
4. **Valor desejado (aproximado)** (select com 5 faixas + opção "Outra quantia")
   - Quando "Outra quantia" selecionado: campo input numérico aparece

**Comportamento JS (`main.js`):**
- `telInput` mask: aplica máscara `(00) 90000-0000` em tempo real
- Submit: abre `https://wa.me/[WHATSAPP_NUMBER]` com mensagem pré-formatada
- `valorSelect.change`: mostra/esconde campo custom

**Para customizar:**
- Adicionar/remover opções do select: editar `<option>` em `index.html`
- Mudar texto da mensagem WhatsApp: editar array `msg` no handler de submit (main.js ~linha 518)
- **NÚMERO DO WHATSAPP:** constante `WHATSAPP_NUMBER` em `main.js:501` — ATUALMENTE É PLACEHOLDER `5500000000000` (deixe assim até você definir o número real)

---

#### 10. Depoimentos (`#depoimentos`)

**Linhas:** 514-558

**Estrutura:** 3 testemunhos com:
- 5 estrelas (texto `★★★★★`)
- Citação em `<blockquote>`
- Avatar (iniciais ou foto) + nome + contexto

**Avatars no HTML:**
```html
<span class="avatar">
  <span class="avatar-initials">MS</span>
  <img src="assets/img/cliente-mariana.webp" alt="" loading="lazy" onload="..." onerror="this.remove()" />
</span>
```

**Comportamento:**
- Desktop: 3 colunas (1fr 1fr 1fr)
- Mobile: 1 coluna
- Estrutura CSS preparada para foto real: `<img>` sobrepõe as iniciais quando carrega
- Se foto não existe: só mostra as iniciais (fallback)

**Para customizar:**
- Adicionar testemunhos: duplicar um `<figure class="testimonial">` block
- Adicionar fotos reais: colocar `cliente-X.webp` em `assets/img/` com nome matching

---

#### 11. FAQ (`#faq`)

**Linhas:** 559-594

**Estrutura:** 6 `<details class="faq-item">` com `<summary>` (pergunta) e `<p>` (resposta)

**Para customizar:**
- Adicionar/remover perguntas: duplicar `<details>` block

---

#### 12. CTA Final (`#cta-final`)

**Linhas:** 595-605

**Estrutura simples:**
- Cálice grande
- Título "Seu sonho não precisa esperar"
- Texto de urgência ("Grupos com parcelas promocionais de até 50% OFF...")
- Botão grande para `#simular`

**Para customizar:**
- Texto: editar `<h2>` e `<p>` em `index.html`

---

#### 13. Footer (`#footer`)

**Linhas:** 606-631

**Estrutura (grid 3 colunas em desktop, 1 em mobile):**
- Logo + tagline
- Links de navegação
- **Contato (Instagram + Telefone):**
  - Instagram: `@consorcios_ita` → link para `https://instagram.com/consorcios_ita`
  - Telefone: `(75) 99838-4176` → link `tel:+5575998384176`
- Legal (copyright + Banco Central)

**⚠️ IMPORTANTE — NÚMERO WHATSAPP/TEL:**
- WhatsApp **público** (footer + flutuante): **5575998384176**
- WhatsApp do **formulário** (placeholder): 5500000000000 (NÃO MEXER até você definir o real)

---

#### 14. WhatsApp flutuante (`#whats-float`)

**Linhas:** 633-636

**Botão fixo canto inferior direito** que abre conversa WhatsApp. URL: `https://wa.me/5575998384176?text=...`

**Mobile (max-width 768px):**
- Visível, mas ajustado para cima (`bottom: 84px`) para não conflitar com `#sticky-cta`

---

#### 15. Barra CTA sticky mobile (`#sticky-cta`)

**Linhas:** 638-640

**Aparece apenas no mobile quando `scrollY > 70% viewport`**

**Para customizar:**
- Texto do botão: editar linha 639

---

## 🎨 CSS — Arquitetura

### Estrutura do `style.css`

```
1-5:        Header comment
6-24:       :root — variáveis (cores, fonts, radius)
26-30:      Reset global (* { margin, padding, box-sizing }) + html
31-43:      html (overflow-x: clip), body (background, font, color)
45-72:      h1, h2, h3 — tipografia display
74-100:     Imagens, links, ::selection
77-100:     .container, .container-narrow
102-105:    .ic (ícones SVG)
107-119:    .w (split text)
122-244:    Hero
245-280:    Header
282-310:    Nav + btn
320-355:    Nav social (Instagram com shine animation)
357-380:    Hero copy, badge, sub, CTAs, trust
380-510:    Hero card (R$ 287/mês)
510-540:    Section utility (.section, .section-kicker, .section-head)
540-580:    Stats (#numeros)
585-700:    Produtos (bento)
700-790:    Como funciona (timeline)
790-840:    Comparativo
840-915:    Simular (form)
915-960:    Depoimentos (testimonials)
960-1010:   FAQ
1000-1040:  CTA Final
1040-1090:  Footer
1090-1180:  WhatsApp float, sticky CTA
1180-1330:  @media (max-width: 1024px) — tablet
1330-1410:  @media (max-width: 768px) — mobile
1410-1500:  @media (max-width: 560px) — small mobile
1500-1510:  @media (max-width: 420px) — extra small
1510+:     prefers-reduced-motion
```

### Padrões de nomenclatura

- **BEM-like:** `.product-card`, `.product-card-content`, `.product-card h3`
- **Estado:** `.is-active`, `.is-hover`, `.scrolled`, `.visible`
- **Modificadores:** `.bento-wide` (grid span 2), `.btn-primary`, `.btn-ghost`, `.btn-block`

---

## ⚙️ JS — Arquitetura

### Estrutura do `main.js`

```
1-8:    Header comment
10-13:  IIFE setup + matchMedia para prefers-reduced-motion
15-21:  DOM refs (intro, introStart, introSkip, site, etc.)
23-27:  DEV: ?skipIntro bypass
29-44:  Lenis smooth scroll setup
46-130: playTaDum() — som sintetizado "ta-dum" via Web Audio API
132-205: runIntro() — timeline GSAP da vinheta
207-210: Listeners de click
212-244: splitWords() + splitHero() — split text em palavras
246-266: playHeroEntrance() — anima hero (entrada inicial)
268-309: initSite() — Lenis, header scroll, magnetic, tilt, smooth scroll
311-405: initScrollAnimations() — todas as animações GSAP ScrollTrigger
407-451: initPointerEffects() — magnetic buttons + tilt 3D
453-540: Form behavior
488-535: WHATSAPP_NUMBER + form submit handler
543-555: Tel input mask (formato BR)
```

### Padrões de animação GSAP

- **ScrollTrigger `once: true`** para fade-ups, contadores, etc. (anima só uma vez)
- **ScrollTrigger com `scrub`** para timeline de scroll (animação acompanha o scroll)
- **timeline.from()** para entrada do hero (define from-state e anima para natural)
- **immediateRender** padrão: GSAP aplica o from-state imediatamente ao criar a timeline

### Como os agentes/seções se comportam

1. **Vinheta (`#intro`):** Fade in de elementos com timeline GSAP, depois fade out do intro + entrada do hero (via `playHeroEntrance()`)
2. **Hero entrance:** Header desce, badge fade up, H1 words sobem (stagger), sub fade up, CTAs fade up, trust fade up, hero card sobe
3. **Scroll triggers:** Cards do produto, steps do "como funciona", linhas do comparativo, stats com contador, etc.

### WhatsApp number locations

| Local | Variável/URL | Valor atual |
|---|---|---|
| Form submit (linha 524 main.js) | `WHATSAPP_NUMBER` | `5500000000000` (placeholder) |
| WhatsApp flutuante (linha 634 html) | URL hardcoded | `5575998384176` |
| Footer telefone (linha 625 html) | URL hardcoded | `tel:+5575998384176` |
| OG/Twitter meta tags | — | (não usa WhatsApp) |

---

## ⚡ Performance

### Otimizações aplicadas

1. **Imagens WebP:** todas as 12 imagens convertidas de JPG para WebP (~50% menor)
   - Antes: 6.54 MB total
   - Depois: 3.0 MB total
   - Formato `.jpg` mantido em disco como fallback (mas HTML usa só `.webp`)

2. **Fontes self-hosted:** removido Google Fonts CDN
   - 4 arquivos WOFF2 em `assets/fonts/` (95KB total)
   - `@font-face` declarado no `style.css`
   - `<link rel="preconnect">` removidos (não tem mais CDN pra preconnect)

3. **Preload de recursos críticos:**
   - 2 WOFF2 (Inter, Sora latin)
   - 1 imagem (casa.webp — primeiro produto visível)

4. **Scripts `defer`:** todos os `<script>` do final do body têm `defer` (não bloqueiam render)

5. **Cache busting:** `<link href="style.css?v=13">` força reload quando CSS muda

### Carregamento estimado (3G)

| Recurso | Tamanho | Quando carrega |
|---|---|---|
| HTML | 41 KB | Imediato |
| CSS | 39 KB | Paralelo ao HTML |
| JS vendor (defer) | 130 KB | Após HTML parse |
| JS main (defer) | 19 KB | Após vendor |
| Fontes (preload) | 95 KB | Paralelo a CSS |
| Imagem LCP casa (preload) | 471 KB | Paralelo a CSS |
| Outras 11 imagens (lazy) | ~2.5 MB | Sob demanda no scroll |

**Critical path: ~800 KB**

---

## ⚠️ Lições aprendidas

### Bugs que apareceram durante o desenvolvimento

#### 1. Bug do "2x render" do hero após vinheta

**Sintoma:** O hero aparecia DUAS vezes — primeiro em estado natural (visível), depois pulava para from-state e animava de volta.

**Causa:** O `revealSite()` antigo fazia `site.hidden = false` PRIMEIRO, depois esperava 0.6s pro intro fade acabar, e SÓ ENTÃO rodava `playHeroEntrance()`. Durante esses 0.6s, o hero estava visível em estado natural.

**Fix correto:** `playHeroEntrance()` deve rodar IMEDIATAMENTE após `site.hidden = false` (mesmo JS task, antes do paint). O intro fade acontece em paralelo.

```js
// CORRETO (atual)
site.hidden = false;
initSite();
playHeroEntrance();  // ← aplica from-state antes do paint
gsap.to(intro, { opacity: 0, duration: 0.6 });  // ← intro fade em paralelo
```

**Tentativa ERRADA anterior:** Usar `gsap.set()` para pré-aplicar from-state antes de remover hidden. **NÃO FUNCIONA** porque o GSAP considera o from-state como "natural" para animações subsequentes, então `tl.from()` não anima nada.

#### 2. Hero glows no mobile

**Sintoma:** Hero glows (620px e 480px) estouravam o viewport no mobile, causando scroll horizontal.

**Fix:** Esconder via `@media (max-width: 768px) { .hero-glow-1, .hero-glow-2 { display: none } }`

#### 3. Compare table no mobile

**Sintoma:** Tabela 3-colunas não cabia em 375px. Tentativas anteriores cortavam texto.

**Tentativa 1 (quebrada):** 2 colunas + `display: none` no label + `::before` com `attr(data-row)` → label sumia, `data-row` não existia.

**Tentativa 2 (quebrada):** Apenas `display: none` no `.compare-head` → sobrescrito por `.compare-row` (mesma especificidade, ordem de definição).

**Fix correto:** Cada linha vira um **card** com título no topo (laranja, uppercase) + 2 valores empilhados abaixo. CSS: `display: flex; flex-direction: column;` no `.compare-row`. Head oculto com `.compare-row.compare-head { display: none }` (especificidade alta).

#### 4. Container sem max-width no mobile

**Sintoma:** Elementos `inline-block` (badge) expandiam além do container em 375px.

**Causa:** `.hero-badge` tinha `display: inline-block` com padding mas sem `max-width: 100%`. Texto largo (50+ chars) forçava badge a ser mais largo que container.

**Fix:** Adicionar `max-width: 100%; box-sizing: border-box;` + `.hero-sub { max-width: 100% }` + `.hero-ctas { max-width: 100% }` no mobile.

#### 5. Botão Simular grátis e Instagram no header

**Iteração 1:** Instagram dentro do nav, com brilho. Não combinava.
**Iteração 2:** Instagram removido, depois recolocado FORA do nav (após o botão Simular grátis), alinhado via `.header-actions` wrapper.

---

## 🔧 Pontos de customização

### Onde mudar X

| O que mudar | Arquivo | Linha (aprox.) | Como |
|---|---|---|---|
| Título H1 hero | `index.html` | 147 | `<h1 data-split>...</h1>` |
| Subtítulo hero | `index.html` | 148 | `<p class="hero-sub">...</p>` |
| Texto CTA "Quero simular" | `index.html` | 150 | Botão `<a href="#simular">` |
| Número WhatsApp **flutuante** | `index.html` | 634 | URL `https://wa.me/5575998384176?text=...` |
| Número WhatsApp **footer** | `index.html` | 621-624 | URL `tel:+5575998384176` e display `(75) 99838-4176` |
| Número WhatsApp **do form** | `assets/js/main.js` | 501 | `const WHATSAPP_NUMBER = "..."` — **ATENÇÃO: é placeholder** |
| Taxa de juros da comparação | `index.html` | 422 | "Até 19,13% a.a. + IOF" |
| Valor do card "R$ 287" | `index.html` | 192-194 | `<span class="hc-price-value">287</span>` etc. |
| Stats (2500+, R$ 180 mi, etc.) | `index.html` | 217-232 | `data-target="..."` e labels |
| Imagens dos produtos | `assets/img/*.webp` | — | Substituir arquivo |
| Cores da marca | `assets/css/style.css` | 7-9 | `--orange`, `--orange-hot`, `--orange-deep` |
| Fonte display (Sora) | `assets/css/style.css` | 19 | `--font-display` |
| Fonte body (Inter) | `assets/css/style.css` | 20 | `--font-body` |
| Texto do form (placeholders, options) | `index.html` | 463-507 | Campos `<input>`, `<option>` |
| Perguntas FAQ | `index.html` | 565-591 | Blocos `<details>` |
| Depoimentos | `index.html` | 523-548 | Blocos `<figure class="testimonial">` |
| Instagram handle | `index.html` | 134, 619 | `https://instagram.com/consorcios_ita` |
| Telefone footer (display) | `index.html` | 624 | `<span>(75) 99838-4176</span>` |
| Vídeo do intro | `assets/js/main.js` | função `playTaDum()` | Notas/acordes D2, A2, D3, etc. |

### Onde adicionar nova seção

1. Adicionar HTML no `index.html` na ordem correta
2. Adicionar CSS no `style.css` (após a última seção existente)
3. Adicionar JS de animação no `initScrollAnimations()` em `main.js`
4. Se a seção precisar de ID pra âncora de navegação, adicionar `<section id="nome">` e link no nav

---

## 🚀 Deploy

### Como deploy funciona

1. Commit tudo no git
2. Push pra `main` branch no GitHub (`luizrickston-maker/Itaconsorciooficial`)
3. Vercel detecta push e faz deploy automático
4. DNS em Hostinger aponta `consorciosita.com` → Vercel

### Comandos pra deploy

```bash
cd "C:/Users/Luis Henrique/ita-consorcio"
git add -A
git commit -m "mensagem do que mudou"
git push origin main
```

**Vercel faz o resto automaticamente.** Não precisa de CLI.

### Variáveis de ambiente

Nenhuma. O site é estático puro.

### Domínio

`consorciosita.com` configurado na Hostinger:
- A record `@` → `76.76.21.21`
- CNAME `www` → `cname.vercel-dns.com`

SSL provisionado automaticamente pela Vercel via Let's Encrypt.

---

## 📞 Contato / Suporte

- **Domínio:** consorciosita.com (Hostinger)
- **Repositório:** github.com/luizrickston-maker/Itaconsorciooficial
- **Deploy:** vercel.com
- **Cliente:** ITA Consórcios (Bruno / Diego / Gabriel)
