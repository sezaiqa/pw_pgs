import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app-staging.qlub.cloud/qr/au/Auto_TyroPayinTipMod/1/_/_/e28ca35a04');
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByText('Pay custom tip').click();
  await page.getByPlaceholder('0.00').click();
  await page.getByText('Payment method').click();

      //Page Down
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
// Wait for Iframe Element
await page.frameLocator('[id="\\#card-number"]').getByPlaceholder('1234 1234 1234').waitFor();

// Card Number
await page.frameLocator('[id="\\#card-number"]').getByPlaceholder('1234 1234 1234').click();
await page.frameLocator('[id="\\#card-number"]').getByPlaceholder('1234 1234 1234').fill('4012 0000 3333 0026');

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
 await expect(fullyPaidText).toHaveText('Fully paid');
 
 const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
 await expect(tableNumberText).toHaveText('Table 1 (Table 1)');

});