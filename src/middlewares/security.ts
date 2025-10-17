import { Express } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export const applySecurityMiddleware = (app: Express) => {
    app.use(helmet());
    app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100 requests per 15 min
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
};