import { Router, Request, Response, NextFunction } from 'express';
import { AuditRepository } from './AuditRepository';
import { authenticate, requirePermission } from '../../core/middleware/AuthMiddleware';

const router = Router();
router.use(authenticate);

router.get('/', requirePermission('audit', 'read'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const logs = await AuditRepository.list(req.user!.tenantId);
    res.json({ success: true, data: logs, timestamp: new Date().toISOString() });
  } catch (err) { next(err); }
});

export default router;
