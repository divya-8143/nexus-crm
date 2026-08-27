import { Database } from '../../core/database/connection';
import { UserProfile, UserRole } from '@nexus/shared';

export interface UserEntity {
  id: string;
  tenant_id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: string;
  department: string | null;
  phone_number: string | null;
  avatar_url: string | null;
  is_active: number;
  two_factor_enabled: number;
  two_factor_secret: string | null;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export class UserRepository {
  public static toProfile(entity: UserEntity): UserProfile {
    return {
      id: entity.id,
      tenantId: entity.tenant_id,
      email: entity.email,
      firstName: entity.first_name,
      lastName: entity.last_name,
      role: entity.role as UserRole,
      department: entity.department || undefined,
      phoneNumber: entity.phone_number || undefined,
      avatarUrl: entity.avatar_url || undefined,
      isActive: entity.is_active === 1,
      twoFactorEnabled: entity.two_factor_enabled === 1,
      lastLoginAt: entity.last_login_at || undefined,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    };
  }

  public static async findByEmail(email: string): Promise<UserEntity | null> {
    return Database.getOne<UserEntity>(
      'SELECT * FROM users WHERE email = ? AND is_active = 1',
      [email.toLowerCase().trim()]
    );
  }

  public static async findById(id: string): Promise<UserEntity | null> {
    return Database.getOne<UserEntity>('SELECT * FROM users WHERE id = ?', [id]);
  }

  public static async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const id = user.id || `usr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const sql = `
      INSERT INTO users (
        id, tenant_id, email, password_hash, first_name, last_name,
        role, department, phone_number, avatar_url, is_active, two_factor_enabled,
        two_factor_secret, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `;
    await Database.run(sql, [
      id,
      user.tenant_id || 'tenant_default_01',
      user.email!.toLowerCase().trim(),
      user.password_hash!,
      user.first_name!,
      user.last_name!,
      user.role || 'SALES_AGENT',
      user.department || null,
      user.phone_number || null,
      user.avatar_url || null,
      user.is_active ?? 1,
      user.two_factor_enabled ?? 0,
      user.two_factor_secret || null,
    ]);

    const created = await this.findById(id);
    return created!;
  }

  public static async updateLastLogin(id: string): Promise<void> {
    await Database.run('UPDATE users SET last_login_at = datetime(\'now\'), updated_at = datetime(\'now\') WHERE id = ?', [id]);
  }

  public static async findAllByTenant(tenantId: string): Promise<UserProfile[]> {
    const rows = await Database.query<UserEntity>(
      'SELECT * FROM users WHERE tenant_id = ? ORDER BY first_name ASC',
      [tenantId]
    );
    return rows.map(this.toProfile);
  }
}
