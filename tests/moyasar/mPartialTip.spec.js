import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
//Fetch Order
await page.goto('https://app-staging.qlub.cloud/qr/sa/Auto_MoyasarCom/10/_/_/c86ad8a2d9');
await page.getByRole('button', { name: 'Pay now' }).click();

//Split the bill
await page.getByRole('button', { name: 'Split bill' }).click();
await page.locator('#select-custom').click();
await page.getByPlaceholder('00.00').click();
await page.getByPlaceholder('00.00').fill('10');
await page.getByRole('button', { name: 'Confirm' }).click();

//Add tip
await page.getByText('Pay custom tip').click();
await page.getByPlaceholder('0.00').fill('10');
 
// Enter Card information
await page.locator('#mysr-cc-name').fill('Test Test');
await page.locator('#mysr-cc-number').fill('4111111111111111');
await page.getByPlaceholder('MM / YY').fill('12 / 31');
await page.getByPlaceholder('CVC').fill('123');

// Click Pay Now
await page.locator('//button[span[text()="Pay Now"]]').click();

// Wait for 3DS password input and click submit
await page.waitForSelector('#acs_code');
await page.locator('#acs_code').fill('12345');
await page.locator('//button[@type="submit" and contains(@class, "button")]').click();

  //Assertions
  const paymentSuccessfulText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf');
  await expect(paymentSuccessfulText).toHaveText('Payment was successful!');
  
  const fullyPaidText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc');
  await expect(fullyPaidText).toHaveText('Partially paid');
  
  const tableNumberText = await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj');
  await expect(tableNumberText).toHaveText('Table 10 (Table 2)');
  
});