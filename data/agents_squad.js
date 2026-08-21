// Squad de Agentes de IA da CUFA (Central Única das Favelas)
// Definições de papéis, modelos de linguagem especialistas, habilidades e histórico de interações

window.AGENTS_SQUAD = [
  {
    id: 'AGENT-SENTINELA',
    nome: 'Sentinela de Editais',
    papel: 'Radar de Oportunidades & Alerta em Tempo Real',
    modeloIA: 'Opus 5 + Web Scraper Scanner',
    avatarColor: 'var(--cufa-gold)',
    status: 'ativo',
    especialidade: 'Monitoramento de PNCP, Transferegov, DOU, Salic, BNDES e Petrobras com cálculo instantâneo de Match CUFA.',
    descricao: 'Varre continuadamente portais oficiais do Brasil e dispara alertas instantâneos via Dashboard, WhatsApp e E-mail para a equipe de captação.',
    habilidades: ['Leitura de XML/APIs Governamentais', 'Cálculo de Match Territorial', 'Priorização de Prazos', 'Disparo de Alertas Push']
  },
  {
    id: 'AGENT-AUDITOR',
    nome: 'Auditor de Compliance & Vault',
    papel: 'Verificação Jurídico-Fiscal & Certidões CUFA',
    modeloIA: 'GPT 5.6 Terra (Legal Audit)',
    avatarColor: 'var(--social-green)',
    status: 'ativo',
    especialidade: 'Auditoria de edital vs acervo documental da CUFA Nacional e filiais estaduais (CNDs, FGTS, Atas, Estatuto).',
    descricao: 'Analisa cada cláusula de inabilitação formal, verifica vigências de certidões e emite instruções passo a passo para renovação prévia.',
    habilidades: ['Validador de Certidões Negativas', 'Cross-Check Multi-Estado', 'Alerta de Formalismo Excessivo', 'Emissor de Checklist de Habilitação']
  },
  {
    id: 'AGENT-REDATOR',
    nome: 'Redator Especialista de Projetos',
    papel: 'Arquiteto de Propostas & Justificativas Sociais',
    modeloIA: 'Fable 5 + Opus 5 (Social Impact Narrative)',
    avatarColor: 'var(--accent-blue)',
    status: 'ativo',
    especialidade: 'Redação de alta performance de Planos de Trabalho, Justificativa Socioeconômica de Favela e Matrizes Orçamentárias.',
    descricao: 'Recebe instruções interativas do usuário, ajusta linguagem ao perfil do parecerista e gera os capítulos completos do projeto.',
    habilidades: ['Redação de Alto Impacto Social', 'Distribuição Orçamentária por Rubrica', 'Formatação Salic / Rouanet', 'Instrução Interativa por Prompt']
  },
  {
    id: 'AGENT-REVISOR',
    nome: 'Revisor Final & Preenchedor (QC)',
    papel: 'Quality Control & Montador de Pacotes',
    modeloIA: 'GPT 5.6 Sol (Strict Verification)',
    avatarColor: 'var(--accent-purple)',
    status: 'ativo',
    especialidade: 'Conferência de limites de verba, regras de contrapartida, anexos e montagem dos pacotes de submissão.',
    descricao: 'Revisa linha por linha a proposta e empacota os arquivos em formatos baixáveis (.ZIP, .DOCX, .PDF) sem erros formais.',
    habilidades: ['Checkup de Teto de Rubricas', 'Verificação de Anexos Obrigatórios', 'Gerador de Pacotes ZIP/DOCX', 'Controle de Qualidade Final']
  },
  {
    id: 'AGENT-JURIDICO',
    nome: 'Estrategista Jurídico de Recursos',
    papel: 'Defesa Legal & Minutas MROSC',
    modeloIA: 'GPT 5.6 Terra (Law & Administrative Appeals)',
    avatarColor: 'var(--accent-red)',
    status: 'ativo',
    especialidade: 'Elaboração de defesas formais, esclarecimentos a editais e Minutas de Recurso Administrativo (Lei 13.019 / Lei 14.133).',
    descricao: 'Garante o enquadramento jurídico adequado e combate inabilitações arbitrárias de comissões de seleção com pareceres fundamentados.',
    habilidades: ['Redação de Recursos MROSC', 'Contestação de Formalismo', 'Impugnação de Editais', 'Jurisprudência do TCU para OSCs']
  },
  {
    id: 'AGENT-MEMORIA',
    nome: 'Memória Institucional & Auto-Ajuste',
    papel: 'Aprendizado Contínuo & Compatibilidade de Processos',
    modeloIA: 'Opus 5 + Self-Adjusting Memory Engine',
    avatarColor: 'var(--cufa-gold)',
    status: 'ativo',
    especialidade: 'Histórico de projetos aprovados/rejeitados, refinamento automático de templates e Plano de Verificação de Compatibilidade.',
    descricao: 'Aprende com cada edital submetido pela CUFA. Identifica padrões de aprovação anteriores para otimizar propostas futuras e evitar erros repetidos.',
    habilidades: ['Memória de Editais Submetidos', 'Plano de Compatibilidade de Processos', 'Auto-Refinamento de Prompts', 'Análise de Tendência de Bancas']
  }
];
