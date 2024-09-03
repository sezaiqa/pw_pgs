import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://app-staging.qlub.cloud/qr/ae/Aut_Checkout/11/_/_/1876c5dcaa');
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByText('Pay custom tip').click();
  await page.getByPlaceholder('0.00').fill('10');
  await page.getByText('Payment method').click();

  // Page Down
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Enter Card Number
  const cardNumberFrameElement = await page.waitForSelector('iframe[name="checkout-frames-cardNumber"]');
  const cardNumberFrame = await cardNumberFrameElement.contentFrame();
  if (cardNumberFrame) {
    await cardNumberFrame.fill('input[name="cardnumber"]', '4544249167673670');
  } else {
    console.log('Card number iframe not found');
    return;
  }

  // Expiry Date
  const expiryDateFrameElement = await page.waitForSelector('iframe[name="checkout-frames-expiryDate"]');
  const expiryDateFrame = await expiryDateFrameElement.contentFrame();
  if (expiryDateFrame) {
    await expiryDateFrame.fill('input[name="exp-date"]', '1229');
  } else {
    console.log('Expiry date iframe not found');
    return;
  }

  // CVV
  const cvvFrameElement = await page.waitForSelector('iframe[name="checkout-frames-cvv"]');
  const cvvFrame = await cvvFrameElement.contentFrame();
  if (cvvFrame) {
    await cvvFrame.fill('input[name="cvc"]', '222');
  } else {
    console.log('CVV iframe not found');
    return;
  }

  // Click Pay Now
  await page.click('button#checkout-action-btn');

  // Wait for payment result
  await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf', { state: 'visible' });

  // Assertions
  const paymentMessage = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
  await expect(paymentMessage).toHaveText(/Your payment of .* failed/);

  const failedMessage = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
  await expect(failedMessage).toHaveText('Failed');
});
