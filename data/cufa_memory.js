// Memória Institucional e Aprendizado Contínuo da CUFA
// Sistema de Histórico, Auto-Ajuste e Plano de Verificação de Compatibilidade

window.CUFA_MEMORY = {
  historicoPropostas: [
    {
      id: 'HIST-2025-01',
      editalNome: 'Edital Petrobras Socioambiental 2025',
      orgao: 'Petrobras S.A.',
      ano: 2025,
      resultado: 'CONTEMPLADO',
      notaObtida: '98.5 / 100',
      valorAprovado: 'R$ 2.200.000,00',
      pontosFortesDestacados: ['Metodologia de engajamento territorial nas favelas do RJ e SP', 'Inclusão de auditores Big Four na prestação de contas', 'Demonstração da rede Taça das Favelas'],
      aprenderParaFuturo: 'Bancas da Petrobras valorizam métricas quantitativas diretas de emissão evitada e qualificação profissional de jovens.'
    },
    {
      id: 'HIST-2025-02',
      editalNome: 'Chamada Pública BNDES Fundo Social 2025',
      orgao: 'BNDES',
      ano: 2025,
      resultado: 'CONTEMPLADO',
      notaObtida: '97.0 / 100',
      valorAprovado: 'R$ 8.500.000,00',
      pontosFortesDestacados: ['Capilaridade em 12 estados da federação', 'Estatuto registrado com governança transparente', 'Matriz de contrapartida não-financeira com sedes físicas da CUFA'],
      aprenderParaFuturo: 'BNDES exige detalhamento exato das bolsas de apoio a beneficiários em rubrica isolada de apoio social.'
    },
    {
      id: 'HIST-2025-03',
      editalNome: 'Lei Rouanet - Artigo 18 (Circuito Expo Favela 2025)',
      orgao: 'Ministério da Cultura (MinC)',
      ano: 2025,
      resultado: 'APROVADO NO SALIC',
      notaObtida: '100% Habilitado',
      valorAprovado: 'R$ 4.800.000,00',
      pontosFortesDestacados: ['Democratização total com 100% de gratuidade', 'Plano de acessibilidade atitudinal e intérpretes de Libras', 'Certidões federais e trabalhistas 100% em dia'],
      aprenderParaFuturo: 'Salic aprova mais rápido quando os cachês dos artistas periféricos respeitam a tabela de referência oficial sem excedentes.'
    },
    {
      id: 'HIST-2024-04',
      editalNome: 'Edital de Infraestrutura Esportiva Municipal 2024',
      orgao: 'Prefeitura do Rio de Janeiro',
      ano: 2024,
      resultado: 'RECURSO DEFERIDO (Inicialmente Inabilitado)',
      notaObtida: '94.0 / 100 (Após Recurso MROSC)',
      valorAprovado: 'R$ 600.000,00',
      pontosFortesDestacados: ['Minuta de Recurso fundamentada na Lei 13.019/2014 derrubou inabilitação formal por certidão municipal que estava em renovação'],
      aprenderParaFuturo: 'Manter a CND Municipal renovada com antecedência de 15 dias antes do fechamento das inscrições para evitar necessidade de recurso.'
    }
  ],

  // Regras de Auto-Ajuste Ativas
  regrasAutoAjuste: [
    {
      id: 'RULE-01',
      alvo: 'Planilha Orçamentária',
      descricao: 'Alocar sempre entre 40% e 45% do orçamento para Recursos Humanos Locais (mobilizadores de favela). Histórico mostra nota máxima de impacto socioeconômico.',
      status: 'ativa'
    },
    {
      id: 'RULE-02',
      alvo: 'Certidões & Vault',
      descricao: 'Disparar alerta preventivo no Vault 20 dias antes do vencimento para certidões estaduais e municipais de filiais da CUFA.',
      status: 'ativa'
    },
    {
      id: 'RULE-03',
      alvo: 'Propostas de Cultura (Salic)',
      descricao: 'Inserir plano detalhado de Acessibilidade (Libras + Audiodescrição) em 100% dos eventos. Aumenta pontuação de aprovação em 15%.',
      status: 'ativa'
    }
  ]
};
