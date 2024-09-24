import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://app-staging.qlub.cloud/qr/sa/Auto_MoyasarSezai/1/_/_/e4dc6f106d'); 
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
await page.locator('#mysr-cc-number').fill('5421080101000000');
await page.getByPlaceholder('MM / YY').fill('12 / 31');
await page.getByPlaceholder('CVC').fill('123');

// Click Pay Now
await page.locator('//button[span[text()="Pay Now"]]').click();

// Wait for tip modal to be visible
await page.waitForSelector('#tip_modal_5 div', { state: 'visible' });

// Trigger Tip Modal
await page.locator('#tip_modal_5 div').nth(1).click();
await page.locator('button').filter({ hasText: 'Add tip' }).click();

//Click Pay Now
await page.getByRole('button', { name: 'Pay Now' }).click();

// Wait for 3DS password input and click submit
await page.waitForSelector('#acs_code');
await page.locator('#acs_code').fill('12345');
await page.locator('//button[@type="submit" and contains(@class, "button")]').click();

  //Assertions
  const paymentSuccessfulText = await page.locator('p:has-text("Payment was successful!")');
  await expect(paymentSuccessfulText).toHaveText('Payment was successful!');
  
  const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
  await expect(fullyPaidText).toHaveText('Fully paid');
  
  const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
  await expect(tableNumberText).toHaveText('Table 1 (Table 1)');
  
});


