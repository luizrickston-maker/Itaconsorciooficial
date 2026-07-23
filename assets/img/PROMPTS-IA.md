# Prompts de imagem — 12 produtos (Ita Consórcios)

> Para colar em **Nano Banana**, **Midjourney**, **DALL-E 3**, **Leonardo** ou similar.
> Resultado esperado: ilustração fotográfica realista, paleta laranja/preto da marca, alto padrão.

## Especificações técnicas

| Card | Proporção | Tamanho ideal | Tamanho mínimo | Formato |
| --- | --- | --- | --- | --- |
| Bento WIDE (casa, carro, quitação, investimento) | **16:9** | 1600×900 px | 1280×720 px | JPG q85 ou WebP |
| Bento normal (outros 8) | **4:3** | 1200×900 px | 1000×750 px | JPG q85 ou WebP |

**Peso alvo por imagem:** 150-250 KB. **Brand mark:** nunca aparecer texto, logo ou selo na imagem.

---

## Prompt base (cola antes de cada produto)

```plaintext
Photorealistic commercial photography, cinematic composition, premium editorial quality, golden hour backlight with deep shadows, color grading featuring warm orange (#FF5C00) highlights and rich black (#0A0A0B) tones, shallow depth of field f/2.8, 35mm lens, no text, no logo, no watermark, no people facing camera with visible identity, 8k detail, pro retouching, --ar [16:9 ou 4:3] --style raw --q 2
```

Substitua o `[...]` pela proporção do card e cole o trecho "Subject" de cada produto abaixo.

---

## 1. Casa (bento WIDE · 16:9)

**Subject:** A modern single-family house at golden hour, large glass windows reflecting warm sunset, landscaped garden with ornamental grass, contemporary architecture with wood and concrete facade, slightly elevated three-quarter angle, beautiful natural lighting casting long shadows, suburban street blurred in background.

**Negative:** no pool, no people in foreground, no cartoon style, no oversaturated colors.

## 2. Apartamento (4:3)

**Subject:** Exterior of a modern luxury apartment building at dusk, illuminated windows glowing warm orange, sleek contemporary facade with balconies, low angle view from street corner with bokeh lights, urban sophistication, cinematic atmosphere, sophisticated architecture.

**Negative:** no people walking, no cars in foreground, no daytime sky.

## 3. Terreno (4:3)

**Subject:** Aerial top-down view of a flat residential terrain plot ready for construction, surrounded by green trees and neighboring houses, soft morning mist, subtle demarcation lines visible, Brazilian suburban neighborhood context, real estate development photography.

**Negative:** no construction equipment visible, no workers, no commercial buildings.

## 4. Construção (4:3)

**Subject:** Construction site in progress, modern Brazilian house being built, exposed brick walls and steel structure, scaffolding visible, warm golden dust particles floating in backlight, mid-progress authentic documentation, industrial documentary style with premium aesthetic.

**Negative:** no workers in foreground, no heavy machinery visible, no finished interior.

## 5. Carro (bento WIDE · 16:9)

**Subject:** A sleek modern sedan parked on a Brazilian city street at night, dramatic orange-tinted street light reflecting on polished body, low cinematic angle, dark urban background with bokeh, automotive commercial photography, premium feel, sophisticated atmosphere.

**Negative:** no people near car, no daytime, no racing/motion.

## 6. Moto (4:3)

**Subject:** A modern sport motorcycle parked on empty asphalt road at golden hour, dramatic three-quarter angle, sunset light glowing through wheel spokes, motion-blurred background suggesting speed, Brazilian highway context with blurred vegetation, premium automotive photography.

**Negative:** no rider visible, no helmet on bike, no multiple vehicles.

## 7. Quitação de financiamento (bento WIDE · 16:9)

**Conceito em 1 frase:** A mão cortando com tesoura um cartão de crédito pesado/premium no meio — gesto de libertar-se da dívida.

**Subject:** Close-up dramatic shot of a single hand holding classic metal scissors cutting through the center of a premium black-and-gold credit card, mid-action frozen in time, the cut creating a clean slice through the card, soft home environment in background with warm golden bokeh, the moment capturing financial liberation, dramatic shallow depth of field, photorealistic commercial photography, premium and editorial quality, cinematic lighting with warm orange highlights on the metallic scissors, the card's chip and embossed numbers clearly visible.

**Negative:** no faces, no person fully visible (only the hand), no celebration confetti, no cash bills, no stock chart in background, no text overlays, no cartoon style.

## 8. Caminhão (4:3)

**Subject:** A modern heavy-duty cargo truck on a Brazilian highway at dusk, dramatic lighting from low sun, mountains or hills blurred in background, professional logistics photography, premium commercial aesthetic, sense of journey and business growth.

**Negative:** no driver visible, no city background, no other vehicles in foreground.

## 9. Cartas contempladas (4:3)

**Subject:** Close-up macro shot of hands holding an official contemplation letter document with Brazilian government-style seal visible, soft focus celebration in background with warm bokeh lights, premium documentary photography, detailed paper texture, warm orange tones.

**Negative:** no faces visible, no full document readable, no other documents stacked.

## 10. Reforma (4:3)

**Subject:** Interior of a modern Brazilian living room being renovated, fresh white paint being applied, designer furniture partially covered, tools and paint cans nearby, soft natural light from large window, mid-renovation authentic stage, premium interior design photography.

**Negative:** no workers visible, no messy/dirty scene, no cluttered appearance.

## 11. Cirurgia plástica (4:3)

**Subject:** Modern aesthetic clinic interior, sleek and clean with warm minimalist design, soft ambient lighting, premium medical environment, contemporary furniture, blurred silhouette figure in background suggesting privacy, professional healthcare photography, sophisticated and reassuring atmosphere.

**Negative:** no faces visible, no medical equipment in foreground, no clinical/hospital feel.

## 12. Investimento (bento WIDE · 16:9)

**Conceito em 1 frase:** Pilha crescente de barras douradas (riqueza acumulada) com um imóvel moderno no topo da última barra — alegoria visual de "consórcio como construção patrimonial".

**Subject:** A dramatic ascending stack of golden luminous bars growing from left to right, each bar taller than the previous, placed on a polished dark surface, the tallest bar on the right topped with a miniature modern Brazilian house model, the bars glowing with warm orange light from within, dark sophisticated background with subtle bokeh, the composition suggesting exponential wealth accumulation through disciplined monthly contributions, premium wealth-management aesthetic, photorealistic product photography style, cinematic lighting, the scene reads instantly as "investment growth" without needing any text or numbers, golden hour ambient glow.

**Negative:** no text, no numbers on bars, no hands touching the bars, no coins stacked, no piggy bank, no dollar/euro symbols, no stock chart in background, no faces, no cartoon style.

---

## Fluxo de uso

1. **Gera uma por vez** pra ter controle de qualidade. Cole o "Subject" + "Negative" depois do prompt base.
2. **Faz upscale** se necessário (Magnific, Topaz, ou o upscaler nativo da ferramenta).
3. **Salva em `assets/img/`** com o nome exato do HTML:

```plaintext
casa.jpg  apartamento.jpg  terreno.jpg  construcao.jpg
carro.jpg  moto.jpg  quitacao.jpg  caminhao.jpg
cartas.jpg  reforma.jpg  cirurgia.jpg  investimento.jpg
```

(Os caminhos no HTML ainda apontam pra .png — depois eu troco pra .jpg pra você baixar mais leve.)

1. **Confere paleta**: se a imagem sair muito "fria" ou "branca", pede uma variação com mais laranja/quente.

---

## Bônus — OG Cover (1200×630) pro compartilhamento

> Imagem que aparece no preview quando alguém compartilha o site no WhatsApp / LinkedIn / Facebook / Slack. Deve ser **clean e legível em thumbnail**.

**Prompt:**

```plaintext
Minimalist premium cover image, 1200x630, deep black background (#0A0A0B), abstract orange glow on the right side simulating financial growth or aspirational lifestyle, subtle Brazilian urban skyline silhouette in the lower third, brand wordmark area reserved in the upper-left quadrant (will be added in post), cinematic, no text, no logos, photorealistic with graphic design influence, low detail in center to allow overlay text, 8k
```

**Onde salvar:** `assets/img/og-cover.jpg` (1200×630 px, JPG q90, ~150 KB).

---

## Bônus — Ícones dourados opcionais

Se quiser dar um toque de **"selo premium"** aos cards, considere gerar versões douradas/aniladas dos ícones SVG atuais (`i-home`, `i-car`, `i-truck` etc.) com gradiente laranja→branco. Aplicação manual em cada `<symbol>` no HTML. **Recomendo só se a paleta atual parecer "rasa" depois que tudo estiver no ar.**
