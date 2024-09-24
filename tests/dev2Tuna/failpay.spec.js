import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://app-dev2.qlub.cloud/qr/br/Auto_TunaSezai/1/_/_/47ca525615'); 
  });
  
  test.afterEach(async ({ page }) => {
    await page.close();  
  });

test('test', async ({ page }) => {
  
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('button', { name: 'Pay fully' }).click();

  //Card Name
  await page.getByRole('button', { name: 'Card' }).click();
  await page.getByRole('textbox', { name: 'Cardholder Name' }).click();
  await page.getByRole('textbox', { name: 'Cardholder Name' }).fill('Error');

  //Card Number
  await page.getByRole('textbox', { name: 'Card Number' }).click();
  await page.getByRole('textbox', { name: 'Card Number' }).fill('4111 1111 1111 1111');

  //Expiry Date
  await page.getByRole('textbox', { name: 'Expiration Date' }).click();
  await page.getByRole('textbox', { name: 'Expiration Date' }).fill('03/29');

  //await page.getByRole('textbox', { name: 'CVV' }).fill('1');
  await page.getByRole('textbox', { name: 'CVV' }).click();
  await page.getByRole('textbox', { name: 'CVV' }).fill('111');

  await page.getByRole('button', { name: 'Save card' }).click();
  
  //Click Pay Now
  await page.getByRole('button', { name: 'Pay Now' }).click();
  
const paymentSuccessfulText = await page.$('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
const fullyPaidText = await page.$('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
const tableNumberText = await page.$('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');

// Assertions
  // Ödeme başarısızlığı mesajını içeren <p> elementi
  const paymentFailedMessage = page.locator('p.MuiTypography-body1:has-text("Your payment of")');
  await paymentFailedMessage.waitFor({ state: 'visible' });
  expect(await paymentFailedMessage.first().textContent()).toMatch(/Your payment of .+ failed/);

  // "Try Again" mesajını içeren <span> elementi
  const tryAgainMessage = page.locator('span.wrapper:has-text("Try Again")');
  await tryAgainMessage.waitFor({ state: 'visible' });
  expect(await tryAgainMessage.first().textContent()).toBe('Try Again');

  // "Please try again to pay by qlub" mesajını içeren <p> elementi
  const tryAgainErrorMessage = page.locator('p.MuiTypography-body1.error:has-text("Please try again to pay by qlub")');
  await tryAgainErrorMessage.waitFor({ state: 'visible' });
  expect(await tryAgainErrorMessage.first().textContent()).toBe('Please try again to pay by qlub');

});