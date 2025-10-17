import axios from 'axios';
import { CatFactResponse } from '../types';
import logger from '../logger';
import { ExternalApiError } from '../errors';

export const fetchCatFact = async (): Promise<string> => {
    try {
        const response = await axios.get<CatFactResponse>('https://catfact.ninja/fact', { timeout: 5000 });
        return response.data.fact;
    } catch (error) {
        const err = error as any;
        if (err && err.isAxiosError) {
            logger.error(`Error fetching cat fact: ${err.message}`);
        } else {
            logger.error(`Error fetching cat fact: ${((error as Error)?.message) ?? String(error)}`);
        }
        throw new ExternalApiError('Failed to fetch cat fact');
    }
};