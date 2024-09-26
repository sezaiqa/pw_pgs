import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://app-dev2.qlub.cloud/qr/br/Auto_TunaSezai/1/_/_/47ca525615'); 
  });
  
  test.afterEach(async ({ page }) => {
    await page.close();  
  });

test('test', async ({ page }) => {
  
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('button', { name: 'Pay fully' }).click();

  //Card Name
  await page.getByRole('textbox', { name: 'Cardholder Name' }).click();
  await page.getByRole('textbox', { name: 'Cardholder Name' }).fill('Error');

  //Card Number
  await page.getByRole('textbox', { name: 'Card Number' }).click();
  await page.getByRole('textbox', { name: 'Card Number' }).fill('4111 1111 1111 1111');

  //Expiry Date
  await page.getByRole('textbox', { name: 'Expiration Date' }).click();
  await page.getByRole('textbox', { name: 'Expiration Date' }).fill('03/29');

  //await page.getByRole('textbox', { name: 'CVV' }).fill('1');
  await page.getByRole('textbox', { name: 'CVV' }).click();
  await page.getByRole('textbox', { name: 'CVV' }).fill('111');

  await page.getByRole('button', { name: 'Save card' }).click();
  
  //Click Pay Now
  await page.getByRole('button', { name: 'Pay Now' }).click();
  
});