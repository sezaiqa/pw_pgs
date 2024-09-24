import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://app-staging.qlub.cloud/qr/sa/Auto_MoyasarMinVendCom/1/_/_/8064b09243'); 
});
test.afterEach(async ({ page }) => {
  await page.close();  
});

test('test', async ({ page }) => {
//Fetch Order
await page.getByRole('button', { name: 'Pay now' }).click();

// Enter Card information
await page.locator('#mysr-cc-name').fill('Test Test');
await page.locator('#mysr-cc-number').fill('5421080101000000');
await page.getByPlaceholder('MM / YY').fill('12 / 31');
await page.getByPlaceholder('CVC').fill('123');

//Split the bill
await page.getByRole('button', { name: 'Split bill' }).click();
await page.locator('#select-custom').click();
await page.getByPlaceholder('00.00').click();
await page.getByPlaceholder('00.00').fill('10');
await page.getByRole('button', { name: 'Confirm' }).click();
 
// Wait for the tip modal to be visible and interactable
await page.waitForSelector('#tip_modal_10', { state: 'visible' });
await page.locator('#tip_modal_10').getByText('%').click();
await page.locator('button').filter({ hasText: 'Pay Now' }).click();

// Wait for 3DS password input and click submit
await page.waitForSelector('#acs_code');
await page.locator('#acs_code').fill('12345');
await page.locator('//button[@type="submit" and contains(@class, "button")]').click();

  //Assertions
  const paymentSuccessfulText = await page.locator('p:has-text("Payment was successful!")');
  await expect(paymentSuccessfulText).toHaveText('Payment was successful!');
  
  const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
  await expect(fullyPaidText).toHaveText('Partially paid');
  
  const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
  await expect(tableNumberText).toHaveText('Table 1 (Table 1)');
  
});

