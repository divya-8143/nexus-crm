import { Router } from 'express';
import { CustomerController } from './CustomerController';
import { authenticate, requirePermission } from '../../core/middleware/AuthMiddleware';

const router = Router();

router.use(authenticate);

router.post('/', requirePermission('customers', 'create'), CustomerController.create);
router.get('/', requirePermission('customers', 'read'), CustomerController.list);
router.get('/:id', requirePermission('customers', 'read'), CustomerController.getById);
router.put('/:id', requirePermission('customers', 'update'), CustomerController.update);
router.delete('/:id', requirePermission('customers', 'delete'), CustomerController.delete);

export default router;
