import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app-staging.qlub.cloud/qr/sg/Auto_AdyenSezai/20/_/_/13cf86d057');
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('button', { name: 'Pay fully' }).click();

  //Enter Card Infos
  await page.frameLocator('iframe[title="Iframe for card number"]').getByPlaceholder('5678 9012 3456').click();
  await page.frameLocator('iframe[title="Iframe for card number"]').getByPlaceholder('5678 9012 3456').fill('2222 4000 7000 0005');
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
  expect(await tableNumberText.textContent()).toContain('Table 20 (Table 3)');
});


