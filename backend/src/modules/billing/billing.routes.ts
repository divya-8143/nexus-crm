import { Router, Request, Response, NextFunction } from 'express';
import { InvoiceRepository } from './InvoiceRepository';
import { authenticate, requirePermission } from '../../core/middleware/AuthMiddleware';

const router = Router();
router.use(authenticate);

router.get('/', requirePermission('billing', 'read'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoices = await InvoiceRepository.listByTenant(req.user!.tenantId);
    res.json({ success: true, data: invoices, timestamp: new Date().toISOString() });
  } catch (err) { next(err); }
});

router.post('/', requirePermission('billing', 'create'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = await InvoiceRepository.create({ ...req.body, tenantId: req.user!.tenantId });
    res.status(201).json({ success: true, data: invoice, timestamp: new Date().toISOString() });
  } catch (err) { next(err); }
});

export default router;
