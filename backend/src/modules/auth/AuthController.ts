import { Request, Response, NextFunction } from 'express';
import { AuthService } from './AuthService';

export class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const session = await AuthService.login(email, password);
      res.status(200).json({
        success: true,
        data: session,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }

  public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, firstName, lastName, role, tenantId } = req.body;
      const session = await AuthService.register({
        email,
        passwordPlain: password,
        firstName,
        lastName,
        role,
        tenantId,
      });
      res.status(201).json({
        success: true,
        data: session,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }

  public static async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const userProfile = await AuthService.getCurrentUser(userId);
      res.status(200).json({
        success: true,
        data: userProfile,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
}
