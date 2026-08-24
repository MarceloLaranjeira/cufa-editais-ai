import { Router, Request, Response } from 'express';
import { TransferegovService } from '../services/transferegov.service';

export const monitorRouter = Router();
const transferegovService = new TransferegovService();

// GET /api/v1/monitor/feed
monitorRouter.get('/feed', async (req: Request, res: Response) => {
  const alerts = await transferegovService.fetchMROSCParcerias();

  res.json({
    success: true,
    status: 'ONLINE',
    connectedAPIs: [
      { id: 'PNCP', status: 'ONLINE', latency: '12ms' },
      { id: 'Transferegov', status: 'ONLINE', latency: '45ms' },
      { id: 'DOU', status: 'ONLINE', latency: '80ms' },
      { id: 'SALIC', status: 'ONLINE', latency: '30ms' }
    ],
    alertsCount: alerts.length,
    alerts
  });
});
