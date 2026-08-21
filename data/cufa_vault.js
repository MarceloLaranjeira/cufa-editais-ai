// Acervo Institucional e Documental da CUFA (Central Única das Favelas)
// Suporte Multi-Estado e Nacional com Validação de Vigência e Certidões

window.CUFA_VAULT = {
  unidades: [
    { id: 'NACIONAL', nome: 'CUFA Brasil (Sede Nacional)', cnpj: '05.295.441/0001-90', uf: 'BR', cidade: 'Rio de Janeiro / São Paulo' },
    { id: 'CUFA_SP', nome: 'CUFA São Paulo', cnpj: '11.890.312/0001-44', uf: 'SP', cidade: 'São Paulo' },
    { id: 'CUFA_RJ', nome: 'CUFA Rio de Janeiro', cnpj: '05.295.441/0002-71', uf: 'RJ', cidade: 'Rio de Janeiro' },
    { id: 'CUFA_RS', nome: 'CUFA Rio Grande do Sul', cnpj: '18.442.109/0001-50', uf: 'RS', cidade: 'Porto Alegre' },
    { id: 'CUFA_BA', nome: 'CUFA Bahia', cnpj: '22.104.992/0001-88', uf: 'BA', cidade: 'Salvador' },
    { id: 'CUFA_DF', nome: 'CUFA Distrito Federal', cnpj: '09.314.551/0001-20', uf: 'DF', cidade: 'Brasília' },
    { id: 'CUFA_MG', nome: 'CUFA Minas Gerais', cnpj: '14.501.229/0001-03', uf: 'MG', cidade: 'Belo Horizonte' },
    { id: 'CUFA_CE', nome: 'CUFA Ceará', cnpj: '16.788.401/0001-66', uf: 'CE', cidade: 'Fortaleza' }
  ],
  
  documentos: [
    {
      id: 'DOC-001',
      categoria: 'Jurídico Institucional',
      unidadeId: 'NACIONAL',
      nome: 'Estatuto Social Atualizado e Registrado',
      tipo: 'PDF',
      tamanho: '2.4 MB',
      dataEmissao: '2023-04-10',
      dataValidade: '2030-12-31',
      status: 'valido',
      obrigatorioGeral: true,
      descricao: 'Estatuto consolidado com finalidade social de desenvolvimento das favelas e periferias.'
    },
    {
      id: 'DOC-002',
      categoria: 'Jurídico Institucional',
      unidadeId: 'NACIONAL',
      nome: 'Cartão CNPJ Ativo (Receita Federal)',
      tipo: 'PDF',
      tamanho: '450 KB',
      dataEmissao: '2026-01-15',
      dataValidade: '2026-12-31',
      status: 'valido',
      obrigatorioGeral: true,
      descricao: 'Comprovante de Inscrição e de Situação Cadastral Ativa.'
    },
    {
      id: 'DOC-003',
      categoria: 'Governança',
      unidadeId: 'NACIONAL',
      nome: 'Ata de Eleição e Posse da Diretoria Vigente',
      tipo: 'PDF',
      tamanho: '1.8 MB',
      dataEmissao: '2024-03-01',
      dataValidade: '2028-03-01',
      status: 'valido',
      obrigatorioGeral: true,
      descricao: 'Registrada em Cartório de Títulos e Documentos com mandato ativo.'
    },
    {
      id: 'DOC-004',
      categoria: 'Fiscal / Regularidade',
      unidadeId: 'NACIONAL',
      nome: 'Certidão Negativa de Débitos Federais e Dívida Ativa (CND Receita)',
      tipo: 'PDF',
      tamanho: '320 KB',
      dataEmissao: '2026-07-01',
      dataValidade: '2026-12-28',
      status: 'valido',
      obrigatorioGeral: true,
      descricao: 'Quitação plena de tributos federais e contribuições previdenciárias.'
    },
    {
      id: 'DOC-005',
      categoria: 'Fiscal / Regularidade',
      unidadeId: 'NACIONAL',
      nome: 'Certificado de Regularidade do FGTS (CRF Caixa)',
      tipo: 'PDF',
      tamanho: '280 KB',
      dataEmissao: '2026-08-05',
      dataValidade: '2026-09-04',
      status: 'valido',
      obrigatorioGeral: true,
      descricao: 'Regularidade perante o Fundo de Garantia do Tempo de Serviço.'
    },
    {
      id: 'DOC-006',
      categoria: 'Trabalhista',
      unidadeId: 'NACIONAL',
      nome: 'Certidão Negativa de Débitos Trabalhistas (CNDT - TST)',
      tipo: 'PDF',
      tamanho: '290 KB',
      dataEmissao: '2026-06-15',
      dataValidade: '2026-12-12',
      status: 'valido',
      obrigatorioGeral: true,
      descricao: 'Inexistência de débitos inadimplidos perante a Justiça do Trabalho.'
    },
    {
      id: 'DOC-007',
      categoria: 'Conselho / Assistência',
      unidadeId: 'CUFA_SP',
      nome: 'Inscrição no Conselho Municipal de Assistência Social (CMAS SP)',
      tipo: 'PDF',
      tamanho: '890 KB',
      dataEmissao: '2025-01-20',
      dataValidade: '2027-01-20',
      status: 'valido',
      obrigatorioGeral: false,
      descricao: 'Registro ativo no CMAS para proposição de convênios na área de desenvolvimento social.'
    },
    {
      id: 'DOC-008',
      categoria: 'Fiscal Estadual',
      unidadeId: 'CUFA_SP',
      nome: 'Certidão Negativa Estadual de São Paulo (SEFAZ SP)',
      tipo: 'PDF',
      tamanho: '310 KB',
      dataEmissao: '2026-05-10',
      dataValidade: '2026-11-10',
      status: 'valido',
      obrigatorioGeral: false,
      descricao: 'Regularidade fiscal no estado de São Paulo.'
    },
    {
      id: 'DOC-009',
      categoria: 'Capacidade Técnica',
      unidadeId: 'NACIONAL',
      nome: 'Atestado de Capacidade Técnica - Taça das Favelas',
      tipo: 'PDF',
      tamanho: '4.2 MB',
      dataEmissao: '2025-11-10',
      dataValidade: '2030-01-01',
      status: 'valido',
      obrigatorioGeral: false,
      descricao: 'Comprovação de execução do maior campeonato de futebol entre favelas do mundo (+100 mil jovens).'
    },
    {
      id: 'DOC-010',
      categoria: 'Capacidade Técnica',
      unidadeId: 'NACIONAL',
      nome: 'Atestado de Capacidade Técnica - Expo Favela Innovation',
      tipo: 'PDF',
      tamanho: '3.8 MB',
      dataEmissao: '2025-09-15',
      dataValidade: '2030-01-01',
      status: 'valido',
      obrigatorioGeral: false,
      descricao: 'Feira de negócios e empreendedorismo que conecta favela e asfalto com mais de R$ 50M em negócios.'
    },
    {
      id: 'DOC-011',
      categoria: 'Capacidade Técnica',
      unidadeId: 'NACIONAL',
      nome: 'Atestado de Capacidade Técnica - Mães da Favela',
      tipo: 'PDF',
      tamanho: '5.1 MB',
      dataEmissao: '2024-12-01',
      dataValidade: '2030-01-01',
      status: 'valido',
      obrigatorioGeral: false,
      descricao: 'Relatório auditado de distribuição de cestas, conectividade e renda para chefes de família.'
    },
    {
      id: 'DOC-012',
      categoria: 'Fiscal Municipal',
      unidadeId: 'CUFA_RJ',
      nome: 'Certidão Negativa Tributária Municipal (Prefeitura do Rio de Janeiro)',
      tipo: 'PDF',
      tamanho: '340 KB',
      dataEmissao: '2026-08-01',
      dataValidade: '2026-09-01',
      status: 'atencao', // A vencer em breve
      obrigatorioGeral: false,
      descricao: 'Certidão municipal em fase final de vigência (vence em menos de 15 dias).'
    },
    {
      id: 'DOC-013',
      categoria: 'Prestação de Contas',
      unidadeId: 'NACIONAL',
      nome: 'Relatório Auditado de Prestação de Contas Anual (Big Four)',
      tipo: 'PDF',
      tamanho: '8.7 MB',
      dataEmissao: '2025-04-30',
      dataValidade: '2027-04-30',
      status: 'valido',
      obrigatorioGeral: true,
      descricao: 'Auditoria independente demonstrando compliance e transparência contábil total.'
    }
  ]
};
