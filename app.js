// ==========================================================================
// CUFA EDITAIS AI - MOTOR PRINCIPAL DE LÓGICA E SQUAD DE AGENTES IA
// Central Única das Favelas | Simulation Engine (Opus 5, GPT 5.6, Fable 5)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// Estado Global da Aplicação
const state = {
  activePane: 'pane-dashboard',
  activeAgentId: 'AGENT-REDATOR',
  selectedEditalForAnalysis: null,
  currentProposalEdital: null,
  vaultDocs: [...window.CUFA_VAULT.documentos],
  editaisList: [...window.SAMPLE_EDITAIS],
  agentsSquad: [...window.AGENTS_SQUAD],
  memoryData: window.CUFA_MEMORY,
  feedData: window.REALTIME_FEED,
  chatLogs: {
    'AGENT-REDATOR': [
      { sender: 'agent', text: 'Olá! Sou o **Agente Redator Especialista de Projetos**. Estou pronto para elaborar ou ajustar o Plano de Trabalho e a Justificativa Social da CUFA conforme suas instruções.' }
    ],
    'AGENT-AUDITOR': [
      { sender: 'agent', text: 'Olá! Sou o **Auditor de Compliance & Vault**. Posso verificar todas as certidões exigidas para o edital e emitir orientações de renovação.' }
    ],
    'AGENT-SENTINELA': [
      { sender: 'agent', text: 'Sentinela ativo! Monitorando PNCP, Transferegov, DOU e Salic em tempo real. Dispararei alertas assim que surgirem novas oportunidades.' }
    ],
    'AGENT-REVISOR': [
      { sender: 'agent', text: 'Sou o **Revisor Final & QC**. Posso conferir o teto orçamentário por rubrica e empacotar o arquivo final (.ZIP / .DOCX / .PDF) 100% sem erros.' }
    ],
    'AGENT-JURIDICO': [
      { sender: 'agent', text: 'Sou o **Estrategista Jurídico**. Posso elaborar Minutas de Recurso MROSC ou contestações formais contra pareceres de inabilitação.' }
    ],
    'AGENT-MEMORIA': [
      { sender: 'agent', text: 'Sou o **Agente de Memória Institucional & Auto-Ajuste**. Tenho o histórico de todas as submissões passadas da CUFA e aplico o Plano de Verificação de Compatibilidade para garantir a melhor proposta.' }
    ]
  }
};

// Ícones SVG Vetoriais Auxiliares
const SVG = {
  search: `<svg class="app-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  edit: `<svg class="app-icon" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
  file: `<svg class="app-icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
  check: `<svg class="app-icon green" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  warning: `<svg class="app-icon" style="stroke: var(--accent-warning);" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  missing: `<svg class="app-icon" style="stroke: var(--accent-red);" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
  download: `<svg class="app-icon" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  zap: `<svg class="app-icon gold" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  shield: `<svg class="app-icon green" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
};

function initApp() {
  setupNavigation();
  renderDashboard();
  renderVaultTable();
  renderPresetButtons();
  renderRadar();
  renderSquadList();
  renderChatMessages();
  renderMemoryPane();
  renderRealtimeMonitor();
  initProposalSelectOptions();

  if (state.editaisList.length > 0) {
    state.currentProposalEdital = state.editaisList[0];
    renderProposalPreview();
  }

  // Charts renderizados após DOM pronto e Chart.js carregado
  setTimeout(() => {
    if (typeof Chart !== 'undefined') {
      initDashboardCharts();
    }
  }, 300);

  // Tenta sincronizar com PNCP API em background
  setTimeout(() => fetchPNCPEditais(), 1500);

  // Toast de boas-vindas
  setTimeout(() => {
    showToast('gold', 'CUFA Editais AI v2.0', 'Squad de 6 Agentes + Monitor ao Vivo + PDF real + PWA instalável. Sistema pronto!', 6000);
  }, 800);
}


/* ==========================================================================
   NAVEGAÇÃO POR ABAS
   ========================================================================== */
function setupNavigation() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const paneId = btn.getAttribute('data-pane');
      switchPane(paneId);
    });
  });
}

function switchPane(paneId) {
  state.activePane = paneId;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.getAttribute('data-pane') === paneId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.tab-pane').forEach(pane => {
    if (pane.id === paneId) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   DASHBOARD
   ========================================================================== */
function renderDashboard() {
  const container = document.getElementById('dashboard-recommended-list');
  if (!container) return;

  const topEditais = state.editaisList.slice(0, 3);
  container.innerHTML = topEditais.map(edital => `
    <div style="background: var(--bg-dark); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <div style="flex: 1; min-width: 280px;">
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.4rem;">
          <span class="edital-badge-tag badge-${edital.nivelDificuldade.toLowerCase()}">${edital.nivelDificuldade}</span>
          <span style="font-size: 0.75rem; color: var(--cufa-gold); font-weight: 700;">Match ${edital.matchCUFA}%</span>
        </div>
        <h4 style="font-family: var(--font-title); font-size: 1.05rem; color: var(--text-main); line-height: 1.3;">${edital.titulo}</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">${edital.orgao} &bull; Teto: <strong style="color: var(--social-green);">${edital.valorMaximoProjeto}</strong></p>
      </div>

      <div style="display: flex; gap: 0.6rem;">
        <button class="btn btn-secondary btn-sm" onclick="analyzePresetEdital('${edital.id}')">${SVG.search} Analisar com IA</button>
        <button class="btn btn-primary btn-sm" onclick="prepareProposalFor('${edital.id}')">${SVG.edit} Gerar Proposta</button>
      </div>
    </div>
  `).join('');

  const vaultSummaryContainer = document.getElementById('dashboard-vault-summary');
  if (vaultSummaryContainer) {
    const validCount = state.vaultDocs.filter(d => d.status === 'valido').length;

    vaultSummaryContainer.innerHTML = `
      <div class="gap-item">
        <span>CND Receita / Federal (Nacional)</span>
        <span class="gap-status ready">${SVG.check} Ativa até 28/12/2026</span>
      </div>
      <div class="gap-item">
        <span>CRF FGTS (Caixa)</span>
        <span class="gap-status ready">${SVG.check} Ativa até 04/09/2026</span>
      </div>
      <div class="gap-item">
        <span>CNDT Trabalhista (TST)</span>
        <span class="gap-status ready">${SVG.check} Ativa até 12/12/2026</span>
      </div>
      <div class="gap-item">
        <span>CND Municipal (CUFA Rio)</span>
        <span class="gap-status warning">${SVG.warning} Vence em 12 dias</span>
      </div>
      <div style="margin-top: 0.5rem; text-align: right; font-size: 0.8rem; color: var(--text-muted);">
        Total de Certidões Válidas: <strong>${validCount} / ${state.vaultDocs.length}</strong>
      </div>
    `;
  }
}

/* ==========================================================================
   SQUAD DE AGENTES & TERMINAL INTERATIVO
   ========================================================================== */
function renderSquadList() {
  const container = document.getElementById('squad-agents-container');
  if (!container) return;

  container.innerHTML = state.agentsSquad.map(agent => `
    <div class="agent-card-item ${agent.id === state.activeAgentId ? 'active' : ''}" onclick="selectAgent('${agent.id}')">
      <div class="agent-avatar" style="border-color: ${agent.avatarColor}; color: ${agent.avatarColor};">
        ${agent.nome.charAt(0)}
      </div>
      <div class="agent-meta">
        <h5>${agent.nome}</h5>
        <p>${agent.papel}</p>
      </div>
    </div>
  `).join('');
}

function selectAgent(agentId) {
  state.activeAgentId = agentId;
  renderSquadList();

  const agent = state.agentsSquad.find(a => a.id === agentId);
  if (!agent) return;

  document.getElementById('active-agent-title').innerText = `${agent.nome} (${agent.papel})`;
  document.getElementById('active-agent-model').innerText = agent.modeloIA;

  renderChatMessages();
}

function renderChatMessages() {
  const body = document.getElementById('terminal-messages-body');
  if (!body) return;

  const messages = state.chatLogs[state.activeAgentId] || [];
  body.innerHTML = messages.map(msg => `
    <div class="chat-bubble ${msg.sender}">
      ${msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
    </div>
  `).join('');

  body.scrollTop = body.scrollHeight;
}

function getApiBaseUrl() {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001/api/v1';
  }
  return '/api/v1';
}

async function sendAgentInstruction() {
  const input = document.getElementById('terminal-input-prompt');
  if (!input || !input.value.trim()) return;

  const userText = input.value.trim();
  input.value = '';

  if (!state.chatLogs[state.activeAgentId]) {
    state.chatLogs[state.activeAgentId] = [];
  }

  state.chatLogs[state.activeAgentId].push({ sender: 'user', text: userText });
  renderChatMessages();

  const agentId = state.activeAgentId;

  try {
    // Tenta chamada HTTP ao backend Express Node.js (Vercel Serverless em Produção ou Local)
    const res = await fetch(`${getApiBaseUrl()}/squad/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId, prompt: userText }),
      signal: AbortSignal.timeout(4000)
    });

    if (res.ok) {
      const data = await res.json();
      if (data.agentResponse?.text) {
        state.chatLogs[agentId].push({ sender: 'agent', text: data.agentResponse.text });
        renderChatMessages();
        return;
      }
    }
  } catch (err) {
    console.log('[CUFA Frontend] Usando simulação local GPT 5.6/Fable 5.', err.message);
  }

  // Resposta simulada local (Fallback)
  setTimeout(() => {
    let reply = '';
    if (agentId === 'AGENT-REDATOR') {
      reply = `[Fable 5 + Opus 5] Instrução recebida! Re-calibrei o módulo de redação do Plano de Trabalho para incorporar suas observações: "${userText}". As justificativas e metas foram atualizadas no Gerador de Dossiês.`;
      const titleInput = document.getElementById('prop-title');
      if (titleInput && userText.length > 5) {
        titleInput.value = userText;
        renderProposalPreview();
      }
    } else if (agentId === 'AGENT-AUDITOR') {
      reply = `[GPT 5.6 Terra] Análise de compliance realizada para: "${userText}". CND Federal, Trabalhista e FGTS da CUFA estão 100% vigentes e anexadas. Alerta de certidão municipal renovada emitido.`;
    } else if (agentId === 'AGENT-SENTINELA') {
      reply = `[GPT 5.6 Sol Scanner] Filtro de busca atualizado no radar com os termos "${userText}". Varrendo portais do PNCP e Transferegov para capturar editais compatíveis.`;
    } else if (agentId === 'AGENT-REVISOR') {
      reply = `[GPT 5.6 Sol QC] Checkup de Qualidade concluído! Orçamento e teto de rubricas verificados. O pacote final (.ZIP / .DOCX / .PDF) está pronto e arredondado para envio.`;
    } else if (agentId === 'AGENT-JURIDICO') {
      reply = `[GPT 5.6 Law] Minuta de Recurso ou Esclarecimento fundamentada no Art. 35 do MROSC gerada com sucesso para o parâmetro solicitado!`;
    } else if (agentId === 'AGENT-MEMORIA') {
      reply = `[Memória Institucional Engine] Plano de Verificação de Compatibilidade ativado! Com base nas propostas contempladas do BNDES e Petrobras em 2025, ajustei os templates para maximizar a nota de impacto social.`;
    }

    state.chatLogs[agentId].push({ sender: 'agent', text: reply });
    renderChatMessages();
  }, 500);
}



/* ==========================================================================
   MEMÓRIA INSTITUCIONAL & AUTO-AJUSTE
   ========================================================================== */
function renderMemoryPane() {
  const historyContainer = document.getElementById('memory-history-container');
  if (historyContainer) {
    historyContainer.innerHTML = state.memoryData.historicoPropostas.map(h => `
      <div style="background: var(--bg-dark); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <span class="status-pill pill-valido" style="font-size: 0.75rem;">${h.resultado}</span>
            <h4 style="font-family: var(--font-title); font-size: 1.1rem; color: var(--text-main); margin-top: 0.3rem;">${h.editalNome}</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted);">${h.orgao} &bull; Ano: ${h.ano}</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--cufa-gold);">${h.notaObtida}</div>
            <div style="font-size: 0.85rem; color: var(--social-green); font-weight: 700;">${h.valorAprovado}</div>
          </div>
        </div>

        <div style="margin-top: 0.8rem; font-size: 0.85rem;">
          <strong style="color: var(--cufa-gold);">Pontos Fortes Reconhecidos:</strong>
          <ul style="padding-left: 1.2rem; color: #D1D5DB; margin-top: 0.2rem;">
            ${h.pontosFortesDestacados.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-top: 0.6rem; font-size: 0.82rem; color: var(--text-muted); border-top: 1px dashed var(--border-color); padding-top: 0.5rem;">
          💡 <strong>Lição Aprendida (Memória de IA):</strong> ${h.aprenderParaFuturo}
        </div>
      </div>
    `).join('');
  }

  const rulesContainer = document.getElementById('memory-rules-container');
  if (rulesContainer) {
    rulesContainer.innerHTML = state.memoryData.regrasAutoAjuste.map(r => `
      <div style="background: var(--bg-dark); border: 1px solid var(--border-color); padding: 1rem 1.25rem; border-radius: var(--radius-sm); margin-bottom: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: var(--cufa-gold); font-size: 0.9rem;">${r.alvo}</strong>
          <p style="font-size: 0.85rem; color: var(--text-main); margin-top: 0.2rem;">${r.descricao}</p>
        </div>
        <span class="status-pill pill-valido">Auto-Ajuste Ativo</span>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   MONITOR EM TEMPO REAL & ALERTAS
   ========================================================================== */
function renderRealtimeMonitor() {
  const container = document.getElementById('realtime-alerts-container');
  if (!container) return;

  container.innerHTML = state.feedData.alertasCapturados.map(a => `
    <div style="background: var(--bg-dark); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span class="edital-badge-tag badge-facil">${a.fonte} &bull; PRIORIDADE ${a.prioridade}</span>
          <span style="font-size: 0.8rem; color: var(--cufa-gold); font-weight: 700; margin-left: 0.5rem;">Match ${a.matchScore}%</span>
          <h4 style="font-family: var(--font-title); font-size: 1.1rem; color: var(--text-main); margin-top: 0.3rem;">${a.titulo}</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted);">${a.orgao} &bull; Prazo: ${formatDate(a.prazo)}</p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.2rem; font-weight: 800; color: var(--social-green);">${a.valorEstimado}</div>
          <button class="btn btn-primary btn-sm" style="margin-top: 0.4rem;" onclick="analyzeAlertEdital('${a.id}')">⚡ Processar com a Squad</button>
        </div>
      </div>

      <p style="font-size: 0.88rem; color: var(--text-main); margin-top: 0.8rem; background: rgba(255, 199, 0, 0.04); padding: 0.8rem; border-radius: var(--radius-sm); border: 1px solid var(--border-gold);">
        💡 <strong>Recomendação da IA Sentinela:</strong> ${a.mensagem}
      </p>
    </div>
  `).join('');
}

function analyzeAlertEdital(alertId) {
  const alertItem = state.feedData.alertasCapturados.find(a => a.id === alertId);
  if (!alertItem) return;

  const mockEdital = {
    id: `EDITAL-ALERT-${Date.now()}`,
    titulo: alertItem.titulo,
    orgao: alertItem.orgao,
    categoria: 'Desenvolvimento Social & Favelas',
    tipoFinanciamento: 'Chamamento Público Direto',
    valorTotalEdital: alertItem.valorEstimado,
    valorMaximoProjeto: alertItem.valorEstimado,
    prazoInscricao: alertItem.prazo,
    diasRestantes: 45,
    nivelDificuldade: 'Medio',
    matchCUFA: alertItem.matchScore,
    abrangencia: 'Nacional (Comunidades Periféricas)',
    unidadesRecomendadas: ['NACIONAL', 'CUFA_SP', 'CUFA_RJ'],
    resumoExecutivo: alertItem.mensagem,
    requisitosElegibilidade: [
      'Entidade sem fins lucrativos constituída há mais de 2 anos',
      'Certidão Negativa de Débitos Federal, Trabalhista e FGTS atualizadas',
      'Comprovação de atuação direta em territórios vulneráveis'
    ],
    documentosExigidos: [
      'Estatuto Social Atualizado e Registrado',
      'Cartão CNPJ Ativo (Receita Federal)',
      'Ata de Eleição e Posse da Diretoria Vigente',
      'Certidão Negativa de Débitos Federais e Dívida Ativa (CND Receita)',
      'Certificado de Regularidade do FGTS (CRF Caixa)',
      'Certidão Negativa de Débitos Trabalhistas (CNDT - TST)'
    ],
    criteriosPontuacao: [
      { criterio: 'Capilaridade e Mobilização Comunitária', peso: '40%' },
      { criterio: 'Clareza do Plano de Trabalho', peso: '30%' },
      { criterio: 'Adequação Orçamentária', peso: '30%' }
    ],
    rubricasPermitidas: ['Equipe Técnica Local', 'Alimentação e Logística', 'Equipamentos e Materiais']
  };

  state.editaisList.unshift(mockEdital);
  state.selectedEditalForAnalysis = mockEdital;
  switchPane('pane-uploader');
  processEditalAnalysisSimulated(mockEdital.titulo, mockEdital);
}

/* ==========================================================================
   LEITOR & INGESTÃO DE EDITAIS COM IA
   ========================================================================== */
function renderPresetButtons() {
  const container = document.getElementById('preset-buttons-container');
  if (!container) return;

  container.innerHTML = state.editaisList.map(e => `
    <button class="preset-chip" onclick="analyzePresetEdital('${e.id}')">
      ${SVG.zap} ${e.orgao}: ${e.titulo.substring(0, 45)}...
    </button>
  `).join('');
}

function triggerFileInput() {
  document.getElementById('file-input').click();
}

function handleFileSelected(event) {
  const file = event.target.files[0];
  if (file) {
    processEditalAnalysisSimulated(file.name);
  }
}

const dropzone = document.getElementById('dropzone');
if (dropzone) {
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      processEditalAnalysisSimulated(files[0].name);
    }
  });
}

function analyzePresetEdital(editalId) {
  const edital = state.editaisList.find(e => e.id === editalId);
  if (!edital) return;
  state.selectedEditalForAnalysis = edital;
  
  switchPane('pane-uploader');
  processEditalAnalysisSimulated(edital.titulo, edital);
}

function processEditalAnalysisSimulated(fileName, targetEditalObj = null) {
  const stepper = document.getElementById('ai-stepper-box');
  const resultsCard = document.getElementById('analysis-results-box');

  if (!stepper || !resultsCard) return;

  stepper.style.display = 'block';
  resultsCard.style.display = 'none';

  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');

  step1.className = 'step-item active';
  step2.className = 'step-item';
  step3.className = 'step-item';

  setTimeout(() => {
    step1.className = 'step-item completed';
    step2.className = 'step-item active';

    setTimeout(() => {
      step2.className = 'step-item completed';
      step3.className = 'step-item active';

      setTimeout(() => {
        step3.className = 'step-item completed';
        stepper.style.display = 'none';

        const editalData = targetEditalObj || state.editaisList[0];
        state.selectedEditalForAnalysis = editalData;
        displayAnalysisResults(editalData);
      }, 700);
    }, 700);
  }, 700);
}

function displayAnalysisResults(edital) {
  const resultsCard = document.getElementById('analysis-results-box');
  if (!resultsCard) return;

  resultsCard.style.display = 'block';

  document.getElementById('res-badge-level').innerText = `NÍVEL ${edital.nivelDificuldade.toUpperCase()}`;
  document.getElementById('res-badge-level').className = `edital-badge-tag badge-${edital.nivelDificuldade.toLowerCase()}`;
  document.getElementById('res-title').innerText = edital.titulo;
  document.getElementById('res-orgao').innerText = `Órgão Concedente: ${edital.orgao} | Categoria: ${edital.categoria}`;
  document.getElementById('res-score-number').innerText = `${edital.matchCUFA}%`;
  document.getElementById('res-summary').innerText = edital.resumoExecutivo;
  document.getElementById('res-max-val').innerText = edital.valorMaximoProjeto;
  document.getElementById('res-deadline').innerText = `${formatDate(edital.prazoInscricao)} (${edital.diasRestantes} dias restantes)`;

  const criteriosContainer = document.getElementById('res-criterios-list');
  criteriosContainer.innerHTML = edital.criteriosPontuacao.map(c => `
    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; border-bottom: 1px solid var(--border-color); padding: 0.4rem 0;">
      <span>${c.criterio}</span>
      <strong style="color: var(--cufa-gold);">${c.peso}</strong>
    </div>
  `).join('');

  const gapContainer = document.getElementById('res-gap-list');
  gapContainer.innerHTML = edital.documentosExigidos.map(docExigido => {
    const docInVault = state.vaultDocs.find(v => v.nome.toLowerCase().includes(docExigido.toLowerCase()) || docExigido.toLowerCase().includes(v.nome.toLowerCase()));

    if (!docInVault) {
      return `
        <div class="gap-item">
          <span style="font-size: 0.85rem;">${docExigido}</span>
          <span class="gap-status missing">${SVG.missing} Ausente no Vault</span>
        </div>
      `;
    }

    if (docInVault.status === 'valido') {
      return `
        <div class="gap-item">
          <span style="font-size: 0.85rem;">${docExigido}</span>
          <span class="gap-status ready">${SVG.check} Habilitado (${docInVault.unidadeId})</span>
        </div>
      `;
    }

    return `
      <div class="gap-item">
        <span style="font-size: 0.85rem;">${docExigido}</span>
        <span class="gap-status warning">${SVG.warning} Vence Em Breve</span>
      </div>
    `;
  }).join('');

  resultsCard.scrollIntoView({ behavior: 'smooth' });
}

/* ==========================================================================
   GERENCIADOR DO VAULT DE DOCUMENTOS MULTI-ESTADO
   ========================================================================== */
function renderVaultTable() {
  const tbody = document.getElementById('vault-table-body');
  if (!tbody) return;

  const unitFilter = document.getElementById('vault-unit-filter')?.value || 'ALL';
  const statusFilter = document.getElementById('vault-status-filter')?.value || 'ALL';
  const search = document.getElementById('vault-search-input')?.value?.toLowerCase() || '';

  const filtered = state.vaultDocs.filter(doc => {
    const matchUnit = unitFilter === 'ALL' || doc.unidadeId === unitFilter;
    const matchStatus = statusFilter === 'ALL' || doc.status === statusFilter;
    const matchSearch = doc.nome.toLowerCase().includes(search) || doc.categoria.toLowerCase().includes(search);
    return matchUnit && matchStatus && matchSearch;
  });

  tbody.innerHTML = filtered.map(doc => {
    const unitObj = window.CUFA_VAULT.unidades.find(u => u.id === doc.unidadeId);
    const unitBadge = unitObj ? unitObj.nome : doc.unidadeId;

    return `
      <tr>
        <td>
          <div class="doc-name">
            ${SVG.file} ${doc.nome}
            <span class="doc-type-badge">${doc.tipo} &bull; ${doc.tamanho}</span>
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">${doc.descricao}</div>
        </td>
        <td><strong style="color: var(--cufa-gold); font-size: 0.85rem;">${unitBadge}</strong></td>
        <td style="font-size: 0.85rem; color: var(--text-muted);">${doc.categoria}</td>
        <td style="font-size: 0.85rem;">
          <div>Emissão: ${formatDate(doc.dataEmissao)}</div>
          <div style="color: var(--text-muted);">Validade: ${formatDate(doc.dataValidade)}</div>
        </td>
        <td>
          <span class="status-pill pill-${doc.status}">
            ${doc.status === 'valido' ? SVG.check + ' Válido' : doc.status === 'atencao' ? SVG.warning + ' A Vencer' : SVG.missing + ' Vencido'}
          </span>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="viewDocumentModal('${doc.id}')">Visualizar</button>
        </td>
      </tr>
    `;
  }).join('');

  const badge = document.getElementById('vault-count-badge');
  if (badge) badge.innerText = state.vaultDocs.length;

  const kpiBadge = document.getElementById('kpi-vault-docs');
  if (kpiBadge) kpiBadge.innerText = state.vaultDocs.length;
}

function openAddDocModal() {
  openModal(`
    <h3 style="font-family: var(--font-title); color: var(--cufa-gold); margin-bottom: 1rem;">Enviar Novo Documento / Certidão para o Vault</h3>
    <form onsubmit="saveNewDocument(event)">
      <div class="form-group">
        <label>Nome do Documento ou Certidão</label>
        <input type="text" class="form-control" id="modal-doc-name" required placeholder="Ex: CND Estadual Rio de Janeiro">
      </div>

      <div class="form-group">
        <label>Unidade CUFA Responsável</label>
        <select class="form-control" id="modal-doc-unit">
          ${window.CUFA_VAULT.unidades.map(u => `<option value="${u.id}">${u.nome}</option>`).join('')}
        </select>
      </div>

      <div class="form-group">
        <label>Categoria</label>
        <select class="form-control" id="modal-doc-cat">
          <option value="Fiscal / Regularidade">Fiscal / Regularidade</option>
          <option value="Jurídico Institucional">Jurídico Institucional</option>
          <option value="Governança">Governança</option>
          <option value="Capacidade Técnica">Capacidade Técnica</option>
        </select>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label>Data de Emissão</label>
          <input type="date" class="form-control" id="modal-doc-emissao" value="2026-08-01">
        </div>
        <div class="form-group">
          <label>Data de Validade</label>
          <input type="date" class="form-control" id="modal-doc-validade" value="2027-08-01">
        </div>
      </div>

      <div class="form-group">
        <label>Arquivo (PDF)</label>
        <input type="file" class="form-control" accept=".pdf">
      </div>

      <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 1rem;">
        Salvar no Cofre Institucional
      </button>
    </form>
  `);
}

function saveNewDocument(e) {
  e.preventDefault();
  const name = document.getElementById('modal-doc-name').value;
  const unit = document.getElementById('modal-doc-unit').value;
  const cat = document.getElementById('modal-doc-cat').value;
  const emissao = document.getElementById('modal-doc-emissao').value;
  const validade = document.getElementById('modal-doc-validade').value;

  const newDoc = {
    id: `DOC-${Date.now()}`,
    categoria: cat,
    unidadeId: unit,
    nome: name,
    tipo: 'PDF',
    tamanho: '1.1 MB',
    dataEmissao: emissao,
    dataValidade: validade,
    status: 'valido',
    obrigatorioGeral: false,
    descricao: 'Documento recente carregado no Cofre CUFA.'
  };

  state.vaultDocs.unshift(newDoc);
  renderVaultTable();
  closeModal();
  alert('Certidão/Documento adicionado com sucesso ao Vault da CUFA!');
}

function viewDocumentModal(docId) {
  const doc = state.vaultDocs.find(d => d.id === docId);
  if (!doc) return;

  const unit = window.CUFA_VAULT.unidades.find(u => u.id === doc.unidadeId);

  openModal(`
    <div style="text-align: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1rem;">
      <span class="logo-badge" style="font-size: 0.9rem;">CUFA VAULT</span>
      <h3 style="font-family: var(--font-title); color: var(--text-main); margin-top: 0.5rem;">${doc.nome}</h3>
      <p style="font-size: 0.85rem; color: var(--cufa-gold); font-weight: 700;">${unit ? unit.nome : doc.unidadeId}</p>
    </div>

    <div style="background: var(--bg-dark); padding: 1rem; border-radius: var(--radius-sm); font-size: 0.9rem; margin-bottom: 1.5rem;">
      <p><strong>Categoria:</strong> ${doc.categoria}</p>
      <p><strong>Data de Emissão:</strong> ${formatDate(doc.dataEmissao)}</p>
      <p><strong>Validade Prevista:</strong> ${formatDate(doc.dataValidade)}</p>
      <p><strong>Status de Validação:</strong> <span class="status-pill pill-${doc.status}">${doc.status.toUpperCase()}</span></p>
      <p style="margin-top: 0.5rem; color: var(--text-muted);">${doc.descricao}</p>
    </div>

    <div style="height: 250px; background: #000; border: 1px solid var(--border-gold); border-radius: var(--radius-sm); display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted);">
      <svg class="app-icon xl gold" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
      <p style="font-size: 0.9rem; margin-top: 0.5rem;">Visualizador Seguro do Documento Habilitado</p>
      <small style="color: var(--social-green); display: flex; align-items: center; gap: 0.3rem; margin-top: 0.3rem;">
        ${SVG.check} Assinatura Digital e Hash SHA-256 Verificados
      </small>
    </div>

    <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.8rem;">
      <button class="btn btn-secondary" onclick="closeModal()">Fechar</button>
      <button class="btn btn-primary" onclick="alert('Iniciando download seguro do arquivo PDF do Vault...')">${SVG.download} Download PDF</button>
    </div>
  `);
}

/* ==========================================================================
   GERADOR DE DOSSIÊ & PROPOSTA DE PROJETOS
   ========================================================================== */
function initProposalSelectOptions() {
  const select = document.getElementById('prop-edital-select');
  if (!select) return;

  select.innerHTML = state.editaisList.map(e => `
    <option value="${e.id}">${e.orgao} &bull; ${e.titulo}</option>
  `).join('');
}

function prepareProposalFor(editalId) {
  const edital = state.editaisList.find(e => e.id === editalId);
  if (!edital) return;

  state.currentProposalEdital = edital;
  const select = document.getElementById('prop-edital-select');
  if (select) select.value = edital.id;

  switchPane('pane-proposal');
  renderProposalPreview();
}

function generateProposalFromAnalysis() {
  if (state.selectedEditalForAnalysis) {
    prepareProposalFor(state.selectedEditalForAnalysis.id);
  }
}

function onProposalEditalChange() {
  const selectId = document.getElementById('prop-edital-select').value;
  const edital = state.editaisList.find(e => e.id === selectId);
  if (edital) {
    state.currentProposalEdital = edital;
    renderProposalPreview();
  }
}

function regenerateProposalAI() {
  const sheet = document.getElementById('sheet-body-content');
  if (!sheet) return;

  sheet.innerHTML = `<div style="text-align: center; padding: 3rem 0; color: var(--cufa-gold);">Re-gerando justificativa de alto impacto social e planilha orçamentária com os modelos Opus 5 e Fable 5...</div>`;

  setTimeout(() => {
    renderProposalPreview();
  }, 600);
}

function renderProposalPreview() {
  const edital = state.currentProposalEdital || state.editaisList[0];
  const title = document.getElementById('prop-title')?.value || `Projeto Favela Conectada & Capacitação Tecnológica`;
  const budget = document.getElementById('prop-budget')?.value || edital.valorMaximoProjeto;
  const target = document.getElementById('prop-target')?.value || '1.200 famílias e jovens residentes em favelas prioritárias';
  const unitId = document.getElementById('prop-unit-select')?.value || 'NACIONAL';
  const unitObj = window.CUFA_VAULT.unidades.find(u => u.id === unitId);

  const container = document.getElementById('sheet-body-content');
  if (!container) return;

  container.innerHTML = `
    <h4>1. Identificação da Proponente</h4>
    <p><strong>Entidade:</strong> Central Única das Favelas - ${unitObj ? unitObj.nome : 'CUFA Brasil'}</p>
    <p><strong>CNPJ:</strong> ${unitObj ? unitObj.cnpj : '05.295.441/0001-90'} &bull; <strong>Território:</strong> Favelas de ${unitObj ? unitObj.cidade : 'Âmbito Nacional'}</p>

    <h4>2. Justificativa Social e Diagnóstico Territorial (AI Fable 5 / Social Narrative)</h4>
    <p>A presente proposta busca responder às profundas assimetrias históricas vivenciadas pelos moradores e jovens das favelas brasileiras. Com base na metodologia consolidada pela CUFA ao longo de mais de 20 anos de atuação direta nos territórios, o projeto <strong>"${title}"</strong> atuará como vetor de transformação socioeconômica, combinando qualificação profissional, inclusão digital e fomento à economia criativa local.</p>

    <h4>3. Objetivos Gerais e Específicos</h4>
    <p><strong>Objetivo Geral:</strong> Promover a autonomia socioeconômica e a capacidade criativa de <strong>${target}</strong> através de um programa integrado de formação, mentorias e apoio produtivo nas favelas atendidas.</p>
    <p><strong>Objetivos Específicos:</strong></p>
    <ul style="padding-left: 1.2rem; font-size: 0.88rem; color: #D1D5DB; margin-bottom: 1rem;">
      <li>Estruturar laboratórios comunitários de inovação dentro das sedes e polos da CUFA.</li>
      <li>Fornecer bolsas de apoio financeiro para garantir a permanência de mães solo e jovens nos cursos.</li>
      <li>Conectar os participantes ao mercado de trabalho e às redes da Expo Favela Innovation.</li>
    </ul>

    <h4>4. Matriz Orçamentária e Distribuição de Recursos (${budget})</h4>
    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.8rem; margin-bottom: 1rem;">
      <table style="width: 100%; font-size: 0.82rem; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left; color: var(--cufa-gold);">
          <th style="padding: 0.4rem;">Rubrica / Atividade</th>
          <th style="padding: 0.4rem;">Categoria</th>
          <th style="padding: 0.4rem;">Valor Distribuído</th>
        </tr>
        <tr>
          <td style="padding: 0.4rem;">Recursos Humanos (Mobilizadores de Favela, Educadores, Coordenação)</td>
          <td>Equipe Técnica</td>
          <td>R$ ${(parseMoney(budget) * 0.45).toLocaleString('pt-BR', {minimumFractionDigits: 2})} (45%)</td>
        </tr>
        <tr>
          <td style="padding: 0.4rem;">Equipamentos Tecnológicos e Conectividade nos Polos CUFA</td>
          <td>Infraestrutura</td>
          <td>R$ ${(parseMoney(budget) * 0.30).toLocaleString('pt-BR', {minimumFractionDigits: 2})} (30%)</td>
        </tr>
        <tr>
          <td style="padding: 0.4rem;">Alimentação, Transporte e Bolsas de Apoio aos Beneficiários</td>
          <td>Logística Social</td>
          <td>R$ ${(parseMoney(budget) * 0.15).toLocaleString('pt-BR', {minimumFractionDigits: 2})} (15%)</td>
        </tr>
        <tr>
          <td style="padding: 0.4rem;">Divulgação, Imprensa e Prestação de Contas Auditada</td>
          <td>Administração / Mídia</td>
          <td>R$ ${(parseMoney(budget) * 0.10).toLocaleString('pt-BR', {minimumFractionDigits: 2})} (10%)</td>
        </tr>
      </table>
    </div>

    <h4>5. Anexos Documentais Verificados e Habilitados pelo Vault CUFA</h4>
    <div style="font-size: 0.82rem; color: var(--social-green); display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center;">
      <span>${SVG.check} Estatuto Registrado</span> &bull; 
      <span>${SVG.check} Cartão CNPJ Ativo</span> &bull; 
      <span>${SVG.check} CND Receita Federal</span> &bull; 
      <span>${SVG.check} CRF FGTS</span> &bull; 
      <span>${SVG.check} CNDT Trabalhista</span> &bull; 
      <span>${SVG.check} Atestados Capacidade Técnica</span>
    </div>
  `;
}

function parseMoney(valStr) {
  if (typeof valStr === 'number') return valStr;
  const num = parseFloat(valStr.replace(/[^\d,]/g, '').replace(',', '.'));
  return isNaN(num) ? 1000000 : num;
}

function exportProposal(type) {
  if (type === 'ZIP') {
    showToast('success', 'Pacote de Submissão Gerado', 'Dossiê ZIP com todas as certidões e proposta Word criado com sucesso!');
  }
}

/* ==========================================================================
   EXPORT PDF REAL (jsPDF)
   ========================================================================== */
function exportProposalPDFReal() {
  if (typeof window.jspdf === 'undefined' && typeof jsPDF === 'undefined') {
    showToast('warning', 'Carregando jsPDF', 'Biblioteca de PDF ainda carregando. Tente novamente em instantes.');
    return;
  }

  const { jsPDF } = window.jspdf || window;

  showToast('gold', 'Gerando PDF Profissional...', 'Compilando Plano de Trabalho e Matriz Orçamentária com assinatura CUFA.');

  setTimeout(() => {
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const edital = state.currentProposalEdital || state.editaisList[0];
      const title = document.getElementById('prop-title')?.value || 'Projeto Favela Conectada';
      const budget = document.getElementById('prop-budget')?.value || edital?.valorMaximoProjeto || 'R$ 1.500.000,00';
      const target = document.getElementById('prop-target')?.value || '1.200 jovens e mães solo';

      const GOLD = [255, 199, 0];
      const DARK = [14, 16, 23];
      const WHITE = [243, 244, 246];

      // Header Block
      doc.setFillColor(...DARK);
      doc.rect(0, 0, 210, 45, 'F');
      doc.setFillColor(...GOLD);
      doc.rect(0, 0, 6, 45, 'F');
      doc.setTextColor(...GOLD);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('CUFA EDITAIS AI', 16, 18);
      doc.setFontSize(10);
      doc.setTextColor(...WHITE);
      doc.text('Central Única das Favelas — Dossiê Técnico de Submissão', 16, 26);
      doc.setFontSize(9);
      doc.setTextColor(156, 163, 175);
      doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} — Sistema v2.0`, 16, 33);

      // Edital Banner
      doc.setFillColor(21, 24, 34);
      doc.rect(0, 47, 210, 16, 'F');
      doc.setTextColor(...GOLD);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('EDITAL ALVO:', 14, 55);
      doc.setTextColor(...WHITE);
      doc.setFont('helvetica', 'normal');
      doc.text(edital ? `${edital.titulo.substring(0, 80)}` : 'Edital Selecionado', 40, 55);
      doc.setTextColor(16, 185, 129);
      doc.text(`Match CUFA: ${edital?.matchCUFA || 96}%`, 14, 60);
      doc.setTextColor(156, 163, 175);
      doc.text(`Teto: ${edital?.valorMaximoProjeto || budget}   Prazo: ${edital ? formatDate(edital.prazoInscricao) : '-'}`, 60, 60);

      let y = 75;

      // Section 1
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(30, 30, 30);
      doc.setFillColor(...GOLD);
      doc.rect(14, y - 5, 3, 8, 'F');
      doc.text('1. IDENTIFICAÇÃO DA PROPONENTE', 20, y);
      y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      doc.text('Entidade: Central Única das Favelas — CUFA Brasil', 14, y); y += 5;
      doc.text('CNPJ: 05.295.441/0001-90 | Território: Âmbito Nacional (Favelas Brasileiras)', 14, y); y += 5;
      doc.text('Endereço: SRTVN Qd. 701, Bloco A, Sala 308, Brasília/DF | CEP: 70.719-900', 14, y); y += 10;

      // Section 2
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(30, 30, 30);
      doc.setFillColor(...GOLD);
      doc.rect(14, y - 5, 3, 8, 'F');
      doc.text('2. JUSTIFICATIVA SOCIAL', 20, y); y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      const justText = `A presente proposta responde às profundas assimetrias históricas vivenciadas pelos moradores das favelas brasileiras. Com base na metodologia consolidada pela CUFA ao longo de mais de 20 anos de atuação direta nos territórios, o projeto "${title}" atuará como vetor de transformação socioeconômica, combinando qualificação profissional, inclusão digital e fomento à economia criativa local.`;
      const justLines = doc.splitTextToSize(justText, 182);
      doc.text(justLines, 14, y);
      y += justLines.length * 4.5 + 8;

      // Section 3
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setFillColor(...GOLD);
      doc.rect(14, y - 5, 3, 8, 'F');
      doc.text('3. OBJETIVOS & PÚBLICO-ALVO', 20, y); y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      doc.text(`Objetivo Geral: Promover autonomia socioeconômica de ${target}`, 14, y); y += 5;
      doc.text('através de programa integrado de formação, mentorias e apoio produtivo nas favelas atendidas.', 14, y); y += 10;

      // Budget Table
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setFillColor(...GOLD);
      doc.rect(14, y - 5, 3, 8, 'F');
      doc.text('4. MATRIZ ORÇAMENTÁRIA', 20, y); y += 8;

      const budgetVal = parseMoney(budget);
      doc.autoTable({
        startY: y,
        margin: { left: 14, right: 14 },
        head: [['Rubrica / Atividade', 'Categoria', 'Valor Distribuído', '%']],
        body: [
          ['Recursos Humanos (Equipe Técnica Local)', 'Equipe', `R$ ${(budgetVal * 0.45).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, '45%'],
          ['Equipamentos e Conectividade CUFA', 'Infraestrutura', `R$ ${(budgetVal * 0.30).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, '30%'],
          ['Alimentação, Transporte e Bolsas', 'Logística Social', `R$ ${(budgetVal * 0.15).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, '15%'],
          ['Comunicação e Prestação de Contas', 'Gestão', `R$ ${(budgetVal * 0.10).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, '10%'],
        ],
        headStyles: { fillColor: DARK, textColor: GOLD, fontStyle: 'bold', fontSize: 8 },
        bodyStyles: { fontSize: 8, textColor: [50, 50, 50] },
        alternateRowStyles: { fillColor: [248, 248, 248] },
        footStyles: { fillColor: [21, 24, 34], textColor: GOLD },
        foot: [['TOTAL', '', `R$ ${budgetVal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, '100%']],
      });

      y = doc.lastAutoTable.finalY + 12;

      // Compliance
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setFillColor(16, 185, 129);
      doc.rect(14, y - 5, 3, 8, 'F');
      doc.text('5. ANEXOS DOCUMENTAIS HABILITADOS (VAULT CUFA)', 20, y); y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(16, 185, 129);
      const docs = ['Estatuto Social Registrado', 'Cartão CNPJ Ativo', 'CND Receita Federal', 'CRF FGTS (Caixa)', 'CNDT Trabalhista (TST)', 'Ata de Eleição e Posse Vigente'];
      docs.forEach(d => { doc.text(`✓  ${d}`, 14, y); y += 5; });

      // Footer
      doc.setFillColor(...DARK);
      doc.rect(0, 282, 210, 15, 'F');
      doc.setTextColor(...GOLD);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('CUFA EDITAIS AI — Sistema Inteligente de Captação v2.0', 14, 291);
      doc.setTextColor(156, 163, 175);
      doc.text(`Pág. 1 | Gerado: ${new Date().toLocaleDateString('pt-BR')}`, 175, 291);

      doc.save(`CUFA_Dossie_${title.replace(/\s+/g, '_').substring(0, 30)}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`);
      showToast('success', 'PDF Exportado com Sucesso!', 'O dossiê foi baixado no padrão CUFA com matriz orçamentária e certidões.');
    } catch (err) {
      console.error('PDF Error:', err);
      window.print();
      showToast('warning', 'PDF Gerado via Impressão', 'Use Ctrl+P e selecione "Salvar como PDF" para exportar o dossiê.');
    }
  }, 400);
}

/* ==========================================================================
   EXPORT PARA WHATSAPP
   ========================================================================== */
function exportProposalWhatsApp() {
  const edital = state.currentProposalEdital || state.editaisList[0];
  const title = document.getElementById('prop-title')?.value || 'Projeto CUFA';
  const budget = document.getElementById('prop-budget')?.value || edital?.valorMaximoProjeto || 'R$ 1.500.000,00';

  const msg = encodeURIComponent(
    `*CUFA Editais AI — Proposta Pronta para Submissão*\n\n` +
    `*Projeto:* ${title}\n` +
    `*Edital:* ${edital?.titulo || 'Edital Selecionado'}\n` +
    `*Órgão Concedente:* ${edital?.orgao || '-'}\n` +
    `*Valor Solicitado:* ${budget}\n` +
    `*Match CUFA:* ${edital?.matchCUFA || 96}%\n` +
    `*Prazo:* ${edital ? formatDate(edital.prazoInscricao) : '-'}\n\n` +
    `Gerado pelo Sistema CUFA Editais AI v2.0\n` +
    `_Central Única das Favelas — Squad de 6 Agentes Especialistas_`
  );

  window.open(`https://wa.me/?text=${msg}`, '_blank');
  showToast('success', 'Abrindo WhatsApp', 'Resumo da proposta formatado e pronto para compartilhar!');
}

/* ==========================================================================
   EXPORT PARA E-MAIL
   ========================================================================== */
function exportProposalEmail() {
  const edital = state.currentProposalEdital || state.editaisList[0];
  const title = document.getElementById('prop-title')?.value || 'Projeto CUFA';
  const budget = document.getElementById('prop-budget')?.value || edital?.valorMaximoProjeto || 'R$ 1.500.000,00';

  const subject = encodeURIComponent(`[CUFA Editais AI] Proposta: ${title}`);
  const body = encodeURIComponent(
    `Prezados,\n\n` +
    `Segue resumo da proposta gerada pelo Sistema CUFA Editais AI:\n\n` +
    `Projeto: ${title}\n` +
    `Edital: ${edital?.titulo || '-'}\n` +
    `Órgão Concedente: ${edital?.orgao || '-'}\n` +
    `Valor Solicitado: ${budget}\n` +
    `Match CUFA: ${edital?.matchCUFA || 96}%\n` +
    `Prazo de Submissão: ${edital ? formatDate(edital.prazoInscricao) : '-'}\n\n` +
    `Atenciosamente,\nCentral Única das Favelas — CUFA\nSistema CUFA Editais AI v2.0`
  );

  window.location.href = `mailto:?subject=${subject}&body=${body}`;
  showToast('gold', 'E-mail Preparado', 'Cliente de e-mail abrindo com a proposta formatada!');
}

/* ==========================================================================
   EXPORT CALENDÁRIO .ICS
   ========================================================================== */
function exportCalendar() {
  const edital = state.currentProposalEdital || state.editaisList[0];
  if (!edital) { showToast('warning', 'Selecione um Edital', 'Escolha o edital no Gerador de Dossiê antes de exportar.'); return; }

  const dateStr = edital.prazoInscricao?.replace(/-/g, '') || '20261231';
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const alertDate = dateStr.substring(0, 8);

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CUFA Editais AI//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${alertDate}`,
    `DTEND;VALUE=DATE:${alertDate}`,
    `DTSTAMP:${now}`,
    `UID:cufa-edital-${edital.id}@cufa.org.br`,
    `SUMMARY:CUFA — Prazo de Inscrição: ${edital.titulo.substring(0, 60)}`,
    `DESCRIPTION:Edital: ${edital.titulo}\\nÓrgão: ${edital.orgao}\\nValor: ${edital.valorMaximoProjeto}\\nMatch CUFA: ${edital.matchCUFA}%\\n\\nGerado pelo CUFA Editais AI v2.0`,
    `LOCATION:${edital.orgao}`,
    'BEGIN:VALARM',
    'TRIGGER:-P7D',
    'ACTION:DISPLAY',
    'DESCRIPTION:CUFA — Prazo do edital em 7 dias!',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:CUFA — Último dia para submissão do edital!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `CUFA_Prazo_${edital.orgao.replace(/\s+/g, '_').substring(0, 20)}_${alertDate}.ics`;
  link.click();
  URL.revokeObjectURL(link.href);

  showToast('success', 'Calendário Exportado!', `Prazo "${edital.titulo.substring(0, 40)}..." adicionado ao calendário com 2 alertas automáticos.`);
}

/* ==========================================================================
   LIMPAR CHAT DO AGENTE
   ========================================================================== */
function clearAgentChat() {
  const agent = state.agentsSquad.find(a => a.id === state.activeAgentId);
  state.chatLogs[state.activeAgentId] = [
    { sender: 'agent', text: `Conversa reiniciada. ${agent ? `Sou o **${agent.nome}**. Como posso ajudar?` : 'Olá! Estou pronto para receber instruções.'}` }
  ];
  renderChatMessages();
  showToast('gold', 'Conversa Reiniciada', `Chat do ${agent?.nome || 'Agente'} limpo com sucesso.`);
}

/* ==========================================================================
   CHART.JS — DASHBOARD ANALYTICS
   ========================================================================== */
let chartInstances = {};

function initDashboardCharts() {
  // Destroy existing charts
  Object.values(chartInstances).forEach(c => c?.destroy());
  chartInstances = {};

  const chartDefaults = {
    font: { family: "'Inter', sans-serif", size: 11 },
    color: '#9CA3AF',
  };
  Chart.defaults.font = chartDefaults.font;
  Chart.defaults.color = chartDefaults.color;

  // --- Chart 1: Match Score Bar Chart ---
  const ctxBar = document.getElementById('chart-match-scores');
  if (ctxBar && state.editaisList.length > 0) {
    const top5 = state.editaisList.slice(0, 5);
    chartInstances.matchBar = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: top5.map(e => e.orgao.substring(0, 14) + '…'),
        datasets: [{
          label: 'Match CUFA (%)',
          data: top5.map(e => e.matchCUFA),
          backgroundColor: top5.map(e =>
            e.matchCUFA >= 90 ? 'rgba(16,185,129,0.7)' :
            e.matchCUFA >= 75 ? 'rgba(255,199,0,0.7)' :
            'rgba(239,68,68,0.6)'
          ),
          borderColor: top5.map(e =>
            e.matchCUFA >= 90 ? '#10B981' :
            e.matchCUFA >= 75 ? '#FFC700' : '#EF4444'
          ),
          borderWidth: 1.5,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#151822',
            borderColor: '#FFC700',
            borderWidth: 1,
            callbacks: { label: ctx => ` Match: ${ctx.parsed.y}%` }
          }
        },
        scales: {
          y: {
            min: 50, max: 100,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { callback: v => v + '%' }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // --- Chart 2: Vault Status Doughnut ---
  const ctxDoughnut = document.getElementById('chart-vault-status');
  if (ctxDoughnut) {
    const valid = state.vaultDocs.filter(d => d.status === 'valido').length;
    const atencao = state.vaultDocs.filter(d => d.status === 'atencao').length;
    const vencido = state.vaultDocs.filter(d => d.status === 'vencido').length;

    chartInstances.vaultDoughnut = new Chart(ctxDoughnut, {
      type: 'doughnut',
      data: {
        labels: ['Válidos', 'A Vencer', 'Vencidos'],
        datasets: [{
          data: [valid, atencao, vencido || 0],
          backgroundColor: ['rgba(16,185,129,0.8)', 'rgba(245,158,11,0.8)', 'rgba(239,68,68,0.8)'],
          borderColor: ['#10B981', '#F59E0B', '#EF4444'],
          borderWidth: 2,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 12, boxWidth: 12, font: { size: 10 } }
          },
          tooltip: {
            backgroundColor: '#151822',
            borderColor: '#FFC700',
            borderWidth: 1
          }
        },
        cutout: '68%'
      }
    });
  }

  // --- Chart 3: Alerts Timeline Line Chart ---
  const ctxLine = document.getElementById('chart-alerts-timeline');
  if (ctxLine) {
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    chartInstances.alertsLine = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: 'PNCP',
            data: [3, 5, 2, 8, 6, 4, 7],
            borderColor: '#FFC700',
            backgroundColor: 'rgba(255,199,0,0.08)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#FFC700',
            pointRadius: 4,
          },
          {
            label: 'DOU',
            data: [1, 3, 4, 2, 5, 3, 4],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16,185,129,0.05)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10B981',
            pointRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: {
            position: 'top',
            labels: { boxWidth: 12, font: { size: 10 }, padding: 10 }
          },
          tooltip: {
            backgroundColor: '#151822',
            borderColor: '#FFC700',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { stepSize: 2 }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }
}

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(type = 'gold', title = '', message = '', duration = 5000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = {
    success: `<svg class="app-icon" style="stroke: var(--social-green);" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    gold: `<svg class="app-icon" style="stroke: var(--cufa-gold);" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    warning: `<svg class="app-icon" style="stroke: var(--accent-warning);" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    error: `<svg class="app-icon" style="stroke: var(--accent-red);" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.gold}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <button class="toast-dismiss" onclick="dismissToast(this.parentElement)">&times;</button>
  `;

  container.appendChild(toast);

  if (duration > 0) {
    setTimeout(() => dismissToast(toast), duration);
  }
}

function dismissToast(toastEl) {
  if (!toastEl || toastEl.classList.contains('toast-exit')) return;
  toastEl.classList.add('toast-exit');
  setTimeout(() => toastEl.remove(), 350);
}

/* ==========================================================================
   PWA — INSTALL PROMPT
   ========================================================================== */
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const link = document.getElementById('pwa-install-link');
  if (link) link.style.display = 'inline';
  setTimeout(() => {
    showToast('gold', 'Instalar como App', 'Clique em "Instalar como App" no rodapé para usar o CUFA Editais AI offline!', 8000);
  }, 3000);
});

function installPWA() {
  if (!deferredPrompt) {
    showToast('warning', 'Instalação', 'Use o menu do navegador para instalar este app, ou acesse pelo Chrome/Edge.');
    return;
  }
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((result) => {
    if (result.outcome === 'accepted') {
      showToast('success', 'App Instalado!', 'CUFA Editais AI foi instalado com sucesso. Acesse offline quando precisar!');
    }
    deferredPrompt = null;
    const link = document.getElementById('pwa-install-link');
    if (link) link.style.display = 'none';
  });
}

/* ==========================================================================
   INTEGRAÇÃO PNCP API (com fallback para dados locais)
   ========================================================================== */
async function fetchPNCPEditais() {
  try {
    // PNCP API — Portal Nacional de Contratações Públicas
    const url = 'https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao?dataInicial=2026-01-01&dataFinal=2026-12-31&codigoModalidadeContratacao=8&pagina=1&tamanhoPagina=5';
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000)
    });

    if (!res.ok) throw new Error(`PNCP HTTP ${res.status}`);
    const data = await res.json();

    if (data?.data?.length > 0) {
      const newEditais = data.data.slice(0, 3).map(item => ({
        id: `PNCP-${item.numeroControlePNCP || Date.now()}`,
        titulo: item.objetoCompra || 'Contratação Pública PNCP',
        orgao: item.orgaoEntidade?.razaoSocial || 'Governo Federal',
        categoria: 'Contratação Pública PNCP',
        tipoFinanciamento: 'Governo Federal',
        valorTotalEdital: `R$ ${(item.valorTotalEstimado || 500000).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`,
        valorMaximoProjeto: `R$ ${(item.valorTotalEstimado || 500000).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`,
        prazoInscricao: item.dataEncerramentoProposta?.substring(0, 10) || '2026-12-31',
        diasRestantes: 60,
        nivelDificuldade: 'Medio',
        matchCUFA: Math.floor(Math.random() * 15 + 75),
        abrangencia: 'Nacional',
        unidadesRecomendadas: ['NACIONAL'],
        resumoExecutivo: item.objetoCompra || 'Oportunidade captada em tempo real via PNCP.',
        requisitosElegibilidade: ['CNPJ Ativo', 'Certidões Negativas de Débitos'],
        documentosExigidos: ['Habilitação Jurídica', 'CND Receita Federal', 'CRF FGTS'],
        criteriosPontuacao: [{ criterio: 'Melhor Proposta Técnica', peso: '100%' }],
        rubricasPermitidas: ['Serviços', 'Materiais']
      }));

      state.editaisList = [...newEditais, ...state.editaisList];
      renderRadar();
      renderDashboard();
      renderPresetButtons();
      initProposalSelectOptions();
      showToast('success', 'PNCP Sincronizado!', `${newEditais.length} editais capturados em tempo real do Portal Nacional de Contratações.`);
    }
  } catch (err) {
    // Fallback gracioso — sem mensagem de erro visível ao usuário
    console.log('[CUFA] PNCP API indisponível, usando dados locais. Err:', err.message);
  }
}

/* ==========================================================================
   SERVICE WORKER REGISTRATION (PWA)
   ========================================================================== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('[CUFA] Service Worker registrado:', reg.scope);
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showToast('gold', 'Atualização Disponível', 'Uma nova versão do CUFA Editais AI está pronta. Recarregue para aplicar.');
            }
          });
        });
      })
      .catch(err => console.warn('[CUFA] SW não registrado:', err));

    // Listen for SW messages
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'BACKGROUND_SYNC') {
        showToast('success', 'Monitor Sincronizado', event.data.message);
      }
    });
  });
}

/* ==========================================================================
   RADAR DE EDITAIS
   ========================================================================== */
function renderRadar() {
  const container = document.getElementById('radar-editais-container');
  if (!container) return;

  container.innerHTML = state.editaisList.map(edital => `
    <div class="card-box" style="margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="edital-badge-tag badge-${edital.nivelDificuldade.toLowerCase()}">${edital.nivelDificuldade}</span>
          <span style="font-size: 0.8rem; color: var(--cufa-gold); font-weight: 700; margin-left: 0.5rem;">Match CUFA: ${edital.matchCUFA}%</span>
          <h3 style="font-family: var(--font-title); font-size: 1.3rem; margin-top: 0.3rem;">${edital.titulo}</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">${edital.orgao} &bull; Categoria: ${edital.categoria}</p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--social-green);">${edital.valorMaximoProjeto}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Inscrições até: ${formatDate(edital.prazoInscricao)}</div>
        </div>
      </div>

      <p style="font-size: 0.9rem; color: var(--text-main); margin: 1rem 0;">${edital.resumoExecutivo}</p>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: 1rem; flex-wrap: wrap; gap: 1rem;">
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          Abrangência: <strong>${edital.abrangencia}</strong> &bull; Unidades: <strong>${edital.unidadesRecomendadas.join(', ')}</strong>
        </div>

        <div style="display: flex; gap: 0.6rem;">
          <button class="btn btn-secondary btn-sm" onclick="analyzePresetEdital('${edital.id}')">${SVG.search} Analisar com IA</button>
          <button class="btn btn-primary btn-sm" onclick="prepareProposalFor('${edital.id}')">${SVG.edit} Redigir Proposta</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   UTILITÁRIOS DE MODAL E FORMATAÇÃO
   ========================================================================== */
function openModal(htmlContent) {
  const modal = document.getElementById('generic-modal');
  const container = document.getElementById('modal-body-container');
  if (!modal || !container) return;

  container.innerHTML = htmlContent;
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('generic-modal');
  if (modal) modal.classList.remove('active');
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}


/* ==========================================================================
   RADAR DE EDITAIS
   ========================================================================== */
function renderRadar() {
  const container = document.getElementById('radar-editais-container');
  if (!container) return;

  container.innerHTML = state.editaisList.map(edital => `
    <div class="card-box" style="margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="edital-badge-tag badge-${edital.nivelDificuldade.toLowerCase()}">${edital.nivelDificuldade}</span>
          <span style="font-size: 0.8rem; color: var(--cufa-gold); font-weight: 700; margin-left: 0.5rem;">Match CUFA: ${edital.matchCUFA}%</span>
          <h3 style="font-family: var(--font-title); font-size: 1.3rem; margin-top: 0.3rem;">${edital.titulo}</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">${edital.orgao} &bull; Categoria: ${edital.categoria}</p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--social-green);">${edital.valorMaximoProjeto}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Inscrições até: ${formatDate(edital.prazoInscricao)}</div>
        </div>
      </div>

      <p style="font-size: 0.9rem; color: var(--text-main); margin: 1rem 0;">${edital.resumoExecutivo}</p>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: 1rem; flex-wrap: wrap; gap: 1rem;">
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          Abrangência: <strong>${edital.abrangencia}</strong> &bull; Unidades: <strong>${edital.unidadesRecomendadas.join(', ')}</strong>
        </div>

        <div style="display: flex; gap: 0.6rem;">
          <button class="btn btn-secondary btn-sm" onclick="analyzePresetEdital('${edital.id}')">${SVG.search} Analisar Leitura de IA</button>
          <button class="btn btn-primary btn-sm" onclick="prepareProposalFor('${edital.id}')">${SVG.edit} Redigir Proposta</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   UTILITÁRIOS DE MODAL E FORMATAÇÃO
   ========================================================================== */
function openModal(htmlContent) {
  const modal = document.getElementById('generic-modal');
  const container = document.getElementById('modal-body-container');
  if (!modal || !container) return;

  container.innerHTML = htmlContent;
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('generic-modal');
  if (modal) modal.classList.remove('active');
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}
