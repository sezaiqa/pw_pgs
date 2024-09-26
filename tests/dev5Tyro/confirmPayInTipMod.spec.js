import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app-dev5.qlub.cloud/qr/au/AutoTyroConfPayInTMod/1/_/_/7326e7fc2f');
  await page.getByRole('button', { name: 'Pay now' }).click();

   //Page Down
  await page.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
      });

// Wait for Iframe Element
await page.frameLocator('[id="\\#card-number"]').getByPlaceholder('1234 1234 1234').waitFor();

// Card Number
await page.frameLocator('[id="\\#card-number"]').getByPlaceholder('1234 1234 1234').click();
await page.frameLocator('[id="\\#card-number"]').getByPlaceholder('1234 1234 1234').fill('5111111111111118');

// Expiry Month
await page.frameLocator('[id="\\#expiry-month"]').getByPlaceholder('MM').click();
await page.frameLocator('[id="\\#expiry-month"]').getByPlaceholder('MM').fill('01');
await page.frameLocator('[id="\\#expiry-month"]').getByPlaceholder('MM').press('Tab');

// Expiry year
await page.frameLocator('[id="\\#expiry-year"]').getByPlaceholder('YY').fill('39');
await page.frameLocator('[id="\\#expiry-year"]').getByPlaceholder('YY').press('Tab');

// Cvv
await page.frameLocator('[id="\\#security-code"]').getByPlaceholder('123').fill('100');

// Split the bill
await page.getByRole('button', { name: 'Split bill' }).click();
await page.locator('#select-custom').click();
await page.getByPlaceholder('00.00').click();
await page.getByPlaceholder('00.00').fill('10');
await page.getByRole('button', { name: 'Confirm' }).click();

// Wait for the tip modal to be visible and interactable
await page.waitForSelector('#tip_modal_10', { state: 'visible' });
await page.locator('#tip_modal_10').getByText('%').click();
await page.locator('button').filter({ hasText: 'Pay Now' }).click();

 // Wait for payment result
 await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf', { state: 'visible' });

 // Assertions
 const paymentSuccessfulText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
 await expect(paymentSuccessfulText).toHaveText('Payment was successful!');
 
 const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
 await expect(fullyPaidText).toHaveText('Partially paid');
 
 const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
 await expect(tableNumberText).toHaveText('Table 1 (Table 1)');

});