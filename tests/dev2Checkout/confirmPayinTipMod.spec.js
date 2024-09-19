import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://app-dev2.qlub.cloud/qr/ae/Auto_CheckConfPayInTP/2/_/_/9f4dbe9065');
  await page.getByRole('button', { name: 'Pay now' }).click();

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
  // Split the bill
  await page.getByRole('button', { name: 'Split bill' }).click();
  await page.locator('#select-custom').click();
  await page.getByPlaceholder('00.00').click();
  await page.getByPlaceholder('00.00').fill('10');
  await page.getByRole('button', { name: 'Confirm' }).click();

  //Trigger Tip Modal
  await page.locator('#tip_modal_5').getByText('%').click();
  await page.locator('#checkout-action-btn').click();

  // Wait for the result to appear
  await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf', { state: 'visible' });
  await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc', { state: 'visible' });
  await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj', { state: 'visible' });

  // Assertions
  const paymentSuccessfulText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
  await expect(paymentSuccessfulText).toHaveText('Payment was successful!');

  const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
  await expect(fullyPaidText).toHaveText('Partially paid');

  const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
  await expect(tableNumberText).toHaveText('Table 2 (Table 1)');

});
