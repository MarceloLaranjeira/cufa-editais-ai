// Base de Editais e Chamadas Públicas Oficiais e Reais
// Utilizada para simulação e pré-carregamento no CUFA Editais AI v2.0

window.SAMPLE_EDITAIS = [
  {
    id: 'EDITAL-2026-NORTE',
    titulo: 'Programa BNDES Periferias Fortes — Região Norte e Maranhão (BNDES | Phi | Phomenta)',
    orgao: 'BNDES | Instituto Phi | Instituto Phomenta',
    categoria: 'Fortalecimento Institucional & Periferias',
    tipoFinanciamento: 'Apoio Financeiro Direto + Bolsas + Mentoria (Fundo Social BNDES)',
    valorTotalEdital: 'R$ 41.000.000,00',
    valorMaximoProjeto: 'R$ 500.000,00',
    prazoInscricao: '2026-09-17',
    diasRestantes: 27,
    nivelDificuldade: 'Medio',
    matchCUFA: 99,
    abrangencia: 'Região Norte (AM, PA, AP, AC, RO, RR, TO) e Maranhão (MA)',
    unidadesRecomendadas: ['CUFA_AM', 'CUFA_PA', 'CUFA_MA', 'CUFA_AP', 'NACIONAL'],
    resumoExecutivo: 'Seleção pública oficial do BNDES, Instituto Phi e Instituto Phomenta para fortalecimento de até 82 Organizações Sociais de Periferia (OSPs) e coletivos da Região Norte e Maranhão. Oferece bolsas diretas para lideranças, apoio financeiro e consultoria executiva.',
    requisitosElegibilidade: [
      'Sede e atuação comprovada na Região Norte do Brasil ou no Estado do Maranhão',
      'Localização em periferias, favelas, comunidades urbanas, beira de rio ou territórios populares (Censo IBGE 2022)',
      'Pelo menos 4 anos de existência e atuação social comprovada no território',
      'Disponibilidade para participação nas capacitações e mentorias do programa'
    ],
    documentosExigidos: [
      'Estatuto Social Atualizado e Registrado ou Carta de Apresentação de Coletivo',
      'Cartão CNPJ Ativo (ou Comprovação de Atuação Comunitária para Coletivos)',
      'Ata de Eleição e Posse da Diretoria Vigente',
      'Certidão Negativa de Débitos Federais e Dívida Ativa (CND Receita)',
      'Certificado de Regularidade do FGTS (CRF Caixa)',
      'Certidão Negativa de Débitos Trabalhistas (CNDT - TST)',
      'Comprovante de Endereço em Território Periférico'
    ],
    criteriosPontuacao: [
      { criterio: 'Atuação Comprovada em Favelas e Comunidades da Região Norte', peso: '35%' },
      { criterio: 'Capilaridade e Impacto Social com Famílias Vulneráveis', peso: '30%' },
      { criterio: 'Engajamento das Lideranças e Potencial de Crescimento', peso: '20%' },
      { criterio: 'Adequação dos Objetivos ao Fortalecimento Institucional', peso: '15%' }
    ],
    rubricasPermitidas: ['Bolsas de Formação para Lideranças', 'Recursos Financeiros de Fortalecimento Institucional', 'Custeio de Formalização e Cartório', 'Capacitação e Mentoria Executiva'],
    modeloRecomendado: 'Opus 5 + Fable 5 (Social & Territorial Reasoning Engine)'
  },
  {
    id: 'EDITAL-MROSC-MDS',
    titulo: 'Seleção Pública MROSC — Programa Inclusão Produtiva nas Favelas (MDS)',
    orgao: 'Ministério do Desenvolvimento e Assistência Social (MDS)',
    categoria: 'Desenvolvimento Social & Geração de Renda',
    tipoFinanciamento: 'Termo de Fomento MROSC (Lei nº 13.019/2014)',
    valorTotalEdital: 'R$ 25.000.000,00',
    valorMaximoProjeto: 'R$ 2.500.000,00',
    prazoInscricao: '2026-10-15',
    diasRestantes: 55,
    nivelDificuldade: 'Medio',
    matchCUFA: 98,
    abrangencia: 'Nacional (Foco em Regiões Metropolitanas e Favelas)',
    unidadesRecomendadas: ['NACIONAL', 'CUFA_RJ', 'CUFA_SP', 'CUFA_BA'],
    resumoExecutivo: 'Chamamento público oficial do MDS para celebração de parcerias com OSCs voltadas à qualificação profissional, segurança alimentar e autonomia socioeconômica de mães solo e jovens periféricos.',
    requisitosElegibilidade: [
      'Organização da Sociedade Civil (OSC) sem fins lucrativos constituída há mais de 3 anos (Lei 13.019/2014)',
      'Comprovação de execução de projetos sociais no Cadastro de Entidades do Transferegov',
      'Certidão Negativa de Débitos Federal, Trabalhista e FGTS atualizadas',
      'Balanço Patrimonial e Demonstração do Resultado do Exercício (DRE)'
    ],
    documentosExigidos: [
      'Estatuto Social Registrado e Adequado à Lei 13.019/2014',
      'Cartão CNPJ Ativo na Receita Federal',
      'Ata de Eleição e Posse da Diretoria Vigente',
      'CND Receita Federal e Dívida Ativa da União',
      'CRF FGTS Caixa Econômica Federal',
      'CNDT Certidão Negativa de Débitos Trabalhistas (TST)'
    ],
    criteriosPontuacao: [
      { criterio: 'Capilaridade Comunitária em Favelas do CadÚnico', peso: '35%' },
      { criterio: 'Clareza do Plano de Trabalho MROSC', peso: '30%' },
      { criterio: 'Histórico Executivo e Governança da OSC', peso: '20%' },
      { criterio: 'Custo-Benefício por Família Atendida', peso: '15%' }
    ],
    rubricasPermitidas: ['Equipe Técnica Local e Mobilizadores', 'Equipamentos e Materiais Didáticos', 'Alimentação e Logística', 'Custos Indiretos de Gestão (até 15%)'],
    modeloRecomendado: 'GPT 5.6 Law + Fable 5 (MROSC Compliance & Narrative)'
  },
  {
    id: 'EDITAL-SALIC-ROUANET',
    titulo: 'SALIC PRONAC — Fomento à Cultura Urbana e Festivais de Favela (Lei Rouanet)',
    orgao: 'Ministério da Cultura (MinC / SALIC)',
    categoria: 'Cultura & Arte Urbana',
    tipoFinanciamento: 'Incentivo Fiscal (Mecenato Art. 18 — 100% Isenção)',
    valorTotalEdital: 'Fluxo Contínuo / Até R$ 5.000.000,00',
    valorMaximoProjeto: 'R$ 3.500.000,00',
    prazoInscricao: '2026-11-15',
    diasRestantes: 86,
    nivelDificuldade: 'Medio',
    matchCUFA: 97,
    abrangencia: 'Nacional',
    unidadesRecomendadas: ['NACIONAL', 'CUFA_SP', 'CUFA_RJ', 'CUFA_DF'],
    resumoExecutivo: 'Projetos cadastrados na plataforma SALIC do Ministério da Cultura para financiamento via renúncia fiscal. Foco em festivais de música periférica, literatura marginal, grafite e artes integradas.',
    requisitosElegibilidade: [
      'Pessoa Jurídica sem fins lucrativos com finalidade cultural explícita no Estatuto',
      'Comprovação de atuação cultural de no mínimo 2 anos (clipping, portfólio, cartazes)',
      'Quitação no CADIN Federal e certidões fiscais em dia'
    ],
    documentosExigidos: [
      'Estatuto Social Atualizado',
      'Cartão CNPJ Ativo',
      'Ata de Diretoria Vigente',
      'CND Receita Federal',
      'CRF FGTS Caixa',
      'CNDT Trabalhista TST'
    ],
    criteriosPontuacao: [
      { criterio: 'Democratização do Acesso em Territórios Periféricos', peso: '40%' },
      { criterio: 'Plano de Acessibilidade e Gratuidade', peso: '30%' },
      { criterio: 'Adequação da Planilha Salic ao Art. 18', peso: '30%' }
    ],
    rubricasPermitidas: ['Cachês Artísticos', 'Infraestrutura de Palco e Som em Favela', 'Assessoria de Imprensa e Mídia', 'Gestão Cultural (até 10%)'],
    modeloRecomendado: 'Opus 5 + GPT 5.6 Sol (Salic Format Specialist)'
  },
  {
    id: 'EDITAL-PNAB-ALDIRBLANC',
    titulo: 'PNAB 2026 — Política Nacional Aldir Blanc de Fomento a Pontos de Cultura',
    orgao: 'Secretarias Estaduais de Cultura / MinC',
    categoria: 'Pontos de Cultura & Periferia',
    tipoFinanciamento: 'Repasse Direto de Fomento Cultural',
    valorTotalEdital: 'R$ 15.000.000,00',
    valorMaximoProjeto: 'R$ 500.000,00',
    prazoInscricao: '2026-09-30',
    diasRestantes: 40,
    nivelDificuldade: 'Facil',
    matchCUFA: 96,
    abrangencia: 'Estadual (Multi-Estados)',
    unidadesRecomendadas: ['CUFA_RJ', 'CUFA_MG', 'CUFA_CE', 'CUFA_RS'],
    resumoExecutivo: 'Premiação e apoio a Pontos e Pontões de Cultura da periferia, fortalecendo a infraestrutura comunitária e os coletivos culturais de favela.',
    requisitosElegibilidade: [
      'Entidade cultural de base comunitária com histórico em favela',
      'Certidões estaduais e federais regulares'
    ],
    documentosExigidos: [
      'Estatuto Social ou Carta de Anuência Comunitária',
      'CNPJ Ativo',
      'CND Federal',
      'CRF FGTS',
      'CNDT Trabalhista'
    ],
    criteriosPontuacao: [
      { criterio: 'Histórico de Atuação Cultural na Periferia', peso: '40%' },
      { criterio: 'Inclusão Social e Diversidade', peso: '30%' },
      { criterio: 'Plano de Aplicação dos Recursos', peso: '30%' }
    ],
    rubricasPermitidas: ['Equipamentos Culturais', 'Oficinas e Capacitação', 'Reformas e Manutenção de Espaço'],
    modeloRecomendado: 'Fable 5 (Community Identity Writer)'
  }
];
