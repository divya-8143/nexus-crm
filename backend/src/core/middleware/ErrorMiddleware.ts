import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { Logger } from '../logger/Logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  Logger.error(`Unhandled Request Error: ${req.method} ${req.originalUrl}`, err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.errorCode,
        message: err.message,
        details: err.details,
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected internal error occurred. Please contact system administrator.',
    },
    timestamp: new Date().toISOString(),
  });
};
