// In services/catFactService.test.ts
import { fetchCatFact } from './services/catFactService';
import axios from 'axios';

jest.mock('axios');

describe('fetchCatFact', () => {
    it('fetches a cat fact successfully', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { fact: 'Test fact' } });
        const fact = await fetchCatFact();
        expect(fact).toBe('Test fact');
    });

    it('throws ExternalApiError on failure', async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));
        await expect(fetchCatFact()).rejects.toThrow('Failed to fetch cat fact');
    });
});