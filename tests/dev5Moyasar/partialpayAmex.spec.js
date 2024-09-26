import { test, expect } from '@playwright/test';
test.setTimeout(50000);

test.beforeEach(async ({ page }) => {
  await page.goto('https://app-dev5.qlub.cloud/qr/sa/Auto_Moyasar/7/_/_/e6dc483fb1'); 
});

test.afterEach(async ({ page }) => {
  await page.close();  
});

test('test', async ({ page }) => {
  
//Fetch Order
await page.getByRole('button', { name: 'Pay now' }).click();

// Enter Card information
await page.locator('#mysr-cc-name').fill('Test Test');
await page.locator('#mysr-cc-number').fill('340000000900000');
await page.getByPlaceholder('MM / YY').fill('12 / 31');
await page.getByPlaceholder('CVC').fill('1234');

//Split the bill
await page.getByRole('button', { name: 'Split bill' }).click();
await page.locator('#select-custom').click();
await page.getByPlaceholder('00.00').click();
await page.getByPlaceholder('00.00').fill('10');
await page.getByRole('button', { name: 'Confirm' }).click();
 
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
  // await expect(fullyPaidText).toHaveText('Partially paid');
  
  // const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
  // await expect(tableNumberText).toHaveText('Table 6 (Table 1)');
  
});