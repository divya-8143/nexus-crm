import { Router, Request, Response, NextFunction } from 'express';
import { TicketRepository } from './TicketRepository';
import { authenticate, requirePermission } from '../../core/middleware/AuthMiddleware';

const router = Router();
router.use(authenticate);

router.get('/', requirePermission('helpdesk', 'read'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tickets = await TicketRepository.listByTenant(req.user!.tenantId, req.query.status as string);
    res.json({ success: true, data: tickets, timestamp: new Date().toISOString() });
  } catch (err) { next(err); }
});

router.post('/', requirePermission('helpdesk', 'create'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticket = await TicketRepository.create({ ...req.body, tenantId: req.user!.tenantId });
    res.status(201).json({ success: true, data: ticket, timestamp: new Date().toISOString() });
  } catch (err) { next(err); }
});

router.patch('/:id/status', requirePermission('helpdesk', 'update'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await TicketRepository.updateStatus(id, req.user!.tenantId, status);
    res.json({ success: true, data: updated, timestamp: new Date().toISOString() });
  } catch (err) { next(err); }
});

export default router;
