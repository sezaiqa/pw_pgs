import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://app-staging.qlub.cloud/qr/ae/Aut_CheckFixTip/2/_/_/9b65fd04ad');
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByText('Pay custom tip').click();
  await page.getByPlaceholder('0.00').click();
  await page.getByText('Payment method').click();

  // Wait for the Payment Method section to be visible
  await page.waitForSelector('iframe[name="checkout-frames-cardNumber"]', { state: 'visible' });

  // Split the bill
  await page.getByRole('button', { name: 'Split bill' }).click();
  await page.locator('#select-custom').click();
  await page.getByPlaceholder('00.00').click();
  await page.getByPlaceholder('00.00').fill('10');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Pay custom tip').click();

  // Wait for the Payment Method section to be visible
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

  // Wait for Tip Modal to be visible
  await page.waitForSelector('#tip_modal_5', { state: 'visible' });
  await page.locator('#tip_modal_5').getByText('AED5.00').click();
  await page.locator('button').filter({ hasText: 'Add tip' }).click();

  // Click Pay Now
  await page.click('button#checkout-action-btn');

  // Assertions
  const paymentSuccessfulText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
  await expect(paymentSuccessfulText).toHaveText('Payment was successful!');

  const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
  await expect(fullyPaidText).toHaveText('Partially paid');

  const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
  await expect(tableNumberText).toHaveText('Table 2 (Table 1)');

});
