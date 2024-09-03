import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app-staging.qlub.cloud/qr/br/Auto_TunaConfPinTipMod/1/_/_/b052b17ae9');
  await page.getByRole('button', { name: 'Pay now' }).click();

  //Card Name
  await page.getByRole('button', { name: 'Card' }).click();
  await page.getByRole('textbox', { name: 'Cardholder Name' }).click();
  await page.getByRole('textbox', { name: 'Cardholder Name' }).fill('Captured');

  //Card Number
  await page.getByRole('textbox', { name: 'Card Number' }).click();
  await page.getByRole('textbox', { name: 'Card Number' }).fill('4111 1111 1111 1111');

  //Expiry Date
  await page.getByRole('textbox', { name: 'Expiration Date' }).click();
  await page.getByRole('textbox', { name: 'Expiration Date' }).fill('03/29');

  //await page.getByRole('textbox', { name: 'CVV' }).fill('1');
  await page.getByRole('textbox', { name: 'CVV' }).click();
  await page.getByRole('textbox', { name: 'CVV' }).fill('111');

    //Split Bill
    await page.getByRole('button', { name: 'Split bill' }).click();
    await page.locator('#select-custom').click();
    await page.getByPlaceholder('00.00', { exact: true }).click();
    await page.getByPlaceholder('00.00', { exact: true }).fill('10');
    await page.getByRole('button', { name: 'Confirm' }).click();
  
    // Wait for the tip modal to be visible and interactable
    await page.waitForSelector('#tip_modal_10', { state: 'visible' });
    await page.locator('#tip_modal_10').getByText('%').click();
    await page.locator('button').filter({ hasText: 'Pay Now' }).click();

// Wait for payment successful message
await page.waitForSelector('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');

const paymentSuccessfulText = await page.$('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
const fullyPaidText = await page.$('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
const tableNumberText = await page.$('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');

// Assertions
expect(paymentSuccessfulText).not.toBeNull();
expect(await paymentSuccessfulText.textContent()).toContain('Payment was successful!');

expect(fullyPaidText).not.toBeNull();
expect(await fullyPaidText.textContent()).toContain('Partially paid');

expect(tableNumberText).not.toBeNull();
const tableText = (await tableNumberText.textContent()).replace(/\s+/g, ' ').trim();
expect(tableText).toContain('Table 1 (Table 1)');

});