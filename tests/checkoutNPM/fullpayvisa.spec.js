import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://app-staging.qlub.cloud/qr/ae/Auto_CheckoutNPM/1/_/_/2de3f47d08');
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByText('Pay custom tip').click();
  await page.getByPlaceholder('0.00').click();
  await page.getByText('Payment method').click();

  // Page Down
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  //Wait for Iframe
  await page.frameLocator('iframe[name="checkout-frames-cardNumber"]').getByPlaceholder('1234 1234 1234').waitFor({ state: 'visible' });
  
  // Enter Card Number
  await page.frameLocator('iframe[name="checkout-frames-cardNumber"]').getByPlaceholder('1234 1234 1234').click();
  await page.frameLocator('iframe[name="checkout-frames-cardNumber"]').getByPlaceholder('1234 1234 1234').fill('4242 4242 4242 4242');
  // Expiry Date
  await page.frameLocator('iframe[name="checkout-frames-expiryDate"]').getByPlaceholder('/25').click();
  await page.frameLocator('iframe[name="checkout-frames-expiryDate"]').getByPlaceholder('/25').fill('12/25');
  // CVV
  await page.frameLocator('iframe[name="checkout-frames-cvv"]').getByPlaceholder('123').click();
  await page.frameLocator('iframe[name="checkout-frames-cvv"]').getByPlaceholder('123').fill('123');

  // Click Pay Now
  await page.getByRole('button', { name: 'Pay' }).click();

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

