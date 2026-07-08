/* ============================================================
   ITA CONSÓRCIOS — Motion & Interações
   - Abertura cinematográfica com som "ta-dum" sintetizado
     (fade in / fade out suaves)
   - Lenis smooth scroll + GSAP ScrollTrigger
   - Split text, magnetic buttons, cursor follower, tilt 3D,
     marquee infinito, timeline com progresso, spotlight cards
   ============================================================ */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const intro = document.getElementById("intro");
  const introStart = document.getElementById("intro-start");
  const introSkip = document.getElementById("intro-skip");
  const introStage = document.getElementById("intro-stage");
  const site = document.getElementById("site");

  let lenis = null;

  /* ============ SOM "TA-DUM" (Web Audio API) ============
     Impacto orquestral de duas batidas com envelope suave:
     um sopro grave cresce (fade in), as batidas assentam e a
     cauda harmônica se dissolve em silêncio (fade out).      */
  function playTaDum() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;

    const ctx = new Ctx();
    const t0 = ctx.currentTime + 0.05;

    const master = ctx.createGain();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20;
    comp.ratio.value = 5;
    comp.attack.value = 0.01;
    comp.release.value = 0.3;
    master.connect(comp);
    comp.connect(ctx.destination);

    // Envelope global: fade in suave → sustain → fade out longo
    master.gain.setValueAtTime(0.0001, t0);
    master.gain.exponentialRampToValueAtTime(0.85, t0 + 0.4);
    master.gain.setValueAtTime(0.85, t0 + 2.4);
    master.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.9);

    // Sopro de abertura: ruído filtrado crescendo (anuncia o impacto)
    const noiseLen = ctx.sampleRate * 1.4;
    const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) data[i] = (Math.random() * 2 - 1) * 0.6;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    const nFilter = ctx.createBiquadFilter();
    nFilter.type = "lowpass";
    nFilter.frequency.setValueAtTime(180, t0);
    nFilter.frequency.exponentialRampToValueAtTime(900, t0 + 0.55);
    nFilter.frequency.exponentialRampToValueAtTime(120, t0 + 1.3);
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.0001, t0);
    nGain.gain.exponentialRampToValueAtTime(0.14, t0 + 0.5);
    nGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.3);
    noise.connect(nFilter);
    nFilter.connect(nGain);
    nGain.connect(master);
    noise.start(t0);
    noise.stop(t0 + 1.4);

    function thump(time, gainPeak) {
      // Golpe grave arredondado (ataque macio, sem estalo)
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(110, time);
      osc.frequency.exponentialRampToValueAtTime(40, time + 0.32);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, time);
      g.gain.exponentialRampToValueAtTime(gainPeak, time + 0.045);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.6);

      osc.connect(g);
      g.connect(master);
      osc.start(time);
      osc.stop(time + 0.7);
    }

    function chord(time, freqs, dur, gainPeak, type) {
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, time);
      g.gain.exponentialRampToValueAtTime(gainPeak, time + 0.07);
      g.gain.exponentialRampToValueAtTime(0.0001, time + dur);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(360, time);
      filter.frequency.exponentialRampToValueAtTime(1900, time + dur * 0.35);
      filter.frequency.exponentialRampToValueAtTime(240, time + dur);

      g.connect(filter);
      filter.connect(master);

      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.value = f;
        osc.connect(g);
        osc.start(time);
        osc.stop(time + dur + 0.1);
      });
    }

    // "TA" — batida 1: mais curta, entra depois do sopro
    thump(t0 + 0.55, 0.9);
    chord(t0 + 0.55, [73.42, 110.0, 146.83], 0.4, 0.32, "sawtooth"); // D2, A2, D3

    // "DUM" — batida 2: mais grave e longa, dissolvendo devagar
    thump(t0 + 1.0, 1.0);
    chord(t0 + 1.0, [55.0, 82.41, 110.0, 164.81], 2.6, 0.46, "sawtooth"); // A1, E2, A2, E3
    chord(t0 + 1.06, [220.0, 329.63], 2.3, 0.09, "triangle"); // brilho harmônico

    setTimeout(() => ctx.close().catch(() => {}), 4800);
  }

  /* ============ ABERTURA ============ */

  function revealSite() {
    if (!site.hidden) return;
    site.hidden = false;
    document.body.style.overflow = "";
    if (!prefersReducedMotion && window.gsap) {
      gsap.to(intro, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          intro.remove();
          initSite();
          playHeroEntrance();
        },
      });
    } else {
      intro.remove();
      initSite();
    }
  }

  function runIntro(withSound) {
    introStart.style.display = "none";
    introSkip.style.display = "none";
    introStage.style.display = "grid";

    if (prefersReducedMotion || !window.gsap) {
      if (withSound) playTaDum();
      setTimeout(revealSite, withSound ? 1600 : 200);
      return;
    }

    if (withSound) playTaDum();

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: revealSite });

    // O sopro sonoro cresce enquanto a marca emerge do escuro
    tl.fromTo(
      ".intro-mark",
      { scale: 0.84, opacity: 0, filter: "blur(16px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.15, ease: "power2.out" },
      0.05
    )
      // Batida 1 (~0.6s): o nome assenta
      .fromTo(
        ".intro-word",
        { y: 46, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, ease: "power3.out" },
        0.5
      )
      // Batida 2 (~1.05s): onda de luz + subtítulo respirando
      .fromTo(
        ".intro-beam",
        { scale: 0, opacity: 0.85 },
        { scale: 1, opacity: 0, duration: 2.4, ease: "power2.out" },
        1.0
      )
      .fromTo(
        ".intro-sub",
        { opacity: 0, letterSpacing: "1.05em" },
        { opacity: 1, letterSpacing: "0.62em", duration: 1.2, ease: "power2.out" },
        1.1
      )
      .fromTo(
        ".intro-tagline",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        1.65
      )
      // Respiro e saída suave, acompanhando o fade out do som
      .to(
        ".intro-brand",
        { opacity: 0, scale: 1.05, filter: "blur(10px)", duration: 1.0, ease: "power2.inOut" },
        3.15
      );
  }

  document.body.style.overflow = "hidden";
  introStart.addEventListener("click", () => runIntro(true));
  introSkip.addEventListener("click", revealSite);

  /* ============ SPLIT TEXT ============ */

  function splitWords(el) {
    if (el.dataset.splitDone) return el.querySelectorAll(".wi");
    const process = (node) => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(" "));
          } else {
            const w = document.createElement("span");
            w.className = "w";
            const wi = document.createElement("span");
            wi.className = "wi";
            wi.textContent = part;
            w.appendChild(wi);
            frag.appendChild(w);
          }
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1) {
        [...node.childNodes].forEach(process);
      }
    };
    [...el.childNodes].forEach(process);
    el.dataset.splitDone = "1";
    return el.querySelectorAll(".wi");
  }

  /* ============ ENTRADA DO HERO ============ */

  function playHeroEntrance() {
    if (prefersReducedMotion || !window.gsap) return;

    const words = splitWords(document.querySelector("#hero h1"));
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from("#header", { y: -80, opacity: 0, duration: 0.8 })
      .from(".hero-badge", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(words, { yPercent: 115, duration: 0.85, ease: "expo.out", stagger: 0.035 }, "-=0.3")
      .from(".hero-sub", { y: 40, opacity: 0, duration: 0.7 }, "-=0.5")
      .from(".hero-ctas", { y: 30, opacity: 0, duration: 0.6 }, "-=0.45")
      .from(".hero-trust", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".hero-card", { y: 80, opacity: 0, duration: 1.1, ease: "power3.out" }, "-=0.85");
  }

  /* ============ INICIALIZAÇÃO DO SITE ============ */

  function initSite() {
    // Header + barra CTA mobile ao scrollar (independe de GSAP)
    const header = document.getElementById("header");
    const stickyCta = document.getElementById("sticky-cta");
    const onScroll = () => {
      const y = lenis ? lenis.scroll : window.scrollY;
      header.classList.toggle("scrolled", y > 30);
      stickyCta.classList.toggle("visible", y > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Lenis smooth scroll integrado ao ScrollTrigger
    if (!prefersReducedMotion && window.Lenis && window.gsap && window.ScrollTrigger) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenis.on("scroll", () => {
        ScrollTrigger.update();
        onScroll();
      });
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    onScroll();

    // Âncoras internas passam pelo Lenis (com fallback nativo)
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: -90, duration: 1.4 });
        else target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    });

    initScrollAnimations();
    initPointerEffects();
  }

  /* ============ ANIMAÇÕES DE SCROLL ============ */

  function initScrollAnimations() {
    if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // Fade-ups genéricos (os do hero são animados na entrada)
    gsap.utils
      .toArray("[data-anim='fade-up']:not(#hero [data-anim='fade-up']), [data-anim='stat']")
      .forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

    // Títulos de seção com reveal palavra a palavra
    gsap.utils.toArray("h2[data-split]").forEach((el) => {
      const words = splitWords(el);
      gsap.from(words, {
        yPercent: 115,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.03,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // Grades em cascata (bento + depoimentos)
    gsap.utils.toArray(".bento, .testimonials").forEach((grid) => {
      gsap.from(grid.children, {
        y: 56,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: grid, start: "top 82%", once: true },
      });
    });

    // Timeline: linha desenha com o scroll (scrub) + passos acendem
    gsap.to(".timeline-line span", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: ".timeline", start: "top 72%", end: "bottom 58%", scrub: 0.6 },
    });

    gsap.utils.toArray(".step").forEach((step) => {
      gsap.from(step, {
        y: 50,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: step, start: "top 82%", once: true },
      });
      ScrollTrigger.create({
        trigger: step,
        start: "top 68%",
        once: true,
        onEnter: () => step.classList.add("is-active"),
      });
    });

    // Linhas do comparativo deslizam alternadas
    gsap.utils.toArray(".compare-row:not(.compare-head)").forEach((row, i) => {
      gsap.from(row, {
        x: i % 2 ? 60 : -60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 90%", once: true },
      });
    });

    // Formulário de simulação
    gsap.from("[data-anim='form']", {
      y: 70,
      opacity: 0,
      scale: 0.96,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: "[data-anim='form']", start: "top 82%", once: true },
    });

    // CTA final
    gsap.from("[data-anim='final'] > *", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: "#cta-final", start: "top 75%", once: true },
    });

    // Contadores animados
    gsap.utils.toArray(".counter").forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toLocaleString("pt-BR");
        },
      });
    });

    // Parallax suave nos glows do hero
    gsap.to(".hero-glow-1", {
      y: 120,
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to(".hero-glow-2", {
      y: -80,
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1 },
    });
  }

  /* ============ EFEITOS DE PONTEIRO (desktop) ============ */

  function initPointerEffects() {
    if (!finePointer || prefersReducedMotion || !window.gsap) return;

    // Cursor follower: ponto preciso + anel com inércia
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });
    let cursorShown = false;

    window.addEventListener("mousemove", (e) => {
      if (!cursorShown) {
        cursorShown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    });

    const hoverSel = "a, button, summary, input, select, [data-tilt]";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverSel)) ring.classList.add("is-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverSel)) ring.classList.remove("is-hover");
    });

    // Magnetic buttons
    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      const strength = 22;
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(btn, {
          x: (x / r.width) * strength,
          y: (y / r.height) * strength,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      });
    });

    // Tilt 3D + spotlight que segue o mouse
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      const max = card.classList.contains("hero-card") ? 7 : 4;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        gsap.to(card, {
          rotateY: (px - 0.5) * max * 2,
          rotateX: (0.5 - py) * max * 2,
          transformPerspective: 900,
          duration: 0.45,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
      });
    });
  }

  /* ============ FORMULÁRIO → WHATSAPP ============ */

  // ⚠️ Troque pelo número real da Ita Consórcios (DDI+DDD+número, só dígitos)
  const WHATSAPP_NUMBER = "5500000000000";

  document.getElementById("lead-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const msg = [
      "Olá! Quero uma simulação de consórcio.",
      `Nome: ${data.get("nome")}`,
      `WhatsApp: ${data.get("whats")}`,
      `Objetivo: ${data.get("objetivo")}`,
      `Valor desejado: ${data.get("valor")}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener"
    );
  });

  /* ============ MISC ============ */

  document.getElementById("year").textContent = new Date().getFullYear();

  // Máscara simples de telefone BR
  const telInput = document.querySelector("input[name='whats']");
  telInput.addEventListener("input", () => {
    let v = telInput.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    telInput.value = v;
  });
})();
