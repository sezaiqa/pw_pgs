import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('https://app-dev5.qlub.cloud/qr/ae/Auto_Checkout/2/_/_/b8c2d4b9a9'); 
});

test.afterEach(async ({ page }) => {
  await page.close();  
});

test('test', async ({ page }) => {
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByText('Pay custom tip').click();
  await page.getByPlaceholder('0.00').click();
  await page.getByText('Payment method').click();

  // Page Down
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Enter Card Number
  const cardNumberFrameElement = await page.waitForSelector('iframe[name="checkout-frames-cardNumber"]');
  const cardNumberFrame = await cardNumberFrameElement.contentFrame();
  if (cardNumberFrame) {
    await cardNumberFrame.fill('input[name="cardnumber"]', '5436031030606378');
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
  const paymentSuccessfulText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
  await expect(paymentSuccessfulText).toHaveText('Payment was successful!');
  
  const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
  await expect(fullyPaidText).toHaveText('Fully paid');
  
  const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
  await expect(tableNumberText).toHaveText('Table 2 (Table 1)');
});