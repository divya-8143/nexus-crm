import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  JWT_SECRET: process.env.JWT_SECRET || 'nexus_super_secure_enterprise_crm_jwt_secret_key_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '8h',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  DB_PATH: process.env.DB_PATH || path.resolve(__dirname, '../../../database.sqlite'),
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  ENABLE_AUDIT_LOGGING: process.env.ENABLE_AUDIT_LOGGING === 'true' || true,
  SLA_BREACH_CHECK_INTERVAL_MS: 60000,
  PASSWORD_SALT_ROUNDS: 10,
};
