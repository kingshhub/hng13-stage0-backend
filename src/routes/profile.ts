import { Router, Request, Response } from 'express';
import { fetchCatFact } from '../services/catFactService';
import { config } from '../config';
import logger from '../logger';
import { ApiResponse } from '../types';
import { ExternalApiError } from '../errors';

const router = Router();

router.get('/me', async (req: Request, res: Response) => {
    try {
        const catFact = await fetchCatFact();
        const timestamp = new Date().toISOString();

        const response: ApiResponse = {
            status: 'success',
            user: {
                email: config.email,
                name: config.name,
                stack: config.stack
            },
            timestamp,
            fact: catFact
        };

        logger.info(`Request processed - Timestamp: ${timestamp}, Fact: ${catFact}`);
        // Ensure correct headers for JSON response and no caching
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof ExternalApiError) {
            // Graceful fallback
            const fallbackFact = 'Unable to fetch cat fact. Did you know cats have 230 bones?';
            const timestamp = new Date().toISOString();

            const fallbackResponse: ApiResponse = {
                status: 'success',
                user: {
                    email: config.email,
                    name: config.name,
                    stack: config.stack
                },
                timestamp,
                fact: fallbackFact
            };

            // Ensure correct headers for fallback JSON response and no caching
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.status(200).json(fallbackResponse);
        } else {
            throw error;
        }
    }
});

export default router;