export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export class Logger {
  private static currentLevel: LogLevel = LogLevel.INFO;

  public static setLevel(level: LogLevel): void {
    this.currentLevel = level;
  }

  private static format(level: string, message: string, context?: any): string {
    const timestamp = new Date().toISOString();
    const ctx = context ? ` | Context: ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level}] ${message}${ctx}`;
  }

  public static debug(message: string, context?: any): void {
    if (this.currentLevel <= LogLevel.DEBUG) {
      console.debug(this.format('DEBUG', message, context));
    }
  }

  public static info(message: string, context?: any): void {
    if (this.currentLevel <= LogLevel.INFO) {
      console.log(this.format('INFO', message, context));
    }
  }

  public static warn(message: string, context?: any): void {
    if (this.currentLevel <= LogLevel.WARN) {
      console.warn(this.format('WARN', message, context));
    }
  }

  public static error(message: string, error?: any, context?: any): void {
    if (this.currentLevel <= LogLevel.ERROR) {
      console.error(this.format('ERROR', message, { ...context, error: error?.message || error, stack: error?.stack }));
    }
  }
}
