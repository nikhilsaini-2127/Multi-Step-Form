import { test, expect } from '@playwright/test';
import generateRandomData from '../src/utils/generateData';

const testData = generateRandomData(10);

test.describe('Multi-step form', () => {
  for (const [index, data] of testData.entries()) {
    test(`fills personal, professional, and billing details and submits successfully (#${index + 1})`, async ({ page }) => {
      await page.goto('/form');

      await expect(page.getByLabel('First Name')).toBeVisible();
      await page.getByLabel('First Name').fill(data.personal.firstName);
      await page.getByLabel('Last Name').fill(data.personal.lastName);
      await page.getByLabel('Email').fill(data.personal.email);
      await page.getByLabel('Phone').fill(data.personal.phone);

      await page.getByRole('button', { name: 'Next' }).click();
      await expect(page.getByLabel('Company')).toBeVisible();

      await page.getByLabel('Company').fill(data.professional.company);
      await page.getByLabel('Position').fill(data.professional.position);
      await page.getByLabel('Years of Experience').fill(data.professional.experience);
      await page.getByLabel('Industry').fill(data.professional.industry);

      await page.getByRole('button', { name: 'Next' }).click();
      await expect(page.getByLabel('Card Number')).toBeVisible();

      await page.getByLabel('Card Number').fill(data.billing.cardNumber);
      await page.getByLabel('Card Holder Name').fill(data.billing.cardHolderName);
      await page.getByLabel('Expiry Date').fill(data.billing.expiryDate);
      await page.getByLabel('CVV').fill(data.billing.cvv);

      await page.route('**/api/formData', async (route) => {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            message: 'Form data saved successfully',
            submissionId: `test-submission-${index + 1}`,
          }),
        });
      });

      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(page.getByText('Form Submitted Successfully!')).toBeVisible();
    });
  }

  test('shows validation messages for invalid personal details', async ({ page }) => {
    await page.goto('/form');

    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByText('First name should be a string.')).toBeVisible();
    await expect(page.getByText('Last name should be a string.')).toBeVisible();
    await expect(page.getByText('Email should be a valid email address.')).toBeVisible();
    await expect(page.getByText('Phone should be a valid 10-digit number.')).toBeVisible();
  });
});
