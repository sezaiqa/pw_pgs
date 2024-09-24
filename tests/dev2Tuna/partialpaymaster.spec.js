import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://app-dev2.qlub.cloud/qr/br/Auto_TunaSezai/5/_/_/945f03e8d1'); 
  });
  
  test.afterEach(async ({ page }) => {
    await page.close();  
  });

test('test', async ({ page }) => {
  await page.goto('https://app-staging.qlub.cloud/qr/br/Auto_TunaSezai/4/_/_/ac75f3c001');
  await page.getByRole('button', { name: 'Pay now' }).click();

  //Split Bill
  await page.getByRole('button', { name: 'Split bill' }).click();
  await page.locator('#select-custom').click();
  await page.getByPlaceholder('00.00', { exact: true }).click();
  await page.getByPlaceholder('00.00', { exact: true }).fill('10');
  await page.getByRole('button', { name: 'Confirm' }).click();

  //Card Name
  await page.getByRole('button', { name: 'Card' }).click();
  await page.getByRole('textbox', { name: 'Cardholder Name' }).click();
  await page.getByRole('textbox', { name: 'Cardholder Name' }).fill('Captured');

  //Card Number
  await page.getByRole('textbox', { name: 'Card Number' }).click();
  await page.getByRole('textbox', { name: 'Card Number' }).fill('5555 5555 5555 4444');

  //Expiry Date
  await page.getByRole('textbox', { name: 'Expiration Date' }).click();
  await page.getByRole('textbox', { name: 'Expiration Date' }).fill('03/29');

  //await page.getByRole('textbox', { name: 'CVV' }).fill('1');
  await page.getByRole('textbox', { name: 'CVV' }).click();
  await page.getByRole('textbox', { name: 'CVV' }).fill('111');

  //Click Pay Now
  await page.getByRole('button', { name: 'Pay Now' }).click();

// Wait for payment successful message
await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');

const paymentSuccessfulText = await page.$('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
const fullyPaidText = await page.$('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
const tableNumberText = await page.$('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');

// Assertions
expect(paymentSuccessfulText).not.toBeNull();
expect(await paymentSuccessfulText.textContent()).toContain('Payment was successful!');

expect(fullyPaidText).not.toBeNull();
expect(await fullyPaidText.textContent()).toContain('Partially paid');

expect(tableNumberText).not.toBeNull();
const tableText = (await tableNumberText.textContent()).replace(/\s+/g, ' ').trim();
expect(tableText).toContain('Table 5 (Table 1)');

});