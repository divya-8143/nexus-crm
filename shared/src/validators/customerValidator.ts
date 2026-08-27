import { Customer, CustomerContact, Address } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class CustomerValidator {
  public static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public static validatePhone(phone: string): boolean {
    if (!phone) return true;
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    return phoneRegex.test(phone);
  }

  public static validateCustomer(customer: Partial<Customer>): ValidationResult {
    const errors: Record<string, string> = {};

    if (!customer.name || customer.name.trim().length < 2) {
      errors.name = 'Customer/Account name must be at least 2 characters long';
    }

    if (!customer.email || !this.validateEmail(customer.email)) {
      errors.email = 'A valid corporate or personal email address is required';
    }

    if (customer.phone && !this.validatePhone(customer.phone)) {
      errors.phone = 'Phone number format is invalid';
    }

    if (customer.annualRevenue !== undefined && customer.annualRevenue < 0) {
      errors.annualRevenue = 'Annual revenue cannot be negative';
    }

    if (customer.leadScore !== undefined && (customer.leadScore < 0 || customer.leadScore > 100)) {
      errors.leadScore = 'Lead score must be between 0 and 100';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  public static validateContact(contact: Partial<CustomerContact>): ValidationResult {
    const errors: Record<string, string> = {};

    if (!contact.firstName || contact.firstName.trim().length === 0) {
      errors.firstName = 'First name is required';
    }

    if (!contact.lastName || contact.lastName.trim().length === 0) {
      errors.lastName = 'Last name is required';
    }

    if (!contact.email || !this.validateEmail(contact.email)) {
      errors.email = 'Valid email is required for contact';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
