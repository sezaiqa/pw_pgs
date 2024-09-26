import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://app-dev5.qlub.cloud/qr/sa/Auto_Moyasar/1/_/_/b7874bd058'); 
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

// Click Pay Now
await page.getByRole('button', { name: 'Pay', exact: true }).click();


// Wait for 3DS password input and click submit
await page.waitForSelector('#acs_code');
await page.locator('#acs_code').fill('12345');
await page.locator('//button[@type="submit" and contains(@class, "button")]').click();

  // //Assertions

  // const paymentSuccessfulText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
  // await expect(paymentSuccessfulText).toHaveText('Payment was successful!');
  
  // const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
  // await expect(fullyPaidText).toHaveText('Fully paid');
  
  // const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
  // await expect(tableNumberText).toHaveText('Table 1 (Table 1)');
  
});