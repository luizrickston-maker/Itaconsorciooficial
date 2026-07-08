# 🗺️ Mapa do Site — Ita Consórcios

> **Propósito:** localizar com precisão cada elemento do site para alterações pontuais,
> sem tocar em nada que não foi pedido.
>
> ⚠️ Os números de linha são da versão atual e podem deslocar alguns pontos após edições.
> Os **IDs, classes e comentários de bloco** (`/* ==== NOME ==== */`) são as âncoras
> estáveis — em caso de dúvida, busque por eles.

## 📁 Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Todo o conteúdo e textos do site |
| `assets/css/style.css` | Toda a aparência (cores, fontes, espaçamentos, responsivo) |
| `assets/js/main.js` | Som, abertura, animações, efeitos de ponteiro, formulário |
| `assets/js/vendor/*` | Bibliotecas (GSAP, ScrollTrigger, Lenis) — **nunca editar** |

**Regra geral:** texto/conteúdo → `index.html` · aparência → `style.css` · comportamento/animação → `main.js`.
Cada seção tem estilos no bloco CSS de mesmo nome e animações em `initScrollAnimations()`.

---

## 🎨 Identidade visual (tokens globais)

**`style.css` → `:root` (linhas ~6-24)**

| O que mudar | Variável |
|---|---|
| Laranja principal da marca | `--orange` (#ff5c00) |
| Laranja claro (hovers/destaques) | `--orange-hot` |
| Laranja escuro (gradientes) | `--orange-deep` |
| Fundos (3 níveis de preto) | `--black`, `--black-2`, `--black-3` |
| Textos secundários | `--grey`, `--grey-2` |
| Intensidade do brilho laranja | `--glow` |
| Arredondamento dos cards | `--radius` |
| Fontes | `--font-display` (títulos/Sora), `--font-body` (textos/Inter) |
| Cores do cálice da logo | `--mark-main` (laranja), `--mark-alt` (cinza) |

- Troca das fontes: `<link>` do Google Fonts em `index.html:14-16`
- Grão/noise global: `body::after` (`style.css` ~44-53) — opacidade em `opacity: 0.05`

---

## 🧩 Logo e ícones (sprite SVG)

**`index.html` linhas 21-49** — todos os ícones são `<symbol>` reutilizáveis:

| ID | O que é | Usado em |
|---|---|---|
| `#i-mark` | **Cálice da logo Ita** (linha 23) | Abertura, header, CTA final, footer |
| `#i-home` `#i-building` `#i-pin` `#i-bricks` `#i-roller` `#i-car` `#i-moto` `#i-truck` `#i-card` `#i-file` `#i-chart` `#i-sparkle` | Ícones dos produtos (linhas 30-41) | Cards do bento |
| `#i-check` / `#i-x` | Certo/errado (42-43) | Comparativo e bullets |
| `#i-lock` `#i-clock` `#i-flame` `#i-arrow` `#i-whats` | Cadeado, relógio, chama, seta, WhatsApp (44-48) | Form, CTA final, badge, botões, flutuante |

Para trocar um ícone: edite apenas o `<path>` dentro do `<symbol>` correspondente — reflete em todos os usos.
Estilo global dos ícones: classe `.ic` (`style.css` ~79-92).

---

## 🎬 Abertura cinematográfica

| Elemento | HTML | CSS | JS |
|---|---|---|---|
| Container da abertura | `#intro` (linha 53) | ~108 | — |
| Botão "toque para iniciar" (cálice pulsando) | `#intro-start` (54-57) | ~118-159 | listener linha ~206 |
| Texto "Toque para iniciar a experiência" | linha 56 | `.intro-hint` | — |
| Palco da animação | `#intro-stage` (58-66) | ~161 | — |
| Cálice grande | `.intro-mark` (60) | ~175 | — |
| Nome "Ita" | `.intro-word` (61) | ~182 | — |
| "CONSÓRCIOS" | `.intro-sub` (62) | ~192 | — |
| Tagline | `.intro-tagline` (63) | ~203 | — |
| Onda de luz | `.intro-beam` (65) | ~211 | — |
| Botão "Pular abertura" | `#intro-skip` (67) | ~223 | listener ~207 |

**JS (`main.js`):**
- 🔊 **Som "ta-dum"** → `playTaDum()` (linhas ~28-125). Fade in do sopro: ~linha 44 (`t0 + 0.4`); fade out geral: ~linha 46 (`t0 + 3.9`); volume: `0.85`; batida 1 em `t0 + 0.55`, batida 2 em `t0 + 1.0`; notas dos acordes nas chamadas `chord(...)` (~117-122)
- 🎞️ **Coreografia da abertura** → `runIntro()` (~150-208). Tempos de cada movimento são o último parâmetro dos `.fromTo(...)`. Saída final em `3.15`
- Revelação do site → `revealSite()` (~129)

---

## 🖥️ Header (menu fixo)

| Elemento | HTML | CSS |
|---|---|---|
| Container | `#header` (78) | ~276; versão com fundo ao rolar: `#header.scrolled` (~288) |
| Logo (cálice + "Ita consórcios") | `.logo` (80-83) | `.logo-svg` ~299, `.logo-word` ~301 |
| Menu de navegação (5 links) | `.nav` (84-90) | ~320-322 |
| Botão "Simular grátis" | `.btn-header` (91) | ~363 |

Gatilho do fundo ao rolar: `main.js` → `initSite()` → `onScroll()` (~264, limiar `y > 30`).

---

## 🦸 Hero (primeira dobra)

| Elemento | HTML (linha) | CSS |
|---|---|---|
| Seção | `#hero` (96) | ~371 |
| Brilhos de fundo (parallax) | `.hero-glow-1/-2` (98-99) | ~388/394 |
| Grade de fundo | `.hero-grid` (100) | ~400 |
| 🔶 Badge "Parcelas com até 50% OFF" | `.hero-badge` (104) | ~419 |
| **Título principal (H1)** | linha 105 — `data-split` | tamanho em `h1` (~57) |
| Subtítulo | `.hero-sub` (106) | ~434 |
| Botão laranja "Quero simular agora" | linha 108 | `.btn-primary` ~341 |
| Botão fantasma "Ver como funciona" | linha 109 | `.btn-ghost` ~351 |
| Prova social "+2.500 famílias" | `.hero-trust` (111-114) | ~438; iniciais dos avatares na linha 112 |
| **Card "Simulação exemplo"** (valores R$) | `.hero-card` (117-123) | ~460-512 |
| Indicador de scroll | `.scroll-cue` (125) | ~514 |

Animação de entrada (ordem/tempos): `main.js` → `playHeroEntrance()` (~243-256).
Parallax dos brilhos: final de `initScrollAnimations()` (~416-424).

---

## 🎠 Marquee infinito (faixa de produtos)

- HTML: `.marquee` (130-139) — **os itens estão duplicados em dois `.marquee-group` (132 e 135); edite os dois igualmente** ou o loop "pula"
- CSS: bloco `MARQUEE INFINITO` (~540-600) — velocidade: `animation: marquee 36s` (~565); estilo outline do texto: `.marquee-group span` (~574)

---

## 🔢 Números de autoridade

- HTML: `#numeros` (142-161) — **valores editáveis no atributo `data-target`** (linhas 145, 149, 153, 157) e rótulos logo abaixo de cada um
- CSS: bloco `NÚMEROS` (~602-626)
- Animação de contagem: `main.js` → bloco `Contadores animados` (~400-414, duração `2`s)

---

## 🍱 Produtos (Bento Grid)

- Seção: `#produtos` (164) · título/kicker/descrição: 166-169
- Grid: `.bento` (171-220) — 12 cards `article.product-card`, na ordem:
  Casa (largo), Apartamento, Terreno, Construção, **Carro (largo)**, Moto, **Quitação (largo)**, Caminhão, Cartas contempladas, Reforma, Cirurgia plástica, **Investimento (largo)**
- Card largo = classe `bento-wide`. Cada card: ícone (`<use href="#i-...">`) + `<h3>` + `<p>`
- CSS: bloco `PRODUTOS — BENTO GRID` (~648-701); efeito spotlight: `.product-card::before` (~670)
- Animação cascata: `main.js` bloco `Grades em cascata` (~336-346)

---

## 🪜 Como funciona (sticky + timeline)

- Seção: `#como-funciona` (228)
- Coluna fixa (título + botão "Começar pelo passo 1"): `.how-sticky` (229-235) | CSS ~712
- Timeline com os 4 passos: `.timeline` (236-260) — cada `li.step` tem `.step-num`, `<h3>` e `<p>`
- Linha de progresso: `.timeline-line` (237) | CSS ~726
- CSS: bloco `COMO FUNCIONA — STICKY + TIMELINE` (~703-780)
- Animações: `main.js` bloco `Timeline` (~348-370) — desenho da linha (scrub) e acendimento dos pontos (`is-active`)

---

## ⚖️ Comparativo (Consórcio × Financiamento)

- Seção: `#comparativo` (263) · tabela: `.compare` (270-303)
- 5 linhas de comparação (`.compare-row`): Juros (276), Entrada (281), Parcela mensal (286), Custo total (291), Poder de negociação (296) — coluna Ita = `.compare-ita`
- CSS: bloco `COMPARATIVO` (~790-832)
- Animação (linhas deslizam alternadas): `main.js` ~372-381

---

## 📝 Simulação (formulário → WhatsApp)

- Seção: `#simular` (309) · texto da esquerda + 3 bullets: 311-319
- Formulário: `#lead-form` (321-361)
  - Campo nome: 324 · Campo WhatsApp: 328
  - Select objetivo (12 opções): 332-347 · Select faixa de valor: 350-357
  - Botão enviar: 359 · Nota de segurança: 360
- CSS: bloco `SIMULAÇÃO` (~836-914)
- **JS:**
  - 📱 **NÚMERO DO WHATSAPP**: `main.js` linha ~505 → `const WHATSAPP_NUMBER = "5500000000000"`
  - Mensagem pré-preenchida enviada: ~513-519
  - Máscara de telefone: ~533-540

---

## 💬 Depoimentos

- Seção: `#depoimentos` (366) — 3 cards `figure.testimonial` (373, 378, 383)
- Cada card: estrelas → citação (`blockquote`) → iniciais do avatar → nome/contexto
- CSS: bloco `DEPOIMENTOS` (~915-954)

---

## ❓ FAQ

- Seção: `#faq` (393) — 6 perguntas `details.faq-item` (linhas 400, 404, 408, 412, 416, 420)
- Cada item: pergunta no `<summary>`, resposta no `<p>`
- CSS: bloco `FAQ` (~956-998)

---

## 🚀 CTA final

- Seção: `#cta-final` (429-437): cálice, título, texto de urgência, botão grande, nota "resposta em minutos"
- CSS: bloco `CTA FINAL` (~1000-1033)

---

## 🦶 Footer

- `#footer` (440-458): logo + tagline (442-445), links (447-451), legal/copyright (453-456)
- CSS: bloco `FOOTER` (~1035-1062)
- Ano automático: `main.js` ~530 (`#year`)

---

## 🎈 Elementos flutuantes

| Elemento | HTML | CSS | Observação |
|---|---|---|---|
| Botão WhatsApp flutuante | `#whats-float` (461) | ~1065 | ⚠️ o número também está **hardcoded no href desta linha** |
| Barra CTA fixa (só mobile) | `#sticky-cta` (466) | ~1082 | aparece após rolar 70% da tela (`main.js` ~267) |
| Cursor follower (só desktop) | `#cursor-dot`/`#cursor-ring` (74-75) | ~240-271 | lógica: `initPointerEffects()` ~433-460 |

---

## ⚙️ Comportamentos (main.js) — índice de funções

| Função (linha) | Responsabilidade | Parâmetros que você pode querer ajustar |
|---|---|---|
| `playTaDum()` (~28) | Som da abertura | volume `0.85`, fades, tempos das batidas |
| `revealSite()` (~129) | Transição abertura → site | duração do fade `0.8` |
| `runIntro()` (~150) | Coreografia da abertura | tempos de cada `.fromTo` |
| `splitWords()` (~212) | Divide títulos em palavras | — (não mexer) |
| `playHeroEntrance()` (~243) | Entrada do hero | ordem e delays das linhas do timeline |
| `initSite()` (~260) | Lenis + header + âncoras | suavidade do scroll: `duration: 1.15` |
| `initScrollAnimations()` (~305) | TODAS as animações de scroll | gatilhos `start: "top 86%"` etc. |
| `initPointerEffects()` (~429) | Cursor, magnetic, tilt | força magnética `22`, tilt `7`/`4` graus |

**Onde cada animação de scroll vive (dentro de `initScrollAnimations`):**
fade-ups genéricos → títulos palavra-a-palavra → cascata bento/depoimentos → timeline (linha + passos) → comparativo → formulário → CTA final → contadores → parallax do hero.

---

## 📱 Responsivo (style.css, bloco `RESPONSIVO`)

| Breakpoint | Linha ~ | O que muda |
|---|---|---|
| `max-width: 1024px` | 1102 | bento 2 colunas, hero empilha, sticky vira estático |
| `max-width: 768px` | 1110 | esconde menu/botão do header, mostra barra CTA fixa, stats 2 col, comparativo compacto |
| `max-width: 560px` | 1125 | bento 1 coluna, botões do hero 100%, timeline compacta |

Acessibilidade/movimento reduzido: media query `prefers-reduced-motion` no fim do CSS e checagens `prefersReducedMotion` no JS.

---

## ✅ Checklist de personalização pendente

1. **Número do WhatsApp** (2 lugares): `main.js` ~505 **e** `index.html` linha 461
2. **Números de autoridade**: `index.html` `data-target` (145/149/153/157)
3. **Depoimentos reais**: `index.html` 373-390
4. **Iniciais dos avatares do hero**: `index.html` 112
