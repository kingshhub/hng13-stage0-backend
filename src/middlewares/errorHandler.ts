import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
};

export default errorHandler;