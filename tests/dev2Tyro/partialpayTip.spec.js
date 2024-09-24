import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://app-dev2.qlub.cloud/qr/au/Auto_TyroSezai/8/_/_/6c96b50622'); 
  });
  
  test.afterEach(async ({ page }) => {
    await page.close();  
  });

test('test', async ({ page }) => {
  await page.getByRole('button', { name: 'Pay now' }).click();

  // Split the bill
  await page.getByRole('button', { name: 'Split bill' }).click();
  await page.locator('#select-custom').click();
  await page.getByPlaceholder('00.00').click();
  await page.getByPlaceholder('00.00').fill('10');
  await page.getByRole('button', { name: 'Confirm' }).click();

   //Add tip
   await page.getByText('Pay custom tip').click();
   await page.getByPlaceholder('0.00').fill('10');
 
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

//Click Pay Now
await page.getByRole('button', { name: 'Pay Now' }).click();

 // Wait for payment result
 await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf', { state: 'visible' });

 // Assertions
 const paymentSuccessfulText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
 await expect(paymentSuccessfulText).toHaveText('Payment was successful!');
 
 const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
 await expect(fullyPaidText).toHaveText('Partially paid');
 
 const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
 await expect(tableNumberText).toHaveText('Table 8 (Table 1)');

});