// Feed de Monitoramento de Editais em Tempo Real (PNCP, Transferegov, DOU, Salic, Fundações)
// Simulação de Webhooks e consumo de APIs públicas oficiais do Governo Brasileiro

window.REALTIME_FEED = {
  fontesConectadas: [
    { id: 'PNCP', nome: 'Portal Nacional de Contratações Públicas (PNCP)', status: 'online', latencia: '12ms', tipo: 'API REST Oficial' },
    { id: 'TRANSFEREGOV', nome: 'Plataforma Transferegov.br / SICONV', status: 'online', latencia: '45ms', tipo: 'Webhook Push' },
    { id: 'DOU', nome: 'Diário Oficial da União (DOU - Seção 3)', status: 'online', latencia: '80ms', tipo: 'Web Scraping RSS' },
    { id: 'SALIC', nome: 'Sistema de Apoio às Leis de Incentivo à Cultura (SALIC)', status: 'online', latencia: '30ms', tipo: 'API Minc' },
    { id: 'BNDES_API', nome: 'Portal de Editais BNDES Fundo Social', status: 'online', latencia: '22ms', tipo: 'API Corporativa' }
  ],

  alertasCapturados: [
    {
      id: 'ALT-101',
      timestamp: '2026-08-20T21:45:00Z',
      fonte: 'PNCP',
      orgao: 'Ministério do Desenvolvimento e Assistência Social (MDS)',
      titulo: 'Chamamento Público MDS nº 04/2026 - Cozinhas Solidárias e Combate à Fome nas Favelas',
      valorEstimado: 'R$ 25.000.000,00',
      prazo: '2026-10-30',
      prioridade: 'ALTA',
      matchScore: 99,
      statusAlerta: 'NOVO',
      mensagem: 'Oportunidade perfeita para a CUFA. Foco em cozinha comunitária, fornecimento de marmitas e inclusão produtiva para mães de periferia.'
    },
    {
      id: 'ALT-102',
      timestamp: '2026-08-20T20:10:00Z',
      fonte: 'TRANSFEREGOV',
      orgao: 'Ministério do Esporte (MESP)',
      titulo: 'Edital MESP nº 12/2026 - Peladões da Favela & Esporte Comunitário Periférico',
      valorEstimado: 'R$ 8.000.000,00',
      prazo: '2026-10-05',
      prioridade: 'ALTA',
      matchScore: 97,
      statusAlerta: 'NOVO',
      mensagem: 'Alinhamento imediato com o histórico da Taça das Favelas. Exige comprovação de execução prévia de torneios comunitários.'
    },
    {
      id: 'ALT-103',
      timestamp: '2026-08-20T18:30:00Z',
      fonte: 'SALIC',
      orgao: 'Ministério da Cultura (MinC)',
      titulo: 'Portaria MinC - Liberação de Novo Lote de Projetos da Favela no Artigo 18',
      valorEstimado: 'R$ 50.000.000,00 (Teto Global)',
      prazo: 'Fluxo Contínuo',
      prioridade: 'MEDIA',
      matchScore: 95,
      statusAlerta: 'LIDO',
      mensagem: 'Novas diretrizes para captação via renúncia fiscal com 100% de isenção de IRPJ/IRPF para patrocinadores.'
    }
  ]
};
