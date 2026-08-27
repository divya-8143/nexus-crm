import app from './app';
import { Config } from './core/config/env';
import { Logger } from './core/logger/Logger';
import { Database } from './core/database/connection';

async function bootstrap() {
  try {
    Database.getDB();
    const server = app.listen(Config.PORT, () => {
      Logger.info(`🚀 NexusCRM Enterprise Backend running on port ${Config.PORT} [${Config.NODE_ENV}]`);
    });

    const shutdown = () => {
      Logger.info('Received shutdown signal. Closing HTTP server and database gracefully...');
      server.close(() => {
        Logger.info('NexusCRM server closed successfully.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    Logger.error('Failed to bootstrap NexusCRM server', error);
    process.exit(1);
  }
}

bootstrap();
