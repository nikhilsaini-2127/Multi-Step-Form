import { test, expect } from '@playwright/test';

test.describe('Multi-step form', () => {
  test('fills personal, professional, and billing details and submits successfully', async ({ page }) => {
    await page.goto('/form');

    await expect(page.getByLabel('First Name')).toBeVisible();
    await page.getByLabel('First Name').fill('John');
    await page.getByLabel('Last Name').fill('Doe');
    await page.getByLabel('Email').fill('john.doe@example.com');
    await page.getByLabel('Phone').fill('9876543210');

    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByLabel('Company')).toBeVisible();

    await page.getByLabel('Company').fill('Acme Corp');
    await page.getByLabel('Position').fill('Frontend Engineer');
    await page.getByLabel('Years of Experience').fill('5');
    await page.getByLabel('Industry').fill('Technology');

    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByLabel('Card Number')).toBeVisible();

    await page.getByLabel('Card Number').fill('123456789012');
    await page.getByLabel('Card Holder Name').fill('John Doe');
    await page.getByLabel('Expiry Date').fill('12/29');
    await page.getByLabel('CVV').fill('1234');

    await page.route('**/api/formData', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Form data saved successfully',
          submissionId: 'test-submission-id',
        }),
      });
    });

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Form Submitted Successfully!')).toBeVisible();
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
