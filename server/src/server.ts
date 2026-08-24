import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { env } from './config/env';

import { vaultRouter } from './routes/vault.routes';
import { squadRouter } from './routes/squad.routes';
import { editaisRouter } from './routes/editais.routes';
import { proposalsRouter } from './routes/proposals.routes';
import { memoryRouter } from './routes/memory.routes';
import { monitorRouter } from './routes/monitor.routes';

const app: Express = express();

// Security and Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check API
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    system: 'CUFA Editais AI Backend v2.0',
    aiEngines: {
      gpt56: env.GPT56_MODEL,
      fable5: env.FABLE5_MODEL
    },
    timestamp: new Date().toISOString()
  });
});

// API v1 Router Registration
app.use('/api/v1/vault', vaultRouter);
app.use('/api/v1/squad', squadRouter);
app.use('/api/v1/editais', editaisRouter);
app.use('/api/v1/proposals', proposalsRouter);
app.use('/api/v1/memory', memoryRouter);
app.use('/api/v1/monitor', monitorRouter);

// Servir arquivos estáticos do frontend (para execução unificada em produção)
const staticPath = path.join(__dirname, '../../');
app.use(express.static(staticPath));

// Fallback SPA Route
app.get('*', (req: Request, res: Response) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'Endpoint de API não encontrado.' });
  }
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[CUFA Backend Error]:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno no servidor de inteligência da CUFA.',
    error: env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Express Server
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`==================================================================`);
  console.log(`🚀 CUFA EDITAIS AI — SERVIDOR BACKEND ATIVO (v2.0)`);
  console.log(`📡 URL da API: http://localhost:${PORT}/api/v1/health`);
  console.log(`🤖 Motores de IA: ${env.GPT56_MODEL} | ${env.FABLE5_MODEL}`);
  console.log(`🏛️  Entidade: Central Única das Favelas (CUFA Brasil)`);
  console.log(`==================================================================`);
});

export default app;
