import { test, expect } from '@playwright/test';
import generateRandomData from '../src/utils/generateData';

const entryCount = 1000;

async function fillForm(page, payload) {
  await expect(page.getByLabel('First Name')).toBeVisible();
  await page.getByLabel('First Name').fill(payload.personal.firstName);
  await page.getByLabel('Last Name').fill(payload.personal.lastName);
  await page.getByLabel('Email').fill(payload.personal.email);
  await page.getByLabel('Phone').fill(payload.personal.phone);

  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(500);
  await expect(page.getByLabel('Company')).toBeVisible({ timeout: 8000 });

  await page.getByLabel('Company').fill(payload.professional.company);
  await page.getByLabel('Position').fill(payload.professional.position);
  await page.getByLabel('Years of Experience').fill(payload.professional.experience);
  await page.getByLabel('Industry').fill(payload.professional.industry);

  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(500);
  await expect(page.getByLabel('Card Number')).toBeVisible({ timeout: 8000 });

  await page.getByLabel('Card Number').fill(payload.billing.cardNumber);
  await page.getByLabel('Card Holder Name').fill(payload.billing.cardHolderName);
  await page.getByLabel('Expiry Date').fill(payload.billing.expiryDate);
  await page.getByLabel('CVV').fill(payload.billing.cvv);

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Form Submitted Successfully!')).toBeVisible({ timeout: 8000 });
}

test.describe('Multi-step form', () => {
  test.setTimeout(120_000);

  test(`fills ${entryCount} generated entries and saves each one via backend POST`, async ({ page }) => {
    const records = generateRandomData(entryCount);
    const submittedBodies = [];

    page.on('request', (request) => {
      if (request.url().includes('/api/formData') && request.method() === 'POST') {
        submittedBodies.push(JSON.parse(request.postData() || '{}'));
      }
    });

    await page.goto('/form');

    for (const record of records) {
      await fillForm(page, record);
      await page.getByRole('button', { name: 'Submit Another Form' }).click();
      await page.waitForTimeout(500);
      await expect(page.getByLabel('First Name')).toBeVisible({ timeout: 10000 });
    }

    expect(submittedBodies).toHaveLength(records.length);

    // for (let i = 0; i < records.length; i++) {
    //   const expected = records[i];
    //   const actual = submittedBodies[i];

    //   expect(actual.personal.firstName).toBe(expected.personal.firstName);
    //   expect(actual.personal.lastName).toBe(expected.personal.lastName);
    //   expect(actual.personal.email).toBe(expected.personal.email);
    //   expect(actual.personal.phone).toBe(expected.personal.phone);
    //   expect(actual.professional.company).toBe(expected.professional.company);
    //   expect(actual.professional.position).toBe(expected.professional.position);
    //   expect(actual.professional.experience).toBe(expected.professional.experience);
    //   expect(actual.professional.industry).toBe(expected.professional.industry);
    //   expect(actual.billing.cardNumber).toBe(expected.billing.cardNumber);
    //   expect(actual.billing.cardHolderName).toBe(expected.billing.cardHolderName);
    //   expect(actual.billing.expiryDate).toBe(expected.billing.expiryDate);
    //   expect(actual.billing.cvv).toBe(expected.billing.cvv);
    // }
  });

  test('shows validation messages for invalid personal details', async ({ page }) => {
    await page.goto('/form');

    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByText('First name should be a string.')).toBeVisible();
    await expect(page.getByText('Last name should be a string.')).toBeVisible();
    await expect(page.getByText('Email should be a valid email address.')).toBeVisible();
    await expect(page.getByText('Phone should be a valid 10-digit number.')).toBeVisible();
  });
});
