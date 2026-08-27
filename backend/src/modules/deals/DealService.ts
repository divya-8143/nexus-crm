import { DealRepository } from './DealRepository';
import { Deal, DealStage, DealPipelineSummary } from '@nexus/shared';
import { NotFoundError, ValidationError } from '../../core/errors/AppError';
import { EventBus } from '../../core/events/EventBus';

export class DealService {
  public static async createDeal(tenantId: string, actorId: string, data: Partial<Deal>): Promise<Deal> {
    if (!data.title || !data.customerId) {
      throw new ValidationError('Deal title and Customer ID are required');
    }

    data.tenantId = tenantId;
    const deal = await DealRepository.create(data);

    await EventBus.getInstance().publish('DEAL_CREATED', {
      dealId: deal.id,
      tenantId,
      actorId,
      deal,
    });

    return deal;
  }

  public static async getDeal(id: string, tenantId: string): Promise<Deal> {
    const deal = await DealRepository.findById(id, tenantId);
    if (!deal) {
      throw new NotFoundError('Deal', id);
    }
    return deal;
  }

  public static async getPipeline(tenantId: string): Promise<DealPipelineSummary[]> {
    return DealRepository.getPipelineSummary(tenantId);
  }

  public static async updateStage(id: string, tenantId: string, actorId: string, stage: DealStage): Promise<Deal> {
    const before = await this.getDeal(id, tenantId);
    const updated = await DealRepository.updateStage(id, tenantId, stage);

    await EventBus.getInstance().publish('DEAL_STAGE_CHANGED', {
      dealId: id,
      tenantId,
      actorId,
      fromStage: before.stage,
      toStage: stage,
    });

    return updated;
  }
}
