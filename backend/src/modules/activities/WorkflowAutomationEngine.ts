import { EventBus } from '../../core/events/EventBus';
import { Logger } from '../../core/logger/Logger';

export type TriggerEvent = 
  | 'CUSTOMER_CREATED'
  | 'CUSTOMER_UPDATED'
  | 'DEAL_CREATED'
  | 'DEAL_STAGE_CHANGED'
  | 'TICKET_CREATED'
  | 'TICKET_STATUS_CHANGED'
  | 'INVOICE_OVERDUE';

export interface WorkflowRule {
  id: string;
  name: string;
  trigger: TriggerEvent;
  isActive: boolean;
  conditions: Array<{
    field: string;
    operator: 'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN' | 'CONTAINS';
    value: any;
  }>;
  actions: Array<{
    actionType: 'SEND_NOTIFICATION' | 'UPDATE_FIELD' | 'CREATE_TASK' | 'TRIGGER_WEBHOOK';
    payload: Record<string, any>;
  }>;
}

export class WorkflowAutomationEngine {
  private static rules: WorkflowRule[] = [];

  public static registerRule(rule: WorkflowRule): void {
    this.rules.push(rule);
    Logger.info(`Registered automation rule: ${rule.name} on trigger ${rule.trigger}`);
  }

  public static evaluateCondition(actual: any, operator: string, expected: any): boolean {
    switch (operator) {
      case 'EQUALS': return actual === expected;
      case 'NOT_EQUALS': return actual !== expected;
      case 'GREATER_THAN': return Number(actual) > Number(expected);
      case 'LESS_THAN': return Number(actual) < Number(expected);
      case 'CONTAINS': return String(actual).toLowerCase().includes(String(expected).toLowerCase());
      default: return false;
    }
  }

  public static async processEvent(trigger: TriggerEvent, eventData: Record<string, any>): Promise<void> {
    const applicableRules = this.rules.filter((r) => r.isActive && r.trigger === trigger);

    for (const rule of applicableRules) {
      let conditionsMet = true;

      for (const cond of rule.conditions) {
        const actualVal = eventData[cond.field];
        if (!this.evaluateCondition(actualVal, cond.operator, cond.value)) {
          conditionsMet = false;
          break;
        }
      }

      if (conditionsMet) {
        Logger.info(`Executing automation rule: ${rule.name}`);
        for (const action of rule.actions) {
          await this.executeAction(action, eventData);
        }
      }
    }
  }

  private static async executeAction(
    action: WorkflowRule['actions'][0],
    context: Record<string, any>
  ): Promise<void> {
    Logger.debug(`Executing action ${action.actionType}`, { payload: action.payload, contextSummary: Object.keys(context) });
    // Action handler implementations (Notification dispatcher, Webhooks, etc.)
  }
}
