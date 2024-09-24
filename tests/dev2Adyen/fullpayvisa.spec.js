import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('https://app-dev2.qlub.cloud/qr/sg/Auto_AdyenSezai/3/_/_/e39e4c7921');
  });
  
  
  test.afterEach(async ({ page }) => {
    await page.close();  
  });

test('test', async ({ page }) => {
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('button', { name: 'Pay fully' }).click();

  //Enter Card Infos
  await page.frameLocator('iframe[title="Iframe for card number"]').getByPlaceholder('5678 9012 3456').click();
  await page.frameLocator('iframe[title="Iframe for card number"]').getByPlaceholder('5678 9012 3456').fill('4111 1111 4555 1142');
  await page.frameLocator('iframe[title="Iframe for expiry date"]').getByPlaceholder('MM/YY').click();
  await page.frameLocator('iframe[title="Iframe for expiry date"]').getByPlaceholder('MM/YY').fill('03/30');
  await page.frameLocator('iframe[title="Iframe for security code"]').getByPlaceholder('digits').fill('737');

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
expect(await fullyPaidText.textContent()).toContain('Fully paid');

expect(tableNumberText).not.toBeNull();
const tableText = (await tableNumberText.textContent()).replace(/\s+/g, ' ').trim();
expect(tableText).toContain('Table 3 (Table 1)');

});


