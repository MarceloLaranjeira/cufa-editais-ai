// Base de Editais e Chamadas Públicas Brasileiras (Exemplos Reais e Ativos)
// Utilizada para simulação e pré-carregamento no CUFA Editais AI

window.SAMPLE_EDITAIS = [
  {
    id: 'EDITAL-2026-001',
    titulo: 'Edital Petrobras Socioambiental 2026 - Transição Justa e Educação nas Periferias',
    orgao: 'Petrobras S.A.',
    categoria: 'Socioambiental & Educação',
    tipoFinanciamento: 'Investimento Direto sem Incentivo Fiscal',
    valorTotalEdital: 'R$ 40.000.000,00',
    valorMaximoProjeto: 'R$ 2.500.000,00',
    prazoInscricao: '2026-10-15',
    diasRestantes: 55,
    nivelDificuldade: 'Medio',
    matchCUFA: 96,
    abrangencia: 'Nacional (Foco em Regiões Metropolitanas e Favelas)',
    unidadesRecomendadas: ['NACIONAL', 'CUFA_RJ', 'CUFA_SP', 'CUFA_BA'],
    resumoExecutivo: 'Apoio a projetos sociais focados em transição energética justa, qualificação profissional para jovens de periferia, alfabetização digital e conservação ambiental com engajamento comunitário.',
    requisitosElegibilidade: [
      'Organização da Sociedade Civil (OSC) sem fins lucrativos constituída há mais de 3 anos',
      'Comprovação de execução de projetos sociais de porte igual ou superior a R$ 1.000.000,00',
      'Certidão Negativa de Débitos Federal, Trabalhista e FGTS atualizadas',
      'Apresentação de Balanço Patrimonial dos últimos 2 anos auditado ou assinado por contador habilitado'
    ],
    documentosExigidos: [
      'Estatuto Social Atualizado e Registrado',
      'Cartão CNPJ Ativo (Receita Federal)',
      'Ata de Eleição e Posse da Diretoria Vigente',
      'Certidão Negativa de Débitos Federais e Dívida Ativa (CND Receita)',
      'Certificado de Regularidade do FGTS (CRF Caixa)',
      'Certidão Negativa de Débitos Trabalhistas (CNDT - TST)',
      'Atestado de Capacidade Técnica',
      'Relatório Auditado de Prestação de Contas Anual'
    ],
    criteriosPontuacao: [
      { criterio: 'Impacto Social Direto nas Periferias e Favelas', peso: '30%' },
      { criterio: 'Capacidade Técnica e Histórico da Proponente (CUFA)', peso: '25%' },
      { criterio: 'Clareza do Plano de Trabalho e Cronograma', peso: '20%' },
      { criterio: 'Adequação Orçamentária e Custo-Benefício por Beneficiário', peso: '15%' },
      { criterio: 'Inovação e Sustentabilidade da Proposta', peso: '10%' }
    ],
    rubricasPermitidas: ['Equipe Técnica e Instrutores', 'Equipamentos e Tecnologia', 'Alimentação e Transporte de Beneficiários', 'Divulgação e Eventos', 'Custos Indiretos (até 15%)'],
    modeloRecomendado: 'Opus 5 + GPT 5.6 Sol (Deep Social Reasoning)'
  },
  {
    id: 'EDITAL-2026-002',
    titulo: 'Chamada Pública BNDES Fundo Social - Cidades Resilientes e Empreendedorismo de Favela',
    orgao: 'BNDES - Banco Nacional de Desenvolvimento Econômico e Social',
    categoria: 'Desenvolvimento Econômico & Empreendedorismo',
    tipoFinanciamento: 'Fundo Social Não-Reembolsável',
    valorTotalEdital: 'R$ 80.000.000,00',
    valorMaximoProjeto: 'R$ 10.000.000,00',
    prazoInscricao: '2026-11-30',
    diasRestantes: 101,
    nivelDificuldade: 'Dificil',
    matchCUFA: 98,
    abrangencia: 'Nacional',
    unidadesRecomendadas: ['NACIONAL'],
    resumoExecutivo: 'Seleção pública de propostas estruturantes para aceleração de microempreendedores de favela, criação de polos de economia criativa, inclusão produtiva para mães solo e fortalecimento de redes comunitárias.',
    requisitosElegibilidade: [
      'Entidade privada sem fins lucrativos de natureza comunitária ou institucional nacional',
      'Comprovação de atuação em ao menos 5 estados da federação ou abrangência nacional',
      'Demonstração de governança corporativa e compliance contra lavagem de dinheiro',
      'Garantia de contrapartida social ou operacional não-financeira',
      'Certidões negativas federais, estaduais e municipais das sedes executoras'
    ],
    documentosExigidos: [
      'Estatuto Social Atualizado e Registrado',
      'Cartão CNPJ Ativo (Receita Federal)',
      'Ata de Eleição e Posse da Diretoria Vigente',
      'Certidão Negativa de Débitos Federais e Dívida Ativa (CND Receita)',
      'Certificado de Regularidade do FGTS (CRF Caixa)',
      'Certidão Negativa de Débitos Trabalhistas (CNDT - TST)',
      'Certidão Negativa Estadual de São Paulo (SEFAZ SP)',
      'Atestado de Capacidade Técnica - Expo Favela Innovation',
      'Relatório Auditado de Prestação de Contas Anual'
    ],
    criteriosPontuacao: [
      { criterio: 'Capacidade de Mobilização Comunitária e Capilaridade', peso: '35%' },
      { criterio: 'Metodologia de Aceleração e Inclusão Produtiva', peso: '25%' },
      { criterio: 'Solidez Institucional e Governança', peso: '20%' },
      { criterio: 'Indicadores Quantitativos de Geração de Renda', peso: '20%' }
    ],
    rubricasPermitidas: ['Fundos de Semente / Microcrédito Orientado', 'Capacitação e Mentoria', 'Estruturação de Polos Físicos de Apoio', 'Recursos Humanos Especializados', 'Auditoria Externa Independentes'],
    modeloRecomendado: 'GPT 5.6 Terra + Opus 5 (Architectural Governance & Compliance)'
  },
  {
    id: 'EDITAL-2026-003',
    titulo: 'Edital Itaú Social 2026 - Apoio à Infância e Juventude Negra nas Favelas',
    orgao: 'Fundação Itaú Social',
    categoria: 'Educação & Infância',
    tipoFinanciamento: 'Apoio Institucional / Projeto',
    valorTotalEdital: 'R$ 15.000.000,00',
    valorMaximoProjeto: 'R$ 800.000,00',
    prazoInscricao: '2026-09-10',
    diasRestantes: 20,
    nivelDificuldade: 'Facil',
    matchCUFA: 94,
    abrangencia: 'Sudeste, Nordeste e Sul',
    unidadesRecomendadas: ['CUFA_SP', 'CUFA_RJ', 'CUFA_BA', 'CUFA_RS'],
    resumoExecutivo: 'Fortalecimento de tecnologias sociais de recomposição de aprendizagem, literatura infantil antirracista, atividades de contraturno escolar e apoio psicossocial para famílias vulneráveis.',
    requisitosElegibilidade: [
      'OSC legalmente constituída há pelo menos 2 anos',
      'Inscrição ativa no Conselho Municipal dos Direitos da Criança e do Adolescente (CMDCA) ou CMAS',
      'Regularidade fiscal e trabalhista comprovada'
    ],
    documentosExigidos: [
      'Estatuto Social Atualizado e Registrado',
      'Cartão CNPJ Ativo (Receita Federal)',
      'Ata de Eleição e Posse da Diretoria Vigente',
      'Certidão Negativa de Débitos Federais e Dívida Ativa (CND Receita)',
      'Certificado de Regularidade do FGTS (CRF Caixa)',
      'Inscrição no Conselho Municipal de Assistência Social (CMAS SP)'
    ],
    criteriosPontuacao: [
      { criterio: 'Foco no Combate à Desigualdade Raça e Gênero', peso: '35%' },
      { criterio: 'Envolvimento da Comunidade e Famílias', peso: '30%' },
      { criterio: 'Viabilidade Orçamentária e Executiva', peso: '25%' },
      { criterio: 'Plano de Continuidade', peso: '10%' }
    ],
    rubricasPermitidas: ['Bolsas de Estudo e Apoio a Estudantes', 'Material Didático e Paradidático', 'Alimentação e Logística', 'Recursos Humanos'],
    modeloRecomendado: 'Fable 5 + Opus 5 (Humanistic Social Narrative)'
  },
  {
    id: 'EDITAL-2026-004',
    titulo: 'Lei Rouanet 2026 - Artigo 18 (Cultura Urbana, Hip-Hop e Festivais de Favela)',
    orgao: 'Ministério da Cultura (MinC)',
    categoria: 'Cultura & Arte Urbana',
    tipoFinanciamento: 'Incentivo Fiscal (Mecenato 100% Isenção)',
    valorTotalEdital: 'Fluxo Contínuo / Até R$ 5.000.000,00',
    valorMaximoProjeto: 'R$ 3.500.000,00',
    prazoInscricao: '2026-11-15',
    diasRestantes: 86,
    nivelDificuldade: 'Dificil',
    matchCUFA: 99,
    abrangencia: 'Nacional',
    unidadesRecomendadas: ['NACIONAL', 'CUFA_SP', 'CUFA_RJ', 'CUFA_DF'],
    resumoExecutivo: 'Aprovação de propostas culturais no SALIC para captação via renúncia fiscal. Foco em festivais de música urbana, dança de rua, grafite, literatura periférica e transmissão digital.',
    requisitosElegibilidade: [
      'Pessoa Jurídica sem fins lucrativos com objeto cultural explícito no Estatuto Social',
      'Comprovação de atuação cultural de no mínimo 2 anos (portfólio, clipping, cartazes)',
      'Regularidade no CADIN, CND Federal, CNDT e FGTS'
    ],
    documentosExigidos: [
      'Estatuto Social Atualizado e Registrado',
      'Cartão CNPJ Ativo (Receita Federal)',
      'Ata de Eleição e Posse da Diretoria Vigente',
      'Certidão Negativa de Débitos Federais e Dívida Ativa (CND Receita)',
      'Certificado de Regularidade do FGTS (CRF Caixa)',
      'Certidão Negativa de Débitos Trabalhistas (CNDT - TST)',
      'Atestado de Capacidade Técnica - Taça das Favelas'
    ],
    criteriosPontuacao: [
      { criterio: 'Democratização do Acesso e Gratuidade', peso: '40%' },
      { criterio: 'Acessibilidade Física e Atitudinal', peso: '20%' },
      { criterio: 'Plano de Democratização e Contrapartida Social', peso: '20%' },
      { criterio: 'Coerência das Rubricas da Tabela Salic', peso: '20%' }
    ],
    rubricasPermitidas: ['Cachês Artísticos (Limites MinC)', 'Sonorização e Iluminação', 'Segurança e Brigada em Favela', 'Divulgação e Assessoria de Imprensa', 'Administração (até 10%)'],
    modeloRecomendado: 'Opus 5 + GPT 5.6 Terra (Salic Format Specialist)'
  },
  {
    id: 'EDITAL-2026-005',
    titulo: 'PNAB 2026 - Política Nacional Aldir Blanc de Fomento à Cultura nas Periferias',
    orgao: 'Secretaria de Estado de Cultura / Governo Federal',
    categoria: 'Cultura & Pontos de Cultura',
    tipoFinanciamento: 'Repasse Direto de Fomento Cultural',
    valorTotalEdital: 'R$ 12.000.000,00',
    valorMaximoProjeto: 'R$ 500.000,00',
    prazoInscricao: '2026-09-30',
    diasRestantes: 40,
    nivelDificuldade: 'Medio',
    matchCUFA: 97,
    abrangencia: 'Estadual (Multi-estados)',
    unidadesRecomendadas: ['CUFA_RJ', 'CUFA_MG', 'CUFA_CE', 'CUFA_RS'],
    resumoExecutivo: 'Premiação e fomento a Pontos e Pontões de Cultura da periferia, fortalecendo a infraestrutura cultural local e a autonomia dos agentes periféricos.',
    requisitosElegibilidade: [
      'Ponto ou Pontão de Cultura certificado ou com comprovada atuação comunitária cultural',
      'Quitação de certidões estaduais e federais'
    ],
    documentosExigidos: [
      'Estatuto Social Atualizado e Registrado',
      'Cartão CNPJ Ativo (Receita Federal)',
      'Certidão Negativa de Débitos Federais e Dívida Ativa (CND Receita)',
      'Certificado de Regularidade do FGTS (CRF Caixa)',
      'Certidão Negativa de Débitos Trabalhistas (CNDT - TST)'
    ],
    criteriosPontuacao: [
      { criterio: 'Historico de Atuação no Território Vulnerável', peso: '40%' },
      { criterio: 'Diversidade Cultural e Inclusão Social', peso: '30%' },
      { criterio: 'Plano de Aplicação dos Recursos', peso: '30%' }
    ],
    rubricasPermitidas: ['Aquisição de Equipamentos Culturais', 'Reformas e Manutenção de Espaços', 'Oficinas e Capacitação', 'Bolsas de Incentivo'],
    modeloRecomendado: 'Fable 5 (Community Identity Writer)'
  }
];
