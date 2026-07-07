# Conceptual City — Handoff para Claude Code (Deploy Vercel)

**Objetivo:** publicar o site institucional da Conceptual City (mão de obra qualificada para construção, PT/ES) na Vercel, a partir dos ficheiros deste pacote.

**Estado:** site estático, single-page, pronto a servir. Sem build step, sem framework. Validado localmente — 12/12 imagens carregam, 0 erros.

---

## 1. Estrutura do pacote

```
handoff/
├── public/
│   ├── index.html              # site completo V1.2 (188 KB, referencia /img/*)
│   └── img/                    # 13 ficheiros (~2 MB total)
│       ├── logo-conceptualcity.png
│       ├── hero-sunset.jpg           (fundo hero)
│       ├── strip-andaimes.jpg        (faixa diferenciais)
│       ├── cta-aerea.jpg             (fundo banner CTA)
│       ├── about-equipa.jpg          (card Equipas especializadas)
│       ├── about-gruas.jpg           (card Capacidade de resposta)
│       ├── pilares-equipa.jpg        (secção pilares + projeto 05)
│       ├── projeto-01-armaduras.jpg
│       ├── projeto-02-estaleiro.jpg
│       ├── servico-01-maodeobra.jpg
│       ├── servico-02-edificacao.jpg
│       ├── servico-03-obracivil.jpg
│       └── servico-04-auxiliares.jpg
├── vercel.json                 # cache de imagens + headers de segurança
└── .gitignore
```

O `index.html` referencia imagens por caminho absoluto (`/img/...`). Na Vercel, tudo dentro de `public/` é servido a partir da raiz, portanto `/img/hero-sunset.jpg` resolve para `public/img/hero-sunset.jpg`. Não alterar estes caminhos.

---

## 2. Deploy — caminho recomendado (Vercel CLI)

Como é site estático puro, o deploy é direto. A partir da pasta `handoff/`:

```bash
# 1. instalar CLI (se necessário)
npm i -g vercel

# 2. autenticar
vercel login

# 3. deploy de preview (gera URL temporário para validar)
vercel

# 4. deploy de produção
vercel --prod
```

Quando o CLI perguntar:
- **Set up and deploy?** → Yes
- **Which scope?** → conta/equipa do cliente
- **Link to existing project?** → No (primeiro deploy)
- **Project name?** → `conceptual-city`
- **In which directory is your code located?** → `./` (a `handoff/` já é a raiz)
- **Framework Preset?** → **Other** (é estático, sem framework)
- **Build Command / Output Directory / Install Command** → deixar vazios (Enter). A Vercel serve `public/` automaticamente.

## 2b. Alternativa — deploy via Git (recomendado para o cliente manter)

1. Criar repositório Git com o conteúdo de `handoff/`.
2. Em vercel.com → **Add New Project** → importar o repositório.
3. **Framework Preset: Other**. Build Command e Output vazios.
4. Deploy. Cada `git push` passa a fazer redeploy automático.

---

## 3. Domínio

Depois do deploy, associar o domínio do cliente:

1. Vercel → Project → **Settings → Domains** → adicionar (ex.: `conceptualcity.es` e `www.conceptualcity.es`).
2. Configurar DNS no registrar:
   - `A` root → `76.76.21.21`
   - `CNAME` www → `cname.vercel-dns.com`
   (a Vercel mostra os valores exatos no painel — usar os que ela indicar).
3. Definir redirect de `www` → root (ou vice-versa) conforme preferência.
4. SSL é automático (Let's Encrypt).

> **Nota:** o site atual da Conceptual City está no domínio `.es` e foi produzido pela Beedigital. Confirmar com o cliente se o deploy substitui o domínio principal ou vai para um subdomínio de teste (ex.: `novo.conceptualcity.es`) antes do corte.

---

## 4. Verificação pós-deploy (checklist)

- [ ] Homepage carrega e o hero mostra a foto de fundo (não fundo preto).
- [ ] As 12 imagens carregam (4 serviços, 2 cards about, 3 projetos, pilares, hero, strip, cta).
- [ ] Toggle PT/ES visível na navbar (ver secção 6 sobre o estado da tradução).
- [ ] Menu hambúrguer funciona em mobile (<820px).
- [ ] Links de contacto funcionam: `tel:+34649803134`, `mailto:cityconceptual@gmail.com`, `wa.me/34649803134`.
- [ ] Secção "Perfis técnicos" aparece em fundo claro (é intencional).
- [ ] Lighthouse: Performance ≥ 90, Acessibilidade ≥ 90.

---

## 5. Otimizações opcionais (se houver tempo — não bloqueiam o deploy)

Todas melhoram performance mas o site já funciona sem elas:

1. **Converter imagens para WebP/AVIF.** As JPEG atuais somam ~2 MB. Converter para WebP reduz ~30-50% sem perda visível. Manter os JPEG como fallback ou usar `<picture>`.
2. **`width`/`height` explícitos nas `<img>`** para evitar layout shift (CLS). As imagens abaixo da dobra já têm `loading="lazy"`.
3. **Preload do hero:** adicionar no `<head>`:
   `<link rel="preload" as="image" href="/img/hero-sunset.jpg">` — melhora o LCP.
4. **Self-host da fonte Inter** (atualmente vem do Google Fonts) para eliminar uma dependência externa e ganhar no LCP.

---

## 6. Pontos em aberto (decisões do cliente — NÃO alterar sem confirmar)

1. **Tradução ES incompleta.** O toggle PT/ES está presente e ativo na navbar, mas a tradução automática de conteúdo ainda não foi implementada — o corpo do site está em PT. Duas opções a validar com o cliente:
   - (a) Implementar i18n completo (dicionário PT/ES aplicado via `data-i18n`), ou
   - (b) Remover o toggle até haver conteúdo ES.
   **Não assumir** — perguntar ao cliente qual seguir.

2. **Email institucional.** O site usa `cityconceptual@gmail.com` (Gmail genérico). Para credibilidade B2B, recomenda-se migrar para `info@conceptualcity.es`. Manter o Gmail apenas se o cliente confirmar.

3. **Placeholders de projetos.** O grid de "Projetos" tem 3 fotos reais e 3 espaços vazios propositados (cards "Projeto 03/04/06"), à espera de fotos de obras a documentar. Manter os espaços — são intencionais, não são bug.

---

## 7. Conteúdo — regra de ouro

Todo o texto do site é factual e verificado a partir do site oficial (conceptualcity.es) e de bases públicas. **Não inventar** dados, números, clientes, certificações ou casos de sucesso. Qualquer conteúdo novo tem de vir do cliente.

---

**Resumo para execução:** `cd handoff && vercel --prod`, Framework Preset = Other, sem build. Depois associar domínio e correr a checklist da secção 4.
