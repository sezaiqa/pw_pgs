import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://app-staging.qlub.cloud/qr/ae/db_Ch_Cond/1/_/_/68a8bb2af9');
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByText('Pay custom tip').click();
  await page.getByPlaceholder('0.00').click();
  await page.getByText('Payment method').click();

  // Page Down
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Wait for the card number iframe to be visible
  const cardNumberFrameElement = await page.waitForSelector('iframe[name="checkout-frames-cardNumber"]', { state: 'attached' });
  const cardNumberFrame = await cardNumberFrameElement.contentFrame();
  if (cardNumberFrame) {
    await cardNumberFrame.fill('input[name="cardnumber"]', '4242424242424242');
  } else {
    console.log('Card number iframe not found');
    return;
  }

  // Wait for the expiry date iframe to be visible
  const expiryDateFrameElement = await page.waitForSelector('iframe[name="checkout-frames-expiryDate"]', { state: 'attached' });
  const expiryDateFrame = await expiryDateFrameElement.contentFrame();
  if (expiryDateFrame) {
    await expiryDateFrame.fill('input[name="exp-date"]', '1229');
  } else {
    console.log('Expiry date iframe not found');
    return;
  }

  // Wait for the CVV iframe to be visible
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

  // Wait for the tip modal to be visible and interactable
  await page.waitForSelector('#tip_modal_10', { state: 'visible' });
  await page.locator('#tip_modal_10').getByText('%').click();
  await page.locator('#checkout-action-btn').click();

  // Wait for the payment result
  await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf', { state: 'visible' });

  // Assertions
  const paymentSuccessfulText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
  await expect(paymentSuccessfulText).toHaveText('Payment was successful!');
  
  const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
  await expect(fullyPaidText).toHaveText('Fully paid');
  
  const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
  await expect(tableNumberText).toHaveText('Table 1 (Table 1)');

});
