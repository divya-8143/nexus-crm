import { Router, Request, Response, NextFunction } from 'express';
import { AnalyticsService } from './AnalyticsService';
import { authenticate, requirePermission } from '../../core/middleware/AuthMiddleware';

const router = Router();
router.use(authenticate);

router.get('/dashboard', requirePermission('analytics', 'read'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await AnalyticsService.getExecutiveSummary(req.user!.tenantId);
    res.json({ success: true, data: summary, timestamp: new Date().toISOString() });
  } catch (err) { next(err); }
});

export default router;
