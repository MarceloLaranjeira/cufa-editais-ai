import { Router, Request, Response } from 'express';

export const memoryRouter = Router();

const memoryData = {
  historicoPropostas: [
    {
      id: 'HIST-2025-01',
      editalNome: 'Edital Petrobras Socioambiental 2025 (Seleção Nacional)',
      orgao: 'Petrobras',
      ano: 2025,
      resultado: 'Aprovado',
      notaObtida: '98.5 / 100',
      valorAprovado: 'R$ 2.800.000,00',
      pontosFortesDestacados: [
        'Comprovação de capilaridade em mais de 500 favelas brasileiras',
        'Metodologia transparente de bolsas de auxílio para jovens e mães solo',
        'Demonstração de governança institucional com certidões 100% em dia'
      ],
      aprenderParaFuturo: 'Usar a mesma estrutura de indicadores de impacto social para os editais do BNDES e Itaú Social.'
    },
    {
      id: 'HIST-2025-02',
      editalNome: 'Edital BNDES Fundo Social — Periferias em Ação 2024',
      orgao: 'BNDES',
      ano: 2024,
      resultado: 'Aprovado',
      notaObtida: '96.0 / 100',
      valorAprovado: 'R$ 4.500.000,00',
      pontosFortesDestacados: [
        'Planilha orçamentária detalhada por rubrica respeitando os limites salariais locais',
        'Apoio institucional formal de associações de moradores de favelas'
      ],
      aprenderParaFuturo: 'Manter a matriz orçamentária pré-configurada com 45% RH, 30% Infra, 15% Bolsas e 10% Gestão.'
    }
  ],
  regrasAutoAjuste: [
    {
      id: 'RULE-01',
      alvo: 'Teto de Recursos Humanos (RH)',
      descricao: 'Ajustar automaticamente os honorários da equipe local para responder até 45% do valor total solicitado.',
      status: 'ativo'
    },
    {
      id: 'RULE-02',
      alvo: 'Narrativa Social para Favelas (Fable 5 Engine)',
      descricao: 'Incorporar obrigatoriamente dados territoriais reais de vulnerabilidade social de mães de favela e jovens periféricos.',
      status: 'ativo'
    },
    {
      id: 'RULE-03',
      alvo: 'Verificação de Compatibilidade de Certidões (GPT 5.6 Terra)',
      descricao: 'Exigir anexação preventiva de certidões federais e trabalhistas com no mínimo 30 dias de vigência restante.',
      status: 'ativo'
    }
  ]
};

// GET /api/v1/memory/history
memoryRouter.get('/history', (req: Request, res: Response) => {
  res.json({
    success: true,
    totalHistory: memoryData.historicoPropostas.length,
    history: memoryData.historicoPropostas,
    rules: memoryData.regrasAutoAjuste
  });
});
