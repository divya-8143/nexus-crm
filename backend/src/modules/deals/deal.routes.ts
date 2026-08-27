import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { DealService } from './DealService';
import { authenticate, requirePermission } from '../../core/middleware/AuthMiddleware';

const router = Router();
router.use(authenticate);

router.get('/pipeline', requirePermission('deals', 'read'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pipeline = await DealService.getPipeline(req.user!.tenantId);
    res.json({ success: true, data: pipeline, timestamp: new Date().toISOString() });
  } catch (err) { next(err); }
});

router.post('/', requirePermission('deals', 'create'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deal = await DealService.createDeal(req.user!.tenantId, req.user!.userId, req.body);
    res.status(201).json({ success: true, data: deal, timestamp: new Date().toISOString() });
  } catch (err) { next(err); }
});

router.patch('/:id/stage', requirePermission('deals', 'update'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { stage } = req.body;
    const updated = await DealService.updateStage(id, req.user!.tenantId, req.user!.userId, stage);
    res.json({ success: true, data: updated, timestamp: new Date().toISOString() });
  } catch (err) { next(err); }
});

export default router;
