import { test, expect } from '@playwright/test';
test.setTimeout(100000);

test('test', async ({ page }) => {

  await page.goto('https://app-staging.qlub.cloud/qr/ae/Auto_NgeniusSezai/7/_/_/20f73122ab');
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('button', { name: 'Pay fully' }).click();


  await page.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
  });

  // Enter Card Number
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('Card number').click();
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('Card number').fill('4663295942784758');
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('MM/YY').click();
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('MM/YY').fill('03/29');
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('CVV').click();
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('CVV').fill('222');
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('Card Holder Name').click();
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('Card Holder Name').fill('test');

  // Click Pay Now
  const payNowButton = page.locator('span.wrapper:has-text("Pay Now")');
  await payNowButton.click();

   // Wait for 3DS iframe 
   const threeDsIframe = page.frameLocator('iframe[name="three-ds-two-frame"]').frameLocator('[data-testid="\\33 ds_iframe"]');
   await threeDsIframe.getByRole('textbox').waitFor({ state: 'visible' });
 
   await threeDsIframe.getByRole('textbox').click();
   await threeDsIframe.getByRole('textbox').fill('12345');
   await threeDsIframe.getByRole('button', { name: 'Submit' }).click();

   await page.getByRole('button', { name: 'Try Again' }).click();
   await page.getByRole('button', { name: 'Pay fully' }).click();


  await page.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
  });

  // Enter Card Number
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('Card number').click();
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('Card number').fill('4012001037167778');
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('MM/YY').click();
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('MM/YY').fill('03/29');
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('CVV').click();
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('CVV').fill('222');
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('Card Holder Name').click();
  await page.frameLocator('iframe[name="ni-card-input"]').getByPlaceholder('Card Holder Name').fill('test');

  // Click Pay Now
  const payNowButton1 = page.locator('span.wrapper:has-text("Pay Now")');
  await payNowButton1.click();

  // Wait for 3DS iframe 
  await page.frameLocator('iframe[name="three-ds-two-frame"]').frameLocator('[data-testid="\\33 ds_iframe"]').getByRole('textbox').click();
  await page.frameLocator('iframe[name="three-ds-two-frame"]').frameLocator('[data-testid="\\33 ds_iframe"]').getByRole('textbox').fill('12345');
  await page.frameLocator('iframe[name="three-ds-two-frame"]').frameLocator('[data-testid="\\33 ds_iframe"]').getByRole('button', { name: 'Submit' }).click();

});
