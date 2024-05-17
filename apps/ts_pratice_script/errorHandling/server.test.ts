import { test } from 'node:test';
import * as http from 'http';
//import assert from 'assert';
import { strict as assert } from 'assert'
import { once } from 'events';

// Helper function to make HTTP requests and capture the response
async function makeRequest(path: string): Promise<{ statusCode: number; body: string }> {
    return new Promise((resolve, reject) => {
        const req = http.request({
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'GET'
        }, async (res) => {
            try {
                const body = await once(res, 'data');
                resolve({
                    statusCode: res.statusCode || 500,
                    body: body.toString()
                });
            } catch (err) {
                reject(err);
            }
        });
        req.on('error', reject);
        req.end();
    });
}

test('server responds to /', async () => {
    const { statusCode, body } = await makeRequest('/');
    assert.strictEqual(statusCode, 200);
    assert.strictEqual(body, 'Hello, World!');
});

test('server handles /error with AppError', async () => {
    const { statusCode, body } = await makeRequest('/error');
    assert.strictEqual(statusCode, 500);
    assert.strictEqual(body, 'An error occurred!');
});