import { Logger } from '../logger/Logger';

export type EventHandler<T = any> = (payload: T) => Promise<void> | void;

export class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, EventHandler[]> = new Map();

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public subscribe<T = any>(event: string, handler: EventHandler<T>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(handler);
    Logger.debug(`Event registered: ${event}`);
  }

  public async publish<T = any>(event: string, payload: T): Promise<void> {
    Logger.debug(`Event dispatched: ${event}`, { payloadSummary: typeof payload });
    const handlers = this.listeners.get(event) || [];
    const executions = handlers.map(async (fn) => {
      try {
        await fn(payload);
      } catch (err) {
        Logger.error(`Error in event listener for [${event}]`, err);
      }
    });
    await Promise.all(executions);
  }
}
