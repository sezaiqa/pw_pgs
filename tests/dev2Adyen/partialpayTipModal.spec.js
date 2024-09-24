import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('https://app-dev2.qlub.cloud/qr/sg/Auto_AdyenTipModal/2/_/_/cfac9c2eb3');
  });
  
  test.afterEach(async ({ page }) => {
    await page.close();  
  });

test('test', async ({ page }) => {
  await page.getByRole('button', { name: 'Pay now' }).click();

         //Split the bill
         await page.getByRole('button', { name: 'Split bill' }).click();
         await page.locator('#select-custom').click();
         await page.getByPlaceholder('00.00').click();
         await page.getByPlaceholder('00.00').fill('10');
         await page.getByRole('button', { name: 'Confirm' }).click();

  //Enter Card Infos
  await page.frameLocator('iframe[title="Iframe for card number"]').getByPlaceholder('5678 9012 3456').click();
  await page.frameLocator('iframe[title="Iframe for card number"]').getByPlaceholder('5678 9012 3456').fill('3700 0000 0000 002');
  await page.frameLocator('iframe[title="Iframe for expiry date"]').getByPlaceholder('MM/YY').click();
  await page.frameLocator('iframe[title="Iframe for expiry date"]').getByPlaceholder('MM/YY').fill('03/30');
  await page.frameLocator('iframe[title="Iframe for security code"]').getByPlaceholder('digits').fill('7373');

  //Click Pay Now
  await page.getByRole('button', { name: 'Pay Now' }).click();

  // Wait for tip modal to be visible
  await page.waitForSelector('#tip_modal_5 div', { state: 'visible' });

  // Trigger Tip Modal
  await page.locator('#tip_modal_5 div').nth(1).click();
  await page.locator('button').filter({ hasText: 'Add tip' }).click();

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
expect(tableText).toContain('Table 2 (Table 1)');

});