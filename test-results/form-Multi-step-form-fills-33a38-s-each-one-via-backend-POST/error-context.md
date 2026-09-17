# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: form.spec.js >> Multi-step form >> fills 1000 generated entries and saves each one via backend POST
- Location: tests\form.spec.js:38:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Form Submitted Successfully!')
Expected: visible
Timeout: 8000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 8000ms
  - waiting for getByText('Form Submitted Successfully!')

```

```yaml
- banner:
  - textbox "search"
  - img
  - link "Home":
    - /url: /home
    - img
    - text: Home
  - link "Go to Dashboard":
    - /url: /dashboard
    - img
    - text: Go to Dashboard
- region "Notifications Alt+T"
- button "Personal Info - completed":
  - img
  - text: completed
- button "Professional Info - completed":
  - img
  - text: completed
- button "Billing Info - current":
  - img
  - text: current
- text: Card Number
- textbox "Card Number": "4111111111118383"
- text: Card Holder Name
- textbox "Card Holder Name": Ravi Gupta
- text: Expiry Date
- textbox "Expiry Date": 02/31
- text: CVV
- textbox "CVV": "979"
- text: Upload Image
- button "Upload Image"
- button "Previous"
- button "Submit"
- img "Hero illustration"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import generateRandomData from '../src/utils/generateData';
  3  | 
  4  | const entryCount = 1000;
  5  | 
  6  | async function fillForm(page, payload) {
  7  |   await expect(page.getByLabel('First Name')).toBeVisible();
  8  |   await page.getByLabel('First Name').fill(payload.personal.firstName);
  9  |   await page.getByLabel('Last Name').fill(payload.personal.lastName);
  10 |   await page.getByLabel('Email').fill(payload.personal.email);
  11 |   await page.getByLabel('Phone').fill(payload.personal.phone);
  12 | 
  13 |   await page.getByRole('button', { name: 'Next' }).click();
  14 |   await page.waitForTimeout(500);
  15 |   await expect(page.getByLabel('Company')).toBeVisible({ timeout: 8000 });
  16 | 
  17 |   await page.getByLabel('Company').fill(payload.professional.company);
  18 |   await page.getByLabel('Position').fill(payload.professional.position);
  19 |   await page.getByLabel('Years of Experience').fill(payload.professional.experience);
  20 |   await page.getByLabel('Industry').fill(payload.professional.industry);
  21 | 
  22 |   await page.getByRole('button', { name: 'Next' }).click();
  23 |   await page.waitForTimeout(500);
  24 |   await expect(page.getByLabel('Card Number')).toBeVisible({ timeout: 8000 });
  25 | 
  26 |   await page.getByLabel('Card Number').fill(payload.billing.cardNumber);
  27 |   await page.getByLabel('Card Holder Name').fill(payload.billing.cardHolderName);
  28 |   await page.getByLabel('Expiry Date').fill(payload.billing.expiryDate);
  29 |   await page.getByLabel('CVV').fill(payload.billing.cvv);
  30 | 
  31 |   await page.getByRole('button', { name: 'Submit' }).click();
> 32 |   await expect(page.getByText('Form Submitted Successfully!')).toBeVisible({ timeout: 8000 });
     |                                                                ^ Error: expect(locator).toBeVisible() failed
  33 | }
  34 | 
  35 | test.describe('Multi-step form', () => {
  36 |   test.setTimeout(120_000);
  37 | 
  38 |   test(`fills ${entryCount} generated entries and saves each one via backend POST`, async ({ page }) => {
  39 |     const records = generateRandomData(entryCount);
  40 |     const submittedBodies = [];
  41 | 
  42 |     page.on('request', (request) => {
  43 |       if (request.url().includes('/api/formData') && request.method() === 'POST') {
  44 |         submittedBodies.push(JSON.parse(request.postData() || '{}'));
  45 |       }
  46 |     });
  47 | 
  48 |     await page.goto('/form');
  49 | 
  50 |     for (const record of records) {
  51 |       await fillForm(page, record);
  52 |       await page.getByRole('button', { name: 'Submit Another Form' }).click();
  53 |       await page.waitForTimeout(500);
  54 |       await expect(page.getByLabel('First Name')).toBeVisible({ timeout: 10000 });
  55 |     }
  56 | 
  57 |     expect(submittedBodies).toHaveLength(records.length);
  58 | 
  59 |     // for (let i = 0; i < records.length; i++) {
  60 |     //   const expected = records[i];
  61 |     //   const actual = submittedBodies[i];
  62 | 
  63 |     //   expect(actual.personal.firstName).toBe(expected.personal.firstName);
  64 |     //   expect(actual.personal.lastName).toBe(expected.personal.lastName);
  65 |     //   expect(actual.personal.email).toBe(expected.personal.email);
  66 |     //   expect(actual.personal.phone).toBe(expected.personal.phone);
  67 |     //   expect(actual.professional.company).toBe(expected.professional.company);
  68 |     //   expect(actual.professional.position).toBe(expected.professional.position);
  69 |     //   expect(actual.professional.experience).toBe(expected.professional.experience);
  70 |     //   expect(actual.professional.industry).toBe(expected.professional.industry);
  71 |     //   expect(actual.billing.cardNumber).toBe(expected.billing.cardNumber);
  72 |     //   expect(actual.billing.cardHolderName).toBe(expected.billing.cardHolderName);
  73 |     //   expect(actual.billing.expiryDate).toBe(expected.billing.expiryDate);
  74 |     //   expect(actual.billing.cvv).toBe(expected.billing.cvv);
  75 |     // }
  76 |   });
  77 | 
  78 |   test('shows validation messages for invalid personal details', async ({ page }) => {
  79 |     await page.goto('/form');
  80 | 
  81 |     await page.getByRole('button', { name: 'Next' }).click();
  82 | 
  83 |     await expect(page.getByText('First name should be a string.')).toBeVisible();
  84 |     await expect(page.getByText('Last name should be a string.')).toBeVisible();
  85 |     await expect(page.getByText('Email should be a valid email address.')).toBeVisible();
  86 |     await expect(page.getByText('Phone should be a valid 10-digit number.')).toBeVisible();
  87 |   });
  88 | });
  89 | 
```