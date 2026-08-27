import { AuthService } from '../src/modules/auth/AuthService';
import { CustomerValidator } from '@nexus/shared';

export async function runAuthTests(): Promise<void> {
  // Test 1: Email Validation
  const validEmail = CustomerValidator.validateEmail('enterprise@acme.com');
  if (!validEmail) throw new Error('Email validator failed on valid corporate email');

  const invalidEmail = CustomerValidator.validateEmail('invalid-email-string');
  if (invalidEmail) throw new Error('Email validator failed on malformed email');

  // Test 2: Password complexity verification
  try {
    await AuthService.register({
      email: 'test@example.com',
      passwordPlain: '123', // Under 8 characters
      firstName: 'Test',
      lastName: 'User',
    });
    throw new Error('Expected validation error for short password');
  } catch (err: any) {
    if (err.message.includes('Expected validation error')) throw err;
  }
}
