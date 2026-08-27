import jwt from 'jsonwebtoken';
import { Config } from '../config/env';
import { UserProfile } from '@nexus/shared';
import { UnauthorizedError } from '../errors/AppError';

export interface JwtTokenPayload {
  userId: string;
  tenantId: string;
  email: string;
  role: string;
}

export class JwtService {
  public static signAccessToken(user: UserProfile): string {
    const payload: JwtTokenPayload = {
      userId: user.id,
      tenantId: user.tenantId,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, Config.JWT_SECRET, { expiresIn: '8h' });
  }

  public static signRefreshToken(user: UserProfile): string {
    return jwt.sign({ userId: user.id, tenantId: user.tenantId }, Config.JWT_SECRET, { expiresIn: '7d' });
  }

  public static verifyToken(token: string): JwtTokenPayload {
    try {
      return jwt.verify(token, Config.JWT_SECRET) as JwtTokenPayload;
    } catch (err: any) {
      throw new UnauthorizedError('Token is invalid or expired');
    }
  }
}
