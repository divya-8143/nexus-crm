import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './modules/auth/auth.routes';
import customerRoutes from './modules/customers/customer.routes';
import dealRoutes from './modules/deals/deal.routes';
import helpdeskRoutes from './modules/helpdesk/helpdesk.routes';
import billingRoutes from './modules/billing/billing.routes';
import analyticsRoutes from './modules/analytics/analytics.routes';
import auditRoutes from './modules/audit/audit.routes';
import { errorHandler } from './core/middleware/ErrorMiddleware';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'NexusCRM Core API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Gateway Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/deals', dealRoutes);
app.use('/api/v1/helpdesk', helpdeskRoutes);
app.use('/api/v1/billing', billingRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/audit', auditRoutes);

app.use(errorHandler);

export default app;
