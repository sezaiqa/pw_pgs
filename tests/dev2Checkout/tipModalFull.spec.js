import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://app-dev2.qlub.cloud/qr/ae/Auto_CheckTipModal/1/_/_/eb3a1cf3d2'); 
});

test.afterEach(async ({ page }) => {
  await page.close();  
});


test('test', async ({ page }) => {

  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByText('Pay custom tip').click();
  await page.getByPlaceholder('0.00').click();
  await page.getByText('Payment method').click();

  // Wait for the payment method section to be visible
  await page.waitForSelector('iframe[name="checkout-frames-cardNumber"]', { state: 'attached' });

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Enter Card Number
  const cardNumberFrameElement = await page.waitForSelector('iframe[name="checkout-frames-cardNumber"]', { state: 'attached' });
  const cardNumberFrame = await cardNumberFrameElement.contentFrame();
  if (cardNumberFrame) {
    await cardNumberFrame.fill('input[name="cardnumber"]', '4242424242424242');
  } else {
    console.log('Card number iframe not found');
    return;
  }

  // Expiry Date
  const expiryDateFrameElement = await page.waitForSelector('iframe[name="checkout-frames-expiryDate"]', { state: 'attached' });
  const expiryDateFrame = await expiryDateFrameElement.contentFrame();
  if (expiryDateFrame) {
    await expiryDateFrame.fill('input[name="exp-date"]', '1229');
  } else {
    console.log('Expiry date iframe not found');
    return;
  }

  // CVV
  const cvvFrameElement = await page.waitForSelector('iframe[name="checkout-frames-cvv"]', { state: 'attached' });
  const cvvFrame = await cvvFrameElement.contentFrame();
  if (cvvFrame) {
    await cvvFrame.fill('input[name="cvc"]', '222');
  } else {
    console.log('CVV iframe not found');
    return;
  }

  // Click Pay Now
  await page.click('button#checkout-action-btn');

  // Wait for tip modal to be visible
  await page.waitForSelector('#tip_modal_5 div', { state: 'visible' });

  // Trigger Tip Modal
  await page.locator('#tip_modal_5 div').nth(1).click();
  await page.locator('button').filter({ hasText: 'Add tip' }).click();

  // Click Pay Now again
  await page.click('button#checkout-action-btn');

  // Wait for payment result
  await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf', { state: 'visible' });
  await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc', { state: 'visible' });
  await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj', { state: 'visible' });

  // Assertions
  const paymentSuccessfulText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
  await expect(paymentSuccessfulText).toHaveText('Payment was successful!');
  
  const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
  await expect(fullyPaidText).toHaveText('Fully paid');
  
  const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
  await expect(tableNumberText).toHaveText('Table 1 (Table 1)');

});
