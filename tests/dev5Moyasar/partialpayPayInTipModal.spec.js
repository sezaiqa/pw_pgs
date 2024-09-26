import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://app-dev5.qlub.cloud/qr/sa/Auto_MoyasarPayinTipMod/2/_/_/5cf6fc566c'); 
});

test.afterEach(async ({ page }) => {
  await page.close();  
});

test('test', async ({ page }) => {
  
//Fetch Order
await page.getByRole('button', { name: 'Pay now' }).click();

// Wait for Card information 
await page.waitForSelector('#mysr-cc-name');
 
// Enter Card information
await page.locator('#mysr-cc-name').fill('Test Test');
await page.locator('#mysr-cc-number').fill('4111111111111111');
await page.getByPlaceholder('MM / YY').fill('12 / 31');
await page.getByPlaceholder('CVC').fill('123');

//Split the bill
await page.getByRole('button', { name: 'Split bill' }).click();
await page.locator('#select-custom').click();
await page.getByPlaceholder('00.00').click();
await page.getByPlaceholder('00.00').fill('10');
await page.getByRole('button', { name: 'Confirm' }).click();

// Click Pay Now
await page.getByRole('button', { name: 'Pay', exact: true }).click();

// Wait for the tip modal to be visible and interactable
await page.waitForSelector('#tip_modal_10', { state: 'visible' });
await page.locator('#tip_modal_10').getByText('%').click();
await page.locator('#regular').getByText('Pay', { exact: true }).click();

// Wait for 3DS password input and click submit
await page.waitForSelector('#acs_code');
await page.locator('#acs_code').fill('12345');
await page.locator('//button[@type="submit" and contains(@class, "button")]').click();

  // //Assertions

  // const paymentSuccessfulText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
  // await expect(paymentSuccessfulText).toHaveText('Payment was successful!');
  
  // const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
  // await expect(fullyPaidText).toHaveText('Partially paid');
  
  // const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
  // await expect(tableNumberText).toHaveText('Table 2 (Table 1)');
  
});