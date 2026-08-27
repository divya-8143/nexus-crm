import { UserRepository } from './UserRepository';
import { PasswordHasher } from '../../core/security/Hasher';
import { JwtService } from '../../core/security/JwtService';
import { UnauthorizedError, ConflictError, ValidationError, NotFoundError } from '../../core/errors/AppError';
import { AuthSession, UserProfile } from '@nexus/shared';
import { EventBus } from '../../core/events/EventBus';

export class AuthService {
  public static async login(email: string, passwordPlain: string): Promise<AuthSession> {
    if (!email || !passwordPlain) {
      throw new ValidationError('Email and password must be provided');
    }

    const userEntity = await UserRepository.findByEmail(email);
    if (!userEntity) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isMatch = await PasswordHasher.compare(passwordPlain, userEntity.password_hash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    await UserRepository.updateLastLogin(userEntity.id);
    const profile = UserRepository.toProfile(userEntity);

    const accessToken = JwtService.signAccessToken(profile);
    const refreshToken = JwtService.signRefreshToken(profile);

    await EventBus.getInstance().publish('AUTH_LOGIN_SUCCESS', {
      userId: profile.id,
      tenantId: profile.tenantId,
      email: profile.email,
      timestamp: new Date().toISOString(),
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 28800, // 8 hours in seconds
      user: profile,
    };
  }

  public static async register(data: {
    email: string;
    passwordPlain: string;
    firstName: string;
    lastName: string;
    role?: string;
    tenantId?: string;
  }): Promise<AuthSession> {
    const existing = await UserRepository.findByEmail(data.email);
    if (existing) {
      throw new ConflictError('A user with this email address already exists');
    }

    if (data.passwordPlain.length < 8) {
      throw new ValidationError('Password must be at least 8 characters in length');
    }

    const passwordHash = await PasswordHasher.hash(data.passwordPlain);
    const created = await UserRepository.create({
      email: data.email,
      password_hash: passwordHash,
      first_name: data.firstName,
      last_name: data.lastName,
      role: data.role || 'SALES_AGENT',
      tenant_id: data.tenantId || 'tenant_default_01',
    });

    const profile = UserRepository.toProfile(created);
    const accessToken = JwtService.signAccessToken(profile);
    const refreshToken = JwtService.signRefreshToken(profile);

    return {
      accessToken,
      refreshToken,
      expiresIn: 28800,
      user: profile,
    };
  }

  public static async getCurrentUser(userId: string): Promise<UserProfile> {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User', userId);
    }
    return UserRepository.toProfile(user);
  }
}
