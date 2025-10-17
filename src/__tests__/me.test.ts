import request from 'supertest';
import app from '../app';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GET /me', () => {
    it('returns the correct schema with headers and fresh facts', async () => {
        const axiosResp1 = { data: { fact: 'Fact one', length: 8 }, status: 200, statusText: 'OK', headers: {}, config: {} };
        const axiosResp2 = { data: { fact: 'Fact two', length: 8 }, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockedAxios.get.mockResolvedValueOnce(axiosResp1 as any).mockResolvedValueOnce(axiosResp2 as any);

        // First request
        const res1 = await request(app).get('/me');
        expect(res1.status).toBe(200);
        expect(res1.headers['content-type']).toMatch(/application\/json/);
        expect(res1.headers['cache-control']).toBeDefined();

        const body1 = res1.body;
        expect(body1).toHaveProperty('status', 'success');
        expect(body1).toHaveProperty('user');
        expect(body1.user).toHaveProperty('email');
        expect(typeof body1.user.email).toBe('string');
        expect(body1.user).toHaveProperty('name');
        expect(body1.user).toHaveProperty('stack');
        expect(body1).toHaveProperty('timestamp');
        expect(new Date(body1.timestamp).toISOString()).toBe(body1.timestamp);
        expect(body1).toHaveProperty('fact', 'Fact one');

        // Second request should fetch a different fact and a new timestamp
        const res2 = await request(app).get('/me');
        expect(res2.status).toBe(200);
        const body2 = res2.body;
        expect(body2.fact).toBe('Fact two');
        expect(body2.timestamp).not.toBe(body1.timestamp);
    });
});
