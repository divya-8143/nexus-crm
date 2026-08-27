import { CustomerRepository } from './CustomerRepository';
import { Customer, CustomerFilterParams, PaginatedResult } from '@nexus/shared';
import { CustomerValidator } from '@nexus/shared';
import { ValidationError, NotFoundError } from '../../core/errors/AppError';
import { EventBus } from '../../core/events/EventBus';

export class CustomerService {
  public static async createCustomer(tenantId: string, actorId: string, data: Partial<Customer>): Promise<Customer> {
    const validation = CustomerValidator.validateCustomer(data);
    if (!validation.isValid) {
      throw new ValidationError('Customer validation failed', validation.errors);
    }

    data.tenantId = tenantId;
    const created = await CustomerRepository.create(data);

    await EventBus.getInstance().publish('CUSTOMER_CREATED', {
      customerId: created.id,
      tenantId,
      actorId,
      customer: created,
    });

    return created;
  }

  public static async getCustomer(id: string, tenantId: string): Promise<Customer> {
    const customer = await CustomerRepository.findById(id, tenantId);
    if (!customer) {
      throw new NotFoundError('Customer', id);
    }
    return customer;
  }

  public static async listCustomers(
    tenantId: string,
    filters: CustomerFilterParams,
    page = 1,
    limit = 20
  ): Promise<PaginatedResult<Customer>> {
    return CustomerRepository.list(tenantId, filters, page, limit);
  }

  public static async updateCustomer(
    id: string,
    tenantId: string,
    actorId: string,
    updates: Partial<Customer>
  ): Promise<Customer> {
    const existing = await this.getCustomer(id, tenantId);
    const updated = await CustomerRepository.update(id, tenantId, updates);

    await EventBus.getInstance().publish('CUSTOMER_UPDATED', {
      customerId: id,
      tenantId,
      actorId,
      before: existing,
      after: updated,
    });

    return updated;
  }

  public static async deleteCustomer(id: string, tenantId: string, actorId: string): Promise<void> {
    const existing = await this.getCustomer(id, tenantId);
    await CustomerRepository.delete(id, tenantId);

    await EventBus.getInstance().publish('CUSTOMER_DELETED', {
      customerId: id,
      tenantId,
      actorId,
      customer: existing,
    });
  }

  public static async calculateLeadScore(customer: Customer): Promise<number> {
    let score = 20; // Base score
    if (customer.annualRevenue > 100000) score += 30;
    else if (customer.annualRevenue > 25000) score += 15;

    if (customer.website) score += 10;
    if (customer.phone) score += 10;
    if (customer.tags && customer.tags.includes('ENTERPRISE')) score += 20;
    if (customer.isVip) score += 10;

    return Math.min(100, Math.max(0, score));
  }
}
