import { Router, Request, Response } from 'express';
import crypto from 'crypto';

export const vaultRouter = Router();

// Mock database de certidões e documentos do Vault CUFA
let vaultDocs = [
  {
    id: 'DOC-001',
    categoria: 'Fiscal / Regularidade',
    unidadeId: 'NACIONAL',
    nome: 'CND Receita Federal e Dívida Ativa da União',
    tipo: 'PDF',
    tamanho: '1.2 MB',
    dataEmissao: '2026-06-28',
    dataValidade: '2026-12-28',
    status: 'valido',
    descricao: 'Certidão Conjunta Negativa de Débitos Relativos a Tributos Federais e à Dívida Ativa da União.',
    hashSHA256: 'a1b2c3d4e5f67890123456789abcdef0'
  },
  {
    id: 'DOC-002',
    categoria: 'Fiscal / Regularidade',
    unidadeId: 'NACIONAL',
    nome: 'CRF - Certificado de Regularidade do FGTS',
    tipo: 'PDF',
    tamanho: '850 KB',
    dataEmissao: '2026-08-05',
    dataValidade: '2026-09-04',
    status: 'valido',
    descricao: 'Emitido pela Caixa Econômica Federal comprovando a regularidade de recolhimentos ao FGTS.',
    hashSHA256: 'f6e5d4c3b2a109876543210fedcba987'
  },
  {
    id: 'DOC-003',
    categoria: 'Fiscal / Regularidade',
    unidadeId: 'CUFA_RJ',
    nome: 'CND Municipal Rio de Janeiro',
    tipo: 'PDF',
    tamanho: '920 KB',
    dataEmissao: '2026-05-15',
    dataValidade: '2026-09-01',
    status: 'atencao',
    descricao: 'Certidão Negativa de Tributos Municipais da CUFA Rio de Janeiro.',
    hashSHA256: '1234567890abcdef1234567890abcdef'
  }
];

// GET /api/v1/vault/documents
vaultRouter.get('/documents', (req: Request, res: Response) => {
  const { unit, status, search } = req.query;

  let result = [...vaultDocs];

  if (unit && unit !== 'ALL') {
    result = result.filter(d => d.unidadeId === unit);
  }
  if (status && status !== 'ALL') {
    result = result.filter(d => d.status === status);
  }
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(d => d.nome.toLowerCase().includes(q) || d.categoria.toLowerCase().includes(q));
  }

  res.json({
    success: true,
    total: result.length,
    validCount: vaultDocs.filter(d => d.status === 'valido').length,
    healthPercent: Math.round((vaultDocs.filter(d => d.status === 'valido').length / vaultDocs.length) * 100),
    data: result
  });
});

// POST /api/v1/vault/documents
vaultRouter.post('/documents', (req: Request, res: Response) => {
  const { nome, unidadeId, categoria, dataEmissao, dataValidade, descricao } = req.body;

  if (!nome || !unidadeId) {
    return res.status(400).json({ success: false, message: 'Nome e unidadeId são obrigatórios.' });
  }

  const hashSHA256 = crypto.createHash('sha256').update(`${nome}-${Date.now()}`).digest('hex');

  const newDoc = {
    id: `DOC-${Date.now()}`,
    categoria: categoria || 'Fiscal / Regularidade',
    unidadeId,
    nome,
    tipo: 'PDF',
    tamanho: '1.1 MB',
    dataEmissao: dataEmissao || new Date().toISOString().substring(0, 10),
    dataValidade: dataValidade || '2027-08-01',
    status: 'valido',
    descricao: descricao || 'Documento adicionado ao Cofre CUFA.',
    hashSHA256
  };

  vaultDocs.unshift(newDoc);

  res.status(201).json({
    success: true,
    message: 'Certidão / Documento adicionado com sucesso ao Vault da CUFA!',
    data: newDoc
  });
});

// GET /api/v1/vault/health
vaultRouter.get('/health', (req: Request, res: Response) => {
  const total = vaultDocs.length;
  const valid = vaultDocs.filter(d => d.status === 'valido').length;
  const healthPercent = Math.round((valid / total) * 100);

  res.json({
    success: true,
    healthPercent,
    totalDocuments: total,
    validDocuments: valid,
    warningDocuments: vaultDocs.filter(d => d.status === 'atencao').length,
    expiredDocuments: vaultDocs.filter(d => d.status === 'vencido').length
  });
});
