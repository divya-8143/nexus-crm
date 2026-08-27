import { Request, Response, NextFunction } from 'express';
import { JwtService, JwtTokenPayload } from '../security/JwtService';
import { UnauthorizedError, ForbiddenError } from '../errors/AppError';
import { RBAC_PERMISSIONS, UserRole } from '@nexus/shared';

declare global {
  namespace Express {
    interface Request {
      user?: JwtTokenPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No authorization token provided');
  }

  const token = authHeader.split(' ')[1];
  const decoded = JwtService.verifyToken(token);
  req.user = decoded;
  next();
};

export const requirePermission = (
  resource: keyof typeof RBAC_PERMISSIONS['SUPER_ADMIN'],
  action: 'create' | 'read' | 'update' | 'delete' | 'export' | 'admin'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const userRole = req.user.role as UserRole;
    const rolePermissions = (RBAC_PERMISSIONS[userRole] as any)?.[resource] || [];

    if (!rolePermissions.includes(action) && !rolePermissions.includes('admin')) {
      throw new ForbiddenError(`Role ${userRole} is not authorized to ${action} ${resource}`);
    }

    next();
  };
};
