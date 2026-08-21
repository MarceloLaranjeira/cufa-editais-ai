# CUFA Editais AI — v2.0

**Sistema Inteligente de Captação de Recursos, Análise de Editais e Geração de Propostas para a Central Única das Favelas (CUFA)**

---

## Links do Projeto

| Ambiente | URL |
|---|---|
| **Produção Vercel (Oficial)** | [https://cufa-editais-ai.vercel.app](https://cufa-editais-ai.vercel.app) |
| **Repositório GitHub** | [https://github.com/MarceloLaranjeira/cufa-editais-ai](https://github.com/MarceloLaranjeira/cufa-editais-ai) |
| **GitHub Pages** | [https://marcelolaranjeira.github.io/cufa-editais-ai/](https://marcelolaranjeira.github.io/cufa-editais-ai/) |
| **Desenvolvimento Local** | `http://localhost:8085` |

---

## Sobre o Sistema


---

## Funcionalidades v2.0

| Módulo | Descrição |
|---|---|
| **Dashboard Analytics** | Gráficos Chart.js em tempo real: Match Score por edital, Status do Vault, Alertas por API |
| **Squad de 6 Agentes IA** | Terminal interativo com Sentinela, Auditor, Redator, QC, Jurídico e Memória |
| **Gerador de PDF Real** | Export jsPDF com cabeçalho CUFA, Matriz Orçamentária e certidões habilitadas |
| **WhatsApp** | Compartilhamento de proposta formatada via link wa.me |
| **Calendário .ics** | Export de prazos com 2 alertas automáticos (7 dias + último dia) |
| **E-mail** | Mailto estruturado com resumo completo da proposta |
| **Monitor PNCP ao Vivo** | Integração real com API do Portal Nacional de Contratações Públicas |
| **Cofre de Documentos** | Gestão de certidões de todas as unidades estaduais da CUFA |
| **Memória Institucional** | Auto-ajuste baseado em histórico de propostas aprovadas |
| **PWA** | Instalável como app desktop/mobile + Service Worker offline |

---

## Estrutura do Projeto

```
cufa-edital-ai/
├── index.html              # SPA principal (8 abas de navegação)
├── styles.css              # Design system premium modo escuro CUFA
├── app.js                  # Motor IA: Chart.js, jsPDF, PNCP API, Toast, PWA
├── manifest.json           # PWA manifest (instalável como app)
├── sw.js                   # Service Worker (cache offline)
├── netlify.toml            # Deploy 1 clique Netlify
├── data/
│   ├── cufa_vault.js       # Banco de certidões multi-estado CUFA
│   ├── sample_editais.js   # Editais de exemplo (BNDES, Petrobras, Rouanet...)
│   ├── agents_squad.js     # Definição dos 6 Agentes de IA
│   ├── cufa_memory.js      # Memória institucional + regras de auto-ajuste
│   └── realtime_feed.js    # Feed de alertas de APIs governamentais
```

---

## Como Executar Localmente

```bash
# Com Python (já incluído no Windows)
python -m http.server 8085 --directory .

# Com Node.js
npx serve . -p 8085

# Com VS Code: extensão Live Server → botão "Go Live"
```

Acesse: **http://localhost:8085**

---

## Deploy para Produção

### Netlify (Recomendado — 1 clique)

1. Faça fork/upload deste projeto no GitHub
2. Acesse [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Selecione o repositório e clique em **Deploy site**
4. O `netlify.toml` configura automaticamente headers de segurança e cache

### Vercel

```bash
npx vercel --prod
```

### GitHub Pages

```bash
# No repositório GitHub → Settings → Pages → Deploy from branch: main
```

---

## Integrações de APIs

| API | Endpoint | Status |
|---|---|---|
| PNCP | `pncp.gov.br/api/consulta/v1/contratacoes/publicacao` | Integrado (com fallback) |
| Transferegov | `transferegov.sistemas.gov.br/api` | Simulado (webhook) |
| DOU | `in.gov.br/servicos/buscar-no-diario-oficial` | Simulado |
| SALIC | `salic.cultura.gov.br` | Simulado |
| BNDES Fundo Social | Portal BNDES | Simulado |

---

## Tecnologias

- **Frontend**: HTML5 + Vanilla CSS + JavaScript ES2022+
- **Charts**: [Chart.js 4.4](https://www.chartjs.org/)
- **PDF**: [jsPDF 2.5](https://github.com/parallax/jsPDF) + [AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)
- **PWA**: Service Worker + Web App Manifest
- **Fontes**: Google Fonts (Outfit + Inter)
- **Ícones**: SVG vetoriais inline (sem dependência externa)

---

## Agentes de IA da Squad

1. **Sentinela de Editais** (Opus 5 Scanner) — Varre PNCP, DOU, Transferegov em tempo real
2. **Auditor de Compliance** (GPT 5.6 Terra) — Verifica certidões e requisitos formais
3. **Redator Especialista** (Fable 5 + Opus 5) — Escreve Plano de Trabalho e Justificativa Social
4. **Revisor Final QC** (GPT 5.6 Sol) — Controle de qualidade, rubricas e empacotamento
5. **Estrategista Jurídico** (GPT 5.6 Law) — Minutas de Recurso MROSC (Lei 13.019/2014)
6. **Memória & Auto-Ajuste** (Self-Adjusting Engine) — Histórico de submissões e compatibilidade

---

## Licença

Desenvolvido exclusivamente para a **Central Única das Favelas — CUFA Brasil**.

© 2026 CUFA Editais AI v2.0 — Sistema de Inteligência em Captação para Favelas
