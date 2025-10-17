import express from 'express';
import { config } from './config';
import logger from './logger';
import profileRouter from './routes/profile';
import errorHandler from './middlewares/errorHandler';
import { applySecurityMiddleware } from './middlewares/security';

const app = express();

app.use(express.json());
applySecurityMiddleware(app);

app.use('/', profileRouter); // Mount routes

app.use(errorHandler); // Error handler last

export default app;