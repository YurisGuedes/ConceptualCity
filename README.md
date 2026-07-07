# Conceptual City — Website V1.2

Site institucional estático (mão de obra qualificada para construção, Portugal e Espanha).

## Deploy rápido

```bash
cd handoff
vercel --prod
```

Framework Preset: **Other** · sem build step · a Vercel serve `public/` automaticamente.

## Ficheiros

- `public/index.html` — site completo (referencia `/img/*`)
- `public/img/` — 13 imagens (~2 MB)
- `vercel.json` — cache de imagens + headers de segurança
- `docs/GUIA-DEPLOY-CLAUDE-CODE.md` — **guia completo de deployment** (ler primeiro)

## Antes de publicar (ver guia, secção 6)

1. Decidir sobre tradução ES (toggle presente, conteúdo em PT).
2. Considerar email `info@conceptualcity.es` em vez do Gmail.
3. Os 3 placeholders de projetos são intencionais.

Conteúdo 100% factual — não inventar dados.
