# Ita Consórcio — Landing Page

Landing page de alta conversão para a **Ita Consórcio**, com abertura cinematográfica estilo Netflix (com som), animações de scroll com GSAP e estrutura estratégica de conversão.

## ✨ Destaques

- **Abertura estilo Netflix**: tela preta → logo "ITA" em zoom com explosão de luz e som "ta-dum" sintetizado via Web Audio API (os navegadores exigem interação do usuário para tocar áudio, por isso a tela "Toque para iniciar").
- **Animações de scroll** com GSAP + ScrollTrigger: fade-ups, cascatas, contadores animados, parallax e wipes.
- **Estrutura de conversão** baseada em pesquisa: Hero com promessa → prova numérica → produtos → como funciona → comparativo → captura de lead → prova social → FAQ → CTA final com urgência.
- **Captura de leads via WhatsApp**: o formulário monta uma mensagem pré-preenchida e abre o WhatsApp.
- **Mobile-first**: barra de CTA fixa no mobile, botão flutuante de WhatsApp, layout 100% responsivo.
- Respeita `prefers-reduced-motion` (acessibilidade).

## 🚀 Como publicar

É um site estático — basta hospedar os arquivos (GitHub Pages, Vercel, Netlify, etc.). Nenhum build necessário.

Para testar localmente:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## ⚙️ Personalização obrigatória

1. **Número do WhatsApp** — troque `5500000000000` em **dois lugares**:
   - `assets/js/main.js` → constante `WHATSAPP_NUMBER`
   - `index.html` → link do botão flutuante `#whats-float`
2. **Números de autoridade** (`index.html`, seção `#numeros`): clientes atendidos, crédito liberado, etc. — ajuste para os números reais via atributo `data-target`.
3. **Depoimentos** (`index.html`, seção `#depoimentos`): substitua pelos depoimentos reais de clientes.

## 🗺️ Mapa para alterações pontuais

Consulte o **[MAPA-DO-SITE.md](MAPA-DO-SITE.md)**: ele localiza cada elemento do site
(arquivo, linha, classe/ID e função JS responsável) para editar exatamente o que foi
pedido sem afetar o restante.

## 🗂 Estrutura

```
index.html          → conteúdo e estrutura da página
assets/css/style.css → identidade visual (laranja #FF5C00 + preto)
assets/js/main.js    → abertura Netflix, som, animações GSAP, formulário
```
