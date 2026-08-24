import { Router, Request, Response } from 'express';
import { AIEngineService } from '../services/aiEngine.service';

export const squadRouter = Router();
const aiService = new AIEngineService();

// Mock squad de agentes
const agentsList = [
  { id: 'AGENT-SENTINELA', nome: 'Sentinela de Editais', papel: 'Real-Time Radar & Alert AI', modeloIA: 'GPT 5.6 Sol', avatarColor: '#FFC700' },
  { id: 'AGENT-AUDITOR', nome: 'Auditor de Compliance & Vault', papel: 'Certidões & Elegibilidade', modeloIA: 'GPT 5.6 Terra', avatarColor: '#3B82F6' },
  { id: 'AGENT-REDATOR', nome: 'Redator Especialista de Projetos', papel: 'Plano de Trabalho & Justificativa', modeloIA: 'Fable 5 + Opus 5', avatarColor: '#10B981' },
  { id: 'AGENT-REVISOR', nome: 'Revisor Final & Preenchedor (QC)', papel: 'Controle de Qualidade & Submissão', modeloIA: 'GPT 5.6 Sol', avatarColor: '#8B5CF6' },
  { id: 'AGENT-JURIDICO', nome: 'Estrategista Jurídico de Recursos', papel: 'Minutas MROSC (Lei 13.019/14)', modeloIA: 'GPT 5.6 Law', avatarColor: '#EF4444' },
  { id: 'AGENT-MEMORIA', nome: 'Memória Institucional & Auto-Ajuste', papel: 'Histórico & Compatibilidade', modeloIA: 'Self-Adjust Engine', avatarColor: '#F59E0B' }
];

// Memory chat logs por agente
const chatLogsDB: Record<string, Array<{ sender: string; text: string; timestamp: string }>> = {};

// GET /api/v1/squad/agents
squadRouter.get('/agents', (req: Request, res: Response) => {
  res.json({
    success: true,
    total: agentsList.length,
    data: agentsList
  });
});

// POST /api/v1/squad/chat
squadRouter.post('/chat', async (req: Request, res: Response) => {
  const { agentId, prompt } = req.body;

  if (!agentId || !prompt) {
    return res.status(400).json({ success: false, message: 'agentId e prompt são obrigatórios.' });
  }

  // Executa pelo motor de IA (GPT 5.6 e Fable 5)
  const agentReply = await aiService.executeAgentInstruction(agentId, prompt);

  if (!chatLogsDB[agentId]) {
    chatLogsDB[agentId] = [];
  }

  const timestamp = new Date().toISOString();
  chatLogsDB[agentId].push({ sender: 'user', text: prompt, timestamp });
  chatLogsDB[agentId].push({ sender: 'agent', text: agentReply.text, timestamp });

  res.json({
    success: true,
    agentResponse: agentReply,
    history: chatLogsDB[agentId]
  });
});

// DELETE /api/v1/squad/chat/:agentId
squadRouter.delete('/chat/:agentId', (req: Request, res: Response) => {
  const { agentId } = req.params;
  chatLogsDB[agentId] = [];
  res.json({
    success: true,
    message: `Conversa do agente ${agentId} reiniciada com sucesso.`
  });
});
