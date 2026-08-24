import { Router, Request, Response } from 'express';
import { PDFGeneratorService } from '../services/pdfGenerator.service';

export const proposalsRouter = Router();
const pdfService = new PDFGeneratorService();

// POST /api/v1/proposals/generate
proposalsRouter.post('/generate', (req: Request, res: Response) => {
  const { editalTitle, requestedBudget, targetAudience, unitName, unitCnpj } = req.body;

  const proposal = {
    id: `PROP-${Date.now()}`,
    title: req.body.title || 'Projeto Favela Conectada & Capacitação Tecnológica CUFA',
    editalTitle: editalTitle || 'Edital Petrobras Socioambiental 2026',
    agency: req.body.agency || 'Petrobras',
    requestedBudget: requestedBudget || 'R$ 1.500.000,00',
    targetAudience: targetAudience || '1.200 jovens e mães solo de 15 favelas prioritárias',
    unitName: unitName || 'CUFA Brasil (Sede Nacional)',
    unitCnpj: unitCnpj || '05.295.441/0001-90',
    justificationText: `A presente proposta responde às profundas assimetrias históricas vivenciadas pelos moradores das favelas brasileiras. Com base na metodologia consolidada pela CUFA ao longo de mais de 20 anos de atuação direta nos territórios, o projeto atuará como vetor de transformação socioeconômica, combinando qualificação profissional, inclusão digital e fomento à economia criativa local.`,
    matchScore: 98,
    deadline: '2026-11-15',
    status: 'ready'
  };

  res.json({
    success: true,
    message: 'Proposta e Dossiê gerados com sucesso pelo motor Fable 5 + Opus 5!',
    data: proposal
  });
});

// GET /api/v1/proposals/pdf
proposalsRouter.get('/pdf', (req: Request, res: Response) => {
  const title = String(req.query.title || 'Projeto Favela Conectada CUFA');
  const editalTitle = String(req.query.edital || 'Edital Petrobras Socioambiental 2026');
  const requestedBudget = String(req.query.budget || 'R$ 1.500.000,00');

  const pdfBuffer = pdfService.generateProposalPDF({
    title,
    editalTitle,
    agency: 'Petrobras',
    requestedBudget,
    targetAudience: '1.200 famílias e jovens de favelas',
    unitName: 'CUFA Brasil (Sede Nacional)',
    unitCnpj: '05.295.441/0001-90',
    justificationText: 'A presente proposta atende rigorosamente aos critérios formais de elegibilidade e impacto social nas favelas.',
    matchScore: 98,
    deadline: '2026-11-15'
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="CUFA_Dossie_${title.replace(/\s+/g, '_')}.pdf"`);
  res.send(pdfBuffer);
});

// GET /api/v1/proposals/zip
proposalsRouter.get('/zip', async (req: Request, res: Response) => {
  const title = String(req.query.title || 'Projeto Favela Conectada CUFA');

  const pdfBuffer = pdfService.generateProposalPDF({
    title,
    editalTitle: 'Edital Petrobras Socioambiental 2026',
    agency: 'Petrobras',
    requestedBudget: 'R$ 1.500.000,00',
    targetAudience: '1.200 famílias e jovens de favelas',
    unitName: 'CUFA Brasil (Sede Nacional)',
    unitCnpj: '05.295.441/0001-90',
    justificationText: 'Justificativa social e plano de trabalho completo.',
    matchScore: 98,
    deadline: '2026-11-15'
  });

  const zipBuffer = await pdfService.createSubmissionZip(pdfBuffer, title);

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="Pacote_Submissao_CUFA_${title.replace(/\s+/g, '_')}.zip"`);
  res.send(zipBuffer);
});
