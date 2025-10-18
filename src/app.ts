import express from 'express';
import { config } from './config';
import logger from './logger';
import profileRouter from './routes/profile';
import errorHandler from './middlewares/errorHandler';
import { applySecurityMiddleware } from './middlewares/security';

const app = express();
app.set('trust proxy', 1);  // Trust all proxies (safe for Railway)

// Log to confirm setting (remove after verification)
logger.info(`Trust proxy setting: ${app.get('trust proxy')}`);

// Rest of the code...
app.use(express.json());
applySecurityMiddleware(app);

app.use('/', profileRouter);

app.use(errorHandler);

app.listen('0.0.0.0', () => {  // Ensure binding to all interfaces
    logger.info(`Server running on port ${config.port}`);
});

export default app;