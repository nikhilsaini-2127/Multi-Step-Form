import { test, expect } from '@playwright/test';
import generateRandomData from '../src/utils/generateData';

const apiBaseUrl = 'http://localhost:5000/api';
const entryCount = Number(process.env.PLAYWRIGHT_API_ENTRY_COUNT || 4000);
const batchSize = Number(process.env.PLAYWRIGHT_API_BATCH_SIZE || 200);

test.describe('Form API', () => {
  test.setTimeout(600_000);

  test(`posts ${entryCount} generated records to /api/formData and saves successfully`, async ({ request }) => {
    const records = generateRandomData(entryCount);

    for (let batchStart = 0; batchStart < records.length; batchStart += batchSize) {
      const batch = records.slice(batchStart, batchStart + batchSize);

      for (const [index, payload] of batch.entries()) {
        const response = await request.post(`${apiBaseUrl}/formData`, {
          data: payload,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const globalIndex = batchStart + index + 1;
        expect(response.status(), `Request ${globalIndex} should return 201`).toBe(201);

        const body = await response.json();
        expect(body.success, `Request ${globalIndex} should succeed`).toBe(true);
        expect(body.message, `Request ${globalIndex} should contain save message`).toContain('saved successfully');
        expect(body.submissionId, `Request ${globalIndex} should return a submissionId`).toBeTruthy();
      }
    }
  });
});
