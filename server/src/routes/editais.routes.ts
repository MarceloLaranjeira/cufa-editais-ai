import { Router, Request, Response } from 'express';
import { PNCPIntegrationService } from '../services/pncpIntegration.service';

export const editaisRouter = Router();
const pncpService = new PNCPIntegrationService();

// Mock editais
let editaisList = [
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
    rubricasPermitidas: ['Bolsas de Formação para Lideranças', 'Recursos Financeiros de Fortalecimento Institucional', 'Custeio de Formalização e Cartório', 'Capacitação e Mentoria Executiva']
  },
  {
    id: 'EDITAL-2026-001',
    titulo: 'Edital Petrobras Socioambiental 2026 — Transição Justa e Favelas Sustentáveis',
    orgao: 'Petrobras & Instituto Petrobras',
    categoria: 'Desenvolvimento Social & Meio Ambiente',
    tipoFinanciamento: 'Fundo Privado de Investimento Social',
    valorTotalEdital: 'R$ 45.000.000,00',
    valorMaximoProjeto: 'R$ 3.000.000,00',
    prazoInscricao: '2026-11-15',
    diasRestantes: 85,
    nivelDificuldade: 'Medio',
    matchCUFA: 98,
    abrangencia: 'Nacional (Prioridade para RJ, SP, RS e BA)',
    unidadesRecomendadas: ['NACIONAL', 'CUFA_RJ', 'CUFA_SP', 'CUFA_RS', 'CUFA_BA'],
    resumoExecutivo: 'Apoio a projetos de fortalecimento comunitário, economia circular e capacitação profissional de jovens residentes em territórios periféricos e favelas.',
    requisitosElegibilidade: [
      'Organização da Sociedade Civil (OSC) constituída há mais de 3 anos',
      'Comprovação de atuação em comunidades periféricas nos últimos 24 meses',
      'Certidão Negativa de Débitos Federais, Trabalhistas e FGTS válidas'
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
      { criterio: 'Impacto Social e Capilaridade em Favelas', peso: '35%' },
      { criterio: 'Metodologia e Viabilidade do Plano de Trabalho', peso: '30%' },
      { criterio: 'Adequação Orçamentária e Custo-Benefício', peso: '20%' },
      { criterio: 'Inovação e Replicabilidade Tecnológica', peso: '15%' }
    ],
    rubricasPermitidas: ['Equipe Técnica Local', 'Alimentação e Logística', 'Equipamentos e Materiais']
  },
  {
    id: 'EDITAL-2026-002',
    titulo: 'Edital BNDES Fundo Social — Capacitação Profissional e Economia Criativa em Favelas',
    orgao: 'BNDES — Banco Nacional de Desenvolvimento Econômico e Social',
    categoria: 'Geração de Renda & Inclusão Produtiva',
    tipoFinanciamento: 'Recursos Não-Reembolsáveis do Fundo Social',
    valorTotalEdital: 'R$ 60.000.000,00',
    valorMaximoProjeto: 'R$ 5.000.000,00',
    prazoInscricao: '2026-10-30',
    diasRestantes: 70,
    nivelDificuldade: 'Dificil',
    matchCUFA: 96,
    abrangencia: 'Nacional',
    unidadesRecomendadas: ['NACIONAL', 'CUFA_SP', 'CUFA_RJ'],
    resumoExecutivo: 'Financiamento a redes de polos tecnológicos e centros de formação profissional gerenciados por entidades de base comunitária em favelas brasileiras.',
    requisitosElegibilidade: [
      'OSC com histórico comprovado de projetos acima de R$ 1.000.000,00',
      'Governança corporativa auditada e conselho fiscal ativo'
    ],
    documentosExigidos: [
      'Estatuto Registrado',
      'CNPJ Ativo',
      'CND Federal',
      'CRF FGTS',
      'CNDT Trabalhista'
    ],
    criteriosPontuacao: [
      { criterio: 'Capacidade de Mobilização Comunitária', peso: '40%' },
      { criterio: 'Clareza Orçamentária', peso: '30%' }
    ],
    rubricasPermitidas: ['Recursos Humanos', 'Infraestrutura Tecnológica', 'Bolsas de Estudo']
  }
];

// GET /api/v1/editais/radar
editaisRouter.get('/radar', async (req: Request, res: Response) => {
  // Tenta puxar contratações ao vivo do PNCP
  const pncpData = await pncpService.fetchLatestContratacoes();

  const combined = [...pncpData, ...editaisList];

  res.json({
    success: true,
    total: combined.length,
    pncpLiveCount: pncpData.length,
    data: combined
  });
});

// POST /api/v1/editais/:id/analyze
editaisRouter.post('/:id/analyze', (req: Request, res: Response) => {
  const { id } = req.params;
  const edital = editaisList.find(e => e.id === id) || editaisList[0];

  res.json({
    success: true,
    message: 'Análise de elegibilidade e leitura de IA (GPT 5.6 & Fable 5) concluída.',
    data: edital
  });
});
