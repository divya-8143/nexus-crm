import { Request, Response, NextFunction } from 'express';
import { CustomerService } from './CustomerService';

export class CustomerController {
  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const actorId = req.user!.userId;
      const customer = await CustomerService.createCustomer(tenantId, actorId, req.body);
      res.status(201).json({
        success: true,
        data: customer,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;
      const customer = await CustomerService.getCustomer(id, tenantId);
      res.status(200).json({
        success: true,
        data: customer,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }

  public static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 20;
      const filters = {
        search: req.query.search as string,
        lifecycleStage: req.query.lifecycleStage ? (req.query.lifecycleStage as string).split(',') as any : undefined,
        status: req.query.status ? (req.query.status as string).split(',') as any : undefined,
        isVip: req.query.isVip ? req.query.isVip === 'true' : undefined,
      };

      const result = await CustomerService.listCustomers(tenantId, filters, page, limit);
      res.status(200).json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const actorId = req.user!.userId;
      const { id } = req.params;
      const updated = await CustomerService.updateCustomer(id, tenantId, actorId, req.body);
      res.status(200).json({
        success: true,
        data: updated,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const actorId = req.user!.userId;
      const { id } = req.params;
      await CustomerService.deleteCustomer(id, tenantId, actorId);
      res.status(200).json({
        success: true,
        message: 'Customer deleted successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
}
